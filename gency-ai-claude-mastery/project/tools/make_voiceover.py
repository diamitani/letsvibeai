"""
Generate the promo voiceover with Kokoro (local, free, human-sounding TTS).

Setup (once):
    pip install kokoro soundfile numpy
    # macOS may also need: brew install espeak-ng

Run from the project folder:
    python tools/make_voiceover.py              # default voice af_heart
    python tools/make_voiceover.py am_michael   # male voice

Output: assets/voiceover.wav — each line placed at its exact timestamp so it
matches the on-screen captions. Turn on "Voiceover" in the video's Tweaks panel.
"""
import json, sys, os
import numpy as np
import soundfile as sf
from kokoro import KPipeline

SR = 24000
voice = sys.argv[1] if len(sys.argv) > 1 else "af_heart"
here = os.path.dirname(os.path.abspath(__file__))
cfg = json.load(open(os.path.join(here, "vo-lines.json")))
total = cfg["total"]

pipe = KPipeline(lang_code="a")  # American English
track = np.zeros(int(total * SR), dtype=np.float32)
cursor = 0

for line in cfg["lines"]:
    audio = np.concatenate([np.asarray(a, dtype=np.float32) for _, _, a in pipe(line["say"], voice=voice, speed=line.get("speed", 1.0))])
    start = int(line["at"] * SR)
    if start < cursor:
        print(f"! '{line['say']}' overlaps the previous line by {(cursor - start) / SR:.2f}s — shifted later")
        start = cursor
    end = min(start + len(audio), len(track))
    track[start:end] += audio[: end - start]
    cursor = start + len(audio)
    print(f"{line['at']:>5.1f}s  {len(audio) / SR:.2f}s  {line['say']}")

peak = np.abs(track).max() or 1
track = track / peak * 0.89
os.makedirs(os.path.join(here, "..", "assets"), exist_ok=True)
out = os.path.join(here, "..", "assets", "voiceover.wav")
sf.write(out, track, SR)
print("wrote", os.path.relpath(out))
