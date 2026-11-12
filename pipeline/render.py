#!/usr/bin/env python3
"""Deterministic frame renderer: Chromium seeks the GSAP timeline frame-by-frame, screenshots go
straight into ffmpeg. Usage:
  python3 render.py <slug> stills t1 t2 ...      -> build/<slug>/still_<t>.png
  python3 render.py <slug> video [workers]       -> build/<slug>/body.mp4 (silent)"""
import sys, os, subprocess, math, json
from concurrent.futures import ProcessPoolExecutor
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
CHROME = '/opt/pw-browsers/chromium'

def browser(p):
    args = ['--disable-gpu', '--force-color-profile=srgb', '--allow-file-access-from-files', '--disable-web-security', '--hide-scrollbars']
    try:
        return p.chromium.launch(args=args)
    except Exception:
        import glob
        exe = sorted(glob.glob('/opt/pw-browsers/chromium*/chrome-linux*/chrome'))[-1]
        return p.chromium.launch(executable_path=exe, args=args)

def open_page(p, slug):
    b = browser(p)
    pg = b.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
    pg.on('console', lambda m: print('[console]', m.text) if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: print('[pageerror]', e))
    pg.goto(f'file://{ROOT}/engine/index.html?lesson={slug}')
    pg.wait_for_function('window.__ready === true', timeout=120000)
    return b, pg

def stills(slug, ts):
    with sync_playwright() as p:
        b, pg = open_page(p, slug)
        for t in ts:
            pg.evaluate(f'window.__seek({t})')
            pg.screenshot(path=f'{ROOT}/build/{slug}/still_{t}.png')
        b.close()

def chunk(args):
    slug, f0, f1, fps, out = args
    with sync_playwright() as p:
        b, pg = open_page(p, slug)
        ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', str(fps), '-c:v', 'mjpeg', '-i', '-',
                               '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', str(fps), out], stdin=subprocess.PIPE)
        for f in range(f0, f1):
            pg.evaluate(f'window.__seek({f / fps})')
            ff.stdin.write(pg.screenshot(type='jpeg', quality=93))
            if (f - f0) % 300 == 0: print(f'  {out[-12:]}: frame {f}/{f1}', flush=True)
        ff.stdin.close(); ff.wait(); b.close()
    return out

def video(slug, workers=2):
    data = open(f'{ROOT}/build/{slug}/data.js').read()
    L = json.loads(data[len('window.LESSON = '):-1])
    fps = L['fps']; N = int(math.ceil(L['total'] * fps))
    step = math.ceil(N / workers)
    jobs = [(slug, i, min(N, i + step), fps, f'{ROOT}/build/{slug}/part{k}.mp4') for k, i in enumerate(range(0, N, step))]
    with ProcessPoolExecutor(workers) as ex:
        parts = list(ex.map(chunk, jobs))
    lst = f'{ROOT}/build/{slug}/parts.txt'
    open(lst, 'w').write(''.join(f"file '{x}'\n" for x in parts))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', f'{ROOT}/build/{slug}/body.mp4'], check=True)
    print('body ->', f'{ROOT}/build/{slug}/body.mp4', N, 'frames')

if __name__ == '__main__':
    slug, mode = sys.argv[1], sys.argv[2]
    if mode == 'stills': stills(slug, [float(x) for x in sys.argv[3:]])
    else: video(slug, int(sys.argv[3]) if len(sys.argv) > 3 else 2)
