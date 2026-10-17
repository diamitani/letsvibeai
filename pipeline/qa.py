import json, sys, subprocess
from PIL import Image
sys.path.insert(0, '/home/claude/lvai'); import render
from playwright.sync_api import sync_playwright
for slug in sys.argv[1:]:
    L = json.loads(open(f'build/{slug}/data.js').read()[len('window.LESSON = '):-1])
    ts = [round(sc['start'] + 0.82 * sc['dur'], 2) for sc in L['scenes']]
    with sync_playwright() as p:
        b, pg = render.open_page(p, slug)
        ims = []
        for t in ts:
            pg.evaluate(f'window.__seek({t})')
            pg.screenshot(path='/tmp/claude-0/q.png'); ims.append(Image.open('/tmp/claude-0/q.png').resize((640, 360)))
        b.close()
    cols = 3; rows = (len(ims) + cols - 1) // cols
    S = Image.new('RGB', (640 * cols, 360 * rows))
    for i, im in enumerate(ims): S.paste(im, ((i % cols) * 640, (i // cols) * 360))
    S.save(f'build/{slug}/qa.png'); print(slug, ts)
