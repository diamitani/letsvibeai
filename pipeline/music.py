#!/usr/bin/env python3
"""LetsVibeAI music bed — synthesized in code (royalty-free, original).
Warm ambient-tech groove: detuned pads, plucked arpeggio with echo, sub bass,
soft kick + hats. Usage: python3 music.py out.wav seconds [seed]"""
import sys, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000
BPM = 96
BEAT = 60 / BPM
BAR = 4 * BEAT

def midi(n): return 440.0 * 2 ** ((n - 69) / 12)

def lp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'low', fs=SR, output='sos'), x)

def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)

def saw(f, t, ph=0.0):
    return 2 * ((f * t + ph) % 1.0) - 1

def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    na = min(na, n); nr = min(nr, n - na)
    e[:na] = np.linspace(0, 1, na)
    if nr > 0: e[n - nr:] = np.linspace(1, 0, nr)
    return e

# progression (2 bars each): Dm9, Bbmaj7, Fmaj7/A, C6/9
CHORDS = [
    [50, 57, 60, 64, 65],   # D F A C E  (Dm9 voiced)
    [46, 58, 62, 65, 69],   # Bb D F A
    [45, 57, 60, 64, 67],   # A  C E G -> Fmaj7/A-ish (Am7)
    [48, 55, 62, 64, 69],   # C G D E A (C6/9)
]
ROOTS = [38, 34, 33, 36]

def render(total, seed=7):
    rng = np.random.default_rng(seed)
    n = int(total * SR)
    L = np.zeros(n); R = np.zeros(n)
    seg = 2 * BAR
    # --- pads
    t_seg = np.arange(int(seg * SR)) / SR
    k = 0; pos = 0.0
    while pos < total:
        ch = CHORDS[k % 4]
        i0 = int(pos * SR); m = min(len(t_seg), n - i0)
        if m <= 0: break
        tt = t_seg[:m]
        padL = np.zeros(m); padR = np.zeros(m)
        for note in ch[1:]:
            f = midi(note)
            for d, pan in ((-0.09, 0.8), (0.0, 0.5), (0.11, 0.2)):
                v = saw(f * 2 ** (d / 12), tt, rng.random())
                padL += v * (1 - pan); padR += v * pan
        e = env_adsr(m, 1.2, 1.4)
        lfo = 900 + 500 * np.sin(2 * np.pi * 0.07 * (pos + tt))
        padL = lp(padL, 1100) * e; padR = lp(padR, 1100) * e
        L[i0:i0 + m] += padL * 0.035; R[i0:i0 + m] += padR * 0.035
        # sub bass: root on 1 and the "and" of 3
        root = midi(ROOTS[k % 4])
        for b in range(2):
            for off, dur in ((0, 1.6 * BEAT), (2.5 * BEAT, 1.3 * BEAT)):
                s = pos + b * BAR + off
                j0 = int(s * SR); mm = min(int(dur * SR), n - j0)
                if mm <= 0: continue
                ts = np.arange(mm) / SR
                b_ = np.sin(2 * np.pi * root * ts) + 0.25 * np.sin(2 * np.pi * root * 2 * ts)
                b_ *= env_adsr(mm, 0.01, 0.25)
                L[j0:j0 + mm] += b_ * 0.11; R[j0:j0 + mm] += b_ * 0.11
        # plucked arpeggio, 8ths
        arp = [ch[1], ch[2], ch[3], ch[4], ch[3] + 12, ch[4], ch[2] + 12, ch[3]]
        for step in range(16):
            s = pos + step * BEAT / 2
            j0 = int(s * SR); mm = min(int(0.9 * SR), n - j0)
            if mm <= 0: continue
            ts = np.arange(mm) / SR
            f = midi(arp[step % 8] + 12)
            p = (np.sin(2 * np.pi * f * ts) + 0.3 * np.sin(2 * np.pi * 2 * f * ts)) * np.exp(-ts * 7)
            vel = 0.05 if step % 2 == 0 else 0.035
            pan = 0.3 + 0.4 * ((step * 3) % 5) / 4
            L[j0:j0 + mm] += p * vel * (1 - pan); R[j0:j0 + mm] += p * vel * pan
        pos += seg; k += 1
    # --- drums
    beats = int(total / BEAT)
    for b in range(beats):
        s = b * BEAT; j0 = int(s * SR)
        if b % 2 == 0:  # soft kick on 1 & 3
            mm = min(int(0.35 * SR), n - j0)
            ts = np.arange(mm) / SR
            f = 50 + 90 * np.exp(-ts * 30)
            kk = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-ts * 9)
            L[j0:j0 + mm] += kk * 0.22; R[j0:j0 + mm] += kk * 0.22
        # offbeat hat
        j1 = int((s + BEAT / 2) * SR); mm = min(int(0.06 * SR), n - j1)
        if mm > 0:
            h = hp(rng.standard_normal(mm), 7000) * np.exp(-np.arange(mm) / SR * 60)
            L[j1:j1 + mm] += h * 0.025; R[j1:j1 + mm] += h * 0.03
        if b % 4 == 3:  # light rim/clap on 4
            j2 = int(s * SR); mm = min(int(0.12 * SR), n - j2)
            c = lp(hp(rng.standard_normal(mm), 1200), 5000) * np.exp(-np.arange(mm) / SR * 30)
            L[j2:j2 + mm] += c * 0.03; R[j2:j2 + mm] += c * 0.03
    # echo on everything (subtle stereo delay)
    d = int(BEAT * 0.75 * SR)
    L2 = L.copy(); R2 = R.copy()
    L2[d:] += R[:-d] * 0.22; R2[d:] += L[:-d] * 0.22
    out = np.stack([L2, R2], 1)
    # sidechain-ish pump
    t = np.arange(n) / SR
    pump = 0.82 + 0.18 * np.minimum(1, ((t % (2 * BEAT)) / (0.35)))
    out *= pump[:, None]
    # fade in/out
    fi = int(1.5 * SR); fo = int(3 * SR)
    out[:fi] *= np.linspace(0, 1, fi)[:, None]
    out[-fo:] *= np.linspace(1, 0, fo)[:, None]
    out /= np.max(np.abs(out)) + 1e-9
    return out * 0.7

if __name__ == '__main__':
    o = sys.argv[1]; secs = float(sys.argv[2]); seed = int(sys.argv[3]) if len(sys.argv) > 3 else 7
    sf.write(o, render(secs, seed), SR)
    print('wrote', o)
