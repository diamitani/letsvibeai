#!/usr/bin/env python3
"""Stage 1 of the LetsVibeAI course pipeline (OpenMontage-style script -> timed scene plan).
Reads lessons/<slug>.json, voices every line with Kokoro-82M (local neural TTS),
lets the AUDIO set the timing, and writes build/<slug>/data.js + narration.wav.
Usage: python3 prep.py <slug>"""
import json, re, sys, os, glob
import numpy as np, soundfile as sf

def resample_audio(s, sr, target_sr):
    if sr == target_sr:
        return s.astype(np.float32)
    x = np.arange(len(s))
    x_new = np.linspace(0, len(s) - 1, int(len(s) * target_sr / sr))
    return np.interp(x_new, x, s).astype(np.float32)

ROOT = os.path.dirname(os.path.abspath(__file__))
SR = 48000
FPS = 30

_k = None
def kokoro():
    global _k
    if _k is None:
        from kokoro_onnx import Kokoro
        _k = Kokoro(f"{ROOT}/models/kokoro-v1.0.onnx", f"{ROOT}/models/voices-v1.0.bin")
    return _k

def tts(text, voice, speed, cache_dir):
    key = re.sub(r'[^a-z0-9]+', '_', (voice + '_' + str(speed) + '_' + text).lower())[:150]
    import hashlib
    key += hashlib.md5(text.encode()).hexdigest()[:8]
    p = f"{cache_dir}/{key}.wav"
    if not os.path.exists(p):
        s, sr = kokoro().create(text, voice=voice, speed=speed, lang="en-us")
        s = resample_audio(s, sr, SR)
        # trim leading/trailing silence with smooth 120ms fade padding
        a = np.abs(s); thr = 0.01 * a.max()
        idx = np.where(a > thr)[0]
        if len(idx):
            s = s[max(0, idx[0] - 600): idx[-1] + 2400]
            s = np.pad(s, (0, int(SR * 0.12)))
        sf.write(p, s, SR)
    s, _ = sf.read(p, dtype='float32')
    return s

def word_times(cap, start, dur):
    """distribute caption words across the spoken duration, weighted by length + pauses"""
    words = cap.split()
    w = []
    for x in words:
        wt = 0.35 + len(re.sub(r'[^A-Za-z0-9]', '', x)) * 0.11
        if re.search(r'[,;:—–]$', x): wt += 0.35
        if re.search(r'[.!?]$', x): wt += 0.45
        w.append(wt)
    tot = sum(w); t = start; out = []
    for x, wt in zip(words, w):
        d = dur * wt / tot
        out.append({"w": x, "s": round(t, 3), "e": round(t + d, 3)}); t += d
    return out

def env(sig, total_frames):
    """per-frame loudness envelope 0..1 (for audio-reactive visuals)"""
    hop = SR // FPS
    out = []
    for f in range(total_frames):
        seg = sig[f * hop:(f + 1) * hop]
        out.append(float(np.sqrt(np.mean(seg ** 2))) if len(seg) else 0.0)
    m = max(out) or 1
    return [round(min(1, v / m * 1.6), 3) for v in out]

def icon_svg(name):
    p = f"{ROOT}/node_modules/lucide-static/icons/{name}.svg"
    if not os.path.exists(p):
        print("!! missing icon", name); return ""
    s = open(p).read()
    s = re.sub(r'<!--.*?-->', '', s, flags=re.S).strip()
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'class="[^"]*"', 'class="ic"', s)
    return s

def collect_icons(obj, acc):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ('icon', 'coreIcon') and isinstance(v, str): acc.add(v)
            else: collect_icons(v, acc)
    elif isinstance(obj, list):
        for v in obj: collect_icons(v, acc)

def main(slug):
    L = json.load(open(f"{ROOT}/lessons/{slug}.json"))
    bdir = f"{ROOT}/build/{slug}"; os.makedirs(bdir, exist_ok=True)
    cache = f"{ROOT}/build/_tts"; os.makedirs(cache, exist_ok=True)
    voice = L.get("voice", "am_adam"); speed = L.get("speed", 0.96)
    t = 0.0
    chunks = []   # (start_time, np.array)
    cameo_audio = []
    for si, sc in enumerate(L["scenes"]):
        sc["index"] = si
        sc["start"] = round(t, 3)
        lead = sc.get("lead", 1.0 if si == 0 else 0.75)
        if sc["type"] == "cameo":
            tt = t + lead
            sc["clip_start"] = round(tt, 3)
            # Pure animated brand portal: quote and items voiced with natural Kokoro TTS
            clean_q = re.sub(r'<[^>]+>', ' ', sc.get("quote", "")).strip()
            clean_q = re.sub(r'\s+', ' ', clean_q)
            lines = []
            if clean_q:
                a = tts(clean_q, voice, speed, cache); d = len(a) / SR
                chunks.append((tt, a))
                lines.append({"cap": clean_q, "start": round(tt, 3), "end": round(tt + d, 3), "words": word_times(clean_q, tt, d)})
                tt += d + 0.6
            for it in sc.get("items", []):
                it_text = it.get("t", "")
                if it_text:
                    ia = tts(it_text, voice, speed, cache); idur = len(ia) / SR
                    it["time"] = round(tt, 3)
                    chunks.append((tt, ia))
                    lines.append({"cap": it_text, "start": round(tt, 3), "end": round(tt + idur, 3), "words": word_times(it_text, tt, idur)})
                    tt += idur + 0.4
            for ln in sc.get("after", []):
                say = ln if isinstance(ln, str) else ln["say"]
                cap = ln if isinstance(ln, str) else ln.get("cap", say)
                a = tts(say, voice, speed, cache); d = len(a) / SR
                chunks.append((tt, a))
                lines.append({"cap": cap, "start": round(tt, 3), "end": round(tt + d, 3), "words": word_times(cap, tt, d)})
                tt += d + 0.4
            sc["lines"] = lines
            t = tt + sc.get("tail", 0.9)
        else:
            tt = t + lead
            lines = []
            for ln in sc.get("lines", []):
                if isinstance(ln, str): ln = {"say": ln}
                say = ln["say"]; cap = ln.get("cap", say)
                a = tts(say, voice, ln.get("speed", speed), cache); d = len(a) / SR
                chunks.append((tt, a))
                lines.append({"cap": cap, "start": round(tt, 3), "end": round(tt + d, 3), "words": word_times(cap, tt, d)})
                tt += d + ln.get("pause", 0.42)
            sc["lines"] = lines
            end = tt - 0.42 + sc.get("tail", 0.95)
            end = max(end, t + sc.get("min", 4.0))
            t = end
        sc["end"] = round(t, 3)
        sc["dur"] = round(sc["end"] - sc["start"], 3)
        # cue -> absolute time
        def resolve(o):
            if isinstance(o, dict):
                if "cue" in o:
                    c = o["cue"]; li = int(c); frac = c - li
                    ln = sc["lines"][min(li, len(sc["lines"]) - 1)]
                    o["time"] = round(ln["start"] + frac * (ln["end"] - ln["start"]), 3)
                for v in o.values(): resolve(v)
            elif isinstance(o, list):
                for v in o: resolve(v)
        for k, v in list(sc.items()):
            if k != "lines": resolve(v)
    total = round(t + 0.2, 3)
    L["total"] = total; L["fps"] = FPS
    n = int(total * SR) + SR
    narr = np.zeros(n, np.float32)
    for st, a in chunks:
        i = int(st * SR); narr[i:i + len(a)] += a[: n - i]
    full = narr.copy()
    for st, p in cameo_audio:
        a, sr = sf.read(p, dtype='float32')
        if a.ndim > 1: a = a.mean(1)
        i = int(st * SR); full[i:i + len(a)] += a[: n - i]
    sf.write(f"{bdir}/narration.wav", narr[:int(total * SR)], SR)
    sf.write(f"{bdir}/voice_full.wav", full[:int(total * SR)], SR)
    json.dump([[st, p] for st, p in cameo_audio], open(f"{bdir}/cameos.json", "w"))
    L["env"] = env(full, int(total * FPS) + 2)
    icons = {'check','x','sparkles','arrow-right','chevron-right','brain','plug','target'}; collect_icons(L, icons)
    L["icons"] = {k: icon_svg(k) for k in sorted(icons)}
    with open(f"{bdir}/data.js", "w") as f:
        f.write("window.LESSON = " + json.dumps(L) + ";")
    print(f"{slug}: {len(L['scenes'])} scenes, total {total:.1f}s")
    for sc in L["scenes"]:
        print(f"  {sc['start']:6.1f}-{sc['end']:6.1f}  {sc['type']:9s} {sc.get('chapter','')}")

if __name__ == "__main__":
    main(sys.argv[1])
