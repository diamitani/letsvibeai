# LetsVibeAI Course Video Pipeline (Claude Mastery v2)

This folder makes the new-format LetsVibeAI lesson videos. The order is your intro reel, then the animated lesson with you as instructor, then your outro reel.

You don't need to write code. **Each lesson is one JSON file** in `lessons/`. To make a new video, copy a lesson file, change the words, and run three commands.

## How a video gets made (OpenMontage-style stages)

| Stage | Command | What it does |
|---|---|---|
| Script → timed plan | `python3 prep.py <slug>` | Voices every line with Kokoro (a free neural voice that runs on your machine). The audio length sets the timing. |
| Compose + render | `python3 render.py <slug> video 2` | Chromium plays the HTML/GSAP scene engine one frame at a time and saves it as `build/<slug>/body.mp4`. |
| Edit + deliver | `python3 assemble.py <slug>` | Adds your intro reel, the voice, a ducked music bed and your outro reel, then sets loudness to -14 LUFS. Output: `out/<slug>.mp4`, under 28 MB. |

To check a few frames before rendering everything: `python3 qa.py <slug>` (it makes `build/<slug>/qa.png`).

## Scene types you can use in a lesson JSON

`title` · `cameo` (your real avatar clip) · `statement` · `orbit` · `layers` · `grid` · `terminal` · `code` · `cards` · `compare` · `table` · `steps` · `tree` · `equation` · `stats` · `recap` · `next`

- `lines` is the narration. Use `{"say": "...", "cap": "..."}` when the spoken words should differ from the caption, for example `"say": "Lets Vibe A.I."` with `"cap": "LetsVibeAI"`.
- `"cue": 2` makes an item appear when narration line 2 starts. `2.5` means halfway through line 2.
- Icons are names from lucide.dev, such as `"icon": "rocket"`.

## Your avatar

- `assets/pat_portrait.png` is a cut-out portrait taken from your HeyGen avatar.
- `assets/cameos/<name>/` holds clips of your real footage with the background removed (`director`, `describe`). To add a new cameo, cut a clip from any avatar video, remove the background (rembg), and add a `meta.json` with the transcript.

## Brand

Sora + Poppins type. Colours: Deep Navy #071B3A, Signal Blue #2F80ED, Learning Violet #7C5CFC, Growth Green #34D399, Signal Cyan #20C7D9. The background uses Gateway-V signal ribbons. The music bed is original and synthesized in code by `music.py`, so it's royalty-free.

## Setup on a new machine (one time)

```
pip install kokoro-onnx soundfile scipy playwright faster-whisper "rembg[cpu]"
npm i gsap @fontsource/sora @fontsource/poppins @fontsource/jetbrains-mono lucide-static
# models: kokoro-v1.0.onnx + voices-v1.0.bin from github.com/thewh1teagle/kokoro-onnx releases -> models/
# reels: put your intro/outro into assets/reels/intro.mp4 and outro.mp4
```
