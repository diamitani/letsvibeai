#!/usr/bin/env python3
"""Final edit: LetsVibeAI intro reel -> lesson body (voice + ducked music bed) -> outro reel.
Usage: python3 assemble.py <slug> [music_seed]"""
import sys, os, json, subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))
INTRO = f"{ROOT}/assets/reels/intro.mp4"
OUTRO = f"{ROOT}/assets/reels/outro.mp4"
XF = 0.6

def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]).decode().strip())

def main(slug, seed=7):
    b = f"{ROOT}/build/{slug}"
    body = f"{b}/body.mp4"
    bd = dur(body); idur = dur(INTRO); odur = dur(OUTRO)
    music = f"{b}/music.wav"
    subprocess.run(['python3', f'{ROOT}/music.py', music, str(bd + 2), str(seed)], check=True)
    out = f"{ROOT}/out/{slug}.mp4"
    fc = (
        f"[0:v]scale=1920:1080:flags=lanczos,fps=30,format=yuv420p,setsar=1,settb=AVTB[v0];"
        f"[1:v]fps=30,format=yuv420p,setsar=1,settb=AVTB[v1];"
        f"[2:v]scale=1920:1080:flags=lanczos,fps=30,format=yuv420p,setsar=1,settb=AVTB[v2];"
        f"[v0][v1]xfade=transition=fade:duration={XF}:offset={idur - XF:.3f}[x1];"
        f"[x1][v2]xfade=transition=fade:duration={XF}:offset={idur + bd - 2 * XF:.3f}[vout];"
        # body audio: voice + music ducked under voice
        f"[3:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=1.0,asplit=2[vox][key];"
        f"[4:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:{bd:.3f},volume=0.30[mus];"
        f"[mus][key]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=450:makeup=1[duck];"
        f"[vox][duck]amix=inputs=2:duration=first:normalize=0,atrim=0:{bd:.3f},apad=whole_dur={bd:.3f}[ba];"
        f"[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.8[ia];"
        f"[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.8[oa];"
        f"[ia][ba]acrossfade=d={XF}[a1];[a1][oa]acrossfade=d={XF}[a2];"
        f"[a2]loudnorm=I=-14:TP=-1.5:LRA=11[aout]"
    )
    total = idur + bd + odur - 2 * XF
    vb = int(min(6000, (28.0 * 8 * 1024 * 1024 / total - 170000) / 1000))
    base = ['ffmpeg', '-v', 'error', '-y', '-i', INTRO, '-i', body, '-i', OUTRO, '-i', f"{b}/voice_full.wav", '-i', music,
            '-filter_complex', fc, '-map', '[vout]', '-map', '[aout]']
    venc = ['-c:v', 'libx264', '-preset', 'medium', '-tune', 'animation', '-b:v', f'{vb}k', '-maxrate', f'{vb * 2}k', '-bufsize', f'{vb * 4}k',
            '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-passlogfile', f'{b}/x264pass']
    subprocess.run(base + venc + ['-pass', '1', '-c:a', 'aac', '-b:a', '160k', '-f', 'mp4', '/dev/null'], check=True)
    subprocess.run(base + venc + ['-pass', '2', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', out], check=True)
    print('final ->', out, f'{dur(out):.1f}s')

if __name__ == '__main__':
    main(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 7)
