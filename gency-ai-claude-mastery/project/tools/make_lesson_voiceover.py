"""
Generate human-sounding narration for every Agent Harness Mastery lesson with
Kokoro (local, free, no API key).

Setup (once):
    pip install kokoro soundfile numpy
    # macOS may also need: brew install espeak-ng

Run from the project folder:
    python tools/make_lesson_voiceover.py                 # all lessons, voice af_heart
    python tools/make_lesson_voiceover.py 3 5             # only lessons 3 and 5
    python tools/make_lesson_voiceover.py --voice am_michael

Reads lessons-data.js (the same file the videos render from), places every line
at its caption timestamp, and gently speeds up any line that would run past its
slot so voice and captions stay in sync.
Output: assets/lessons/lesson-01-vo.wav … lesson-08-vo.wav
"""
import json, os, re, sys
import numpy as np
import soundfile as sf
from kokoro import KPipeline

SR = 24000
args = sys.argv[1:]
voice = "af_heart"
if "--voice" in args:
    i = args.index("--voice"); voice = args[i + 1]; del args[i:i + 2]
only = {int(a) for a in args}

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
src = open(os.path.join(root, "lessons-data.js"), encoding="utf-8").read()
lessons = json.loads(re.search(r"=\s*(\[.*\])\s*;?\s*$", src, re.S).group(1))
os.makedirs(os.path.join(root, "assets", "lessons"), exist_ok=True)
pipe = KPipeline(lang_code="a")

def speak(text, speed):
    return np.concatenate([np.asarray(a, dtype=np.float32) for _, _, a in pipe(text, voice=voice, speed=speed)])

for les in lessons:
    if only and les["n"] not in only: continue
    lines = [ln for sc in les["scenes"] for ln in sc["lines"]]
    track = np.zeros(int(les["total"] * SR), dtype=np.float32)
    print(f"\nLesson {les['n']:02d} — {les['title']}")
    for k, ln in enumerate(lines):
        slot = (lines[k + 1]["at"] if k + 1 < len(lines) else les["total"]) - ln["at"] - 0.15
        audio = speak(ln["say"], 1.0)
        if len(audio) / SR > slot:
            sp = min(1.2, (len(audio) / SR) / slot)
            audio = speak(ln["say"], sp)
            print(f"  ~ sped to {sp:.2f}x")
        start = int(ln["at"] * SR); end = min(start + len(audio), len(track))
        track[start:end] += audio[: end - start]
        print(f"  {ln['at']:>6.1f}s  {len(audio) / SR:4.1f}s  {ln['say']}")
    peak = np.abs(track).max() or 1
    out = os.path.join(root, "assets", "lessons", f"lesson-{les['n']:02d}-vo.wav")
    sf.write(out, track / peak * 0.89, SR)
    print("  wrote", os.path.relpath(out, root))
