/* LetsVibeAI course composition engine — deterministic, seekable (window.__seek(t)).
   Every visual is a pure function of time, so frame-by-frame capture is exact. */
(function () {
const L = window.LESSON;
const W = 1920, H = 1080, FPS = L.fps || 30;
const $ = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; };
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const icon = (n) => L.icons[n] || '';
const pad2 = (n) => String(n).padStart(2, '0');
const tl = gsap.timeline({ paused: true });
const SYMBOL = `<svg viewBox="0 0 600 520"><defs><linearGradient id="lg1" x1="70" y1="450" x2="530" y2="70" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2F80ED"/><stop offset=".48" stop-color="#7C5CFC"/><stop offset="1" stop-color="#34D399"/></linearGradient><linearGradient id="lg2" x1="280" y1="380" x2="320" y2="120" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2F80ED"/><stop offset="1" stop-color="#34D399"/></linearGradient></defs><path d="M82 102 L184 102 L300 354 L416 102 L518 102 L351 418 Q300 491 249 418 Z" fill="url(#lg1)"/><path d="M185 137 L225 137 L300 300 L375 137 L415 137 L323 340 Q300 377 277 340 Z" fill="#071B3A"/><rect x="286" y="174" width="28" height="155" rx="14" fill="url(#lg2)"/><circle cx="300" cy="146" r="23" fill="url(#lg2)"/><path d="M236 113 Q300 54 364 113" fill="none" stroke="#20C7D9" stroke-width="18" stroke-linecap="round"/><path d="M260 80 Q300 45 340 80" fill="none" stroke="#34D399" stroke-width="13" stroke-linecap="round"/></svg>`;
const VOUT = `<svg viewBox="0 0 600 520"><path d="M82 102 L184 102 L300 354 L416 102 L518 102 L351 418 Q300 491 249 418 Z" fill="none" stroke="#8fb7ff" stroke-width="4"/><path d="M185 137 L225 137 L300 300 L375 137 L415 137 L323 340 Q300 377 277 340 Z" fill="none" stroke="#8fb7ff" stroke-width="3"/></svg>`;

/* ---------- kinetic text ---------- */
function split(node, grad) {
  // returns array of .wi spans; preserves <em> (gradient), <s> (strike), <br>
  const out = [];
  const kids = Array.from(node.childNodes);
  node.innerHTML = '';
  kids.forEach(k => {
    if (k.nodeType === 3) {
      k.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { node.appendChild(document.createTextNode(' ')); return; }
        const w = el('span', 'w'); const wi = el('span', 'wi' + (grad ? ' grad' : '')); wi.textContent = part;
        w.appendChild(wi); node.appendChild(w); out.push(wi);
      });
    } else if (k.tagName === 'BR') { node.appendChild(el('br'));
    } else if (k.tagName === 'EM') {
      const tmp = el('span'); tmp.innerHTML = k.innerHTML; const ws = split(tmp, true);
      while (tmp.firstChild) node.appendChild(tmp.firstChild); out.push(...ws);
    } else if (k.tagName === 'S') {
      const s = el('span', 'strk'); s.innerHTML = k.innerHTML; const ws = split(s, false);
      s.appendChild(el('span', 'ln')); node.appendChild(s); out.push(...ws);
    } else { node.appendChild(k); }
  });
  return out;
}
function kinetic(node, t, stagger = 0.075, dur = 0.85) {
  const ws = split(node);
  tl.fromTo(ws, { y: 46, opacity: 0, rotate: 3, filter: 'blur(10px)' },
    { y: 0, opacity: 1, rotate: 0, filter: 'blur(0px)', duration: dur, stagger, ease: 'power4.out' }, t);
  return ws;
}
function rise(target, t, opts = {}) {
  tl.fromTo(target, { y: opts.y ?? 40, opacity: 0, scale: opts.scale ?? 1, filter: 'blur(8px)' },
    { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: opts.dur ?? 0.8, ease: opts.ease ?? 'power3.out', stagger: opts.stagger ?? 0 }, t);
}
function place(e, x, y, w, h) { Object.assign(e.style, { position: 'absolute', left: x + 'px', top: y + 'px' }); if (w) e.style.width = w + 'px'; if (h) e.style.height = h + 'px'; return e; }
function header(cam, sc, t, opts = {}) {
  const x = opts.x ?? 140, y = opts.y ?? 170, w = opts.w ?? 820;
  if (sc.eyebrow) { const e = place(el('div', 'eyebrow', sc.eyebrow), x, y); cam.appendChild(e); rise(e, t, { y: 20 }); }
  if (sc.headline) {
    const h = place(el('div', 'h', sc.headline), x, y + 50, w); h.style.fontSize = (opts.size ?? 76) + 'px';
    cam.appendChild(h); kinetic(h, t + 0.15);
  }
  if (sc.sub) { const s = place(el('div', 'sub', sc.sub), x, y + (opts.subY ?? 260), w); cam.appendChild(s); rise(s, t + 0.6); }
}

/* ---------- portrait portal ---------- */
function portal(cam, cx, cy, r, t, opts = {}) {
  const p = place(el('div', 'portal'), cx - r, cy - r, 2 * r, 2 * r);
  p.innerHTML = `<div class="glow"></div><div class="disc"></div><div class="ring"></div><div class="person"></div>`;
  const person = p.querySelector('.person');
  if (opts.canvas) { person.appendChild(opts.canvas); }
  else { const img = el('img'); img.src = '../assets/pat_portrait.png'; img.style.width = (opts.imgW ?? 2 * r * 1.12) + 'px'; person.appendChild(img); }
  cam.appendChild(p);
  const ring = p.querySelector('.ring'), glow = p.querySelector('.glow'), disc = p.querySelector('.disc');
  tl.fromTo(disc, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.0, ease: 'expo.out' }, t);
  tl.fromTo(ring, { scale: 0.6, opacity: 0, rotate: -120 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.3, ease: 'expo.out' }, t + 0.05);
  tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 1.4 }, t);
  tl.fromTo(person, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, t + 0.25);
  p._ring = ring; p._glow = glow;
  spinners.push({ e: ring, speed: 14 });
  return p;
}
const spinners = []; // continuous rotations (pure function of t)
const pulses = [];   // audio reactive glows

/* ---------- scene builders ---------- */
const B = {};

B.title = (sc, cam) => {
  const t = sc.start;
  const n = place(el('div', 't-num', `<span class="o">${pad2(L.lesson)}</span><span class="f">${pad2(L.lesson)}</span>`), 128, 140);
  cam.appendChild(n);
  tl.fromTo(n.querySelector('.f'), { opacity: 0, x: -60, filter: 'blur(14px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' }, t + 0.1);
  tl.fromTo(n.querySelector('.o'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.4, ease: 'expo.out' }, t + 0.2);
  const lab = place(el('div', 'eyebrow', sc.kicker || 'Foundations'), 142, 128); cam.appendChild(lab); rise(lab, t, { y: 16 });
  const tw = place(el('div'), 140, 470, 900); cam.appendChild(tw);
  const h = el('div', 'h', sc.headline); h.style.fontSize = '84px'; tw.appendChild(h); kinetic(h, t + 0.45);
  const s = el('div', 'sub', sc.sub); s.style.marginTop = '34px'; s.style.width = '820px'; tw.appendChild(s); rise(s, t + 1.1);
  const p = portal(cam, 1395, 470, 285, t + 0.3, { imgW: 640 }); pulses.push({ e: p._glow, base: .75, amp: .0 });
  const np = place(el('div', 'nameplate glass', `<div class="nm">Patrick Diamitani</div><div class="rl">Your instructor</div>`), 1395 - 200, 790, 400);
  cam.appendChild(np);
  const instrLine = sc.lines[1] || sc.lines[0];
  tl.fromTo(np, { y: 30, opacity: 0, scale: .9 }, { y: 0, opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.6)' }, Math.max(t + 1.2, instrLine.start - 0.2));
};

B.cameo = (sc, cam) => {
  const t = sc.start;
  // canvas with Pat's real footage (bg removed)
  const c = el('canvas'); c.width = 680; c.height = 620; c.style.width = '800px'; c.style.height = '729px';
  const p = portal(cam, 1380, 520, 300, t + 0.1, { canvas: c });
  cameoCanvases.push({ c, sc, ctx: c.getContext('2d') });
  pulses.push({ e: p._glow, base: .55, amp: .6 });
  const np = place(el('div', 'nameplate glass', `<div class="nm">Patrick Diamitani</div><div class="rl">LetsVibeAI</div>`), 1380 - 190, 772, 380);
  cam.appendChild(np); rise(np, t + 0.9, { y: 24 });
  if (sc.eyebrow) { const e = place(el('div', 'eyebrow', sc.eyebrow), 140, 200); cam.appendChild(e); rise(e, t, { y: 16 }); }
  const q = place(el('div', 'h', sc.quote), 140, 260, 860); q.style.fontSize = '104px'; cam.appendChild(q);
  kinetic(q, t + 0.35, 0.09, 1.0);
  const strike = q.querySelector('.strk .ln');
  if (strike) tl.to(strike, { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, sc.clip_start + 0.9);
  (sc.items || []).forEach((it, i) => {
    const r = place(el('div', 'row', `<div class="itile g">${icon(it.icon)}</div><div><div class="tt" style="font-size:30px">${it.t}</div></div>`), 146, 560 + i * 98);
    cam.appendChild(r);
    tl.fromTo(r, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .7, ease: 'power3.out' }, it.time);
  });
};
const cameoCanvases = [];
const cameoFrames = {};

B.orbit = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 760, size: 78 });
  const cx = 1370, cy = 540, R = 290;
  const wrap = place(el('div'), cx - 400, cy - 400, 800, 800); cam.appendChild(wrap);
  wrap.innerHTML = `<svg width="800" height="800" style="position:absolute;inset:0;overflow:visible">
    <defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4F9BFF"/><stop offset=".5" stop-color="#8B6CFF"/><stop offset="1" stop-color="#34D399"/></linearGradient></defs>
    <circle class="oring" cx="400" cy="400" r="${R}" fill="none" stroke="url(#og)" stroke-width="2.5" stroke-dasharray="6 14" opacity=".8"/>
    <circle class="oring2" cx="400" cy="400" r="${R + 46}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="1.5"/>
    ${sc.orbit.map((o, i) => { const a = (-90 + 45 + i * 90) * Math.PI / 180; return `<line class="ol" x1="400" y1="400" x2="${400 + Math.cos(a) * R}" y2="${400 + Math.sin(a) * R}" stroke="url(#og)" stroke-width="3" stroke-dasharray="${R}" stroke-dashoffset="${R}"/>`; }).join('')}
  </svg>`;
  const oring = wrap.querySelector('.oring');
  tl.fromTo(oring, { opacity: 0, scale: .7, transformOrigin: '400px 400px' }, { opacity: .85, scale: 1, duration: 1.2, ease: 'expo.out' }, t + .2);
  spinners.push({ e: oring, speed: 6, svg: true });
  const ringLab = place(el('div', 'eyebrow', sc.ring), 400 - 80, 400 - R - 92); ringLab.style.color = '#B7A6FF'; wrap.appendChild(ringLab); rise(ringLab, t + .6, { y: 10 });
  const core = place(el('div'), 400 - 125, 400 - 125, 250, 250); wrap.appendChild(core);
  core.innerHTML = `<div style="position:absolute;inset:-60px;border-radius:50%;background:radial-gradient(circle,rgba(79,155,255,.55),transparent 65%)"></div>
    <div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,#5aa2ff,#4a3fd8 55%,#1d1a6b);box-shadow:0 0 80px rgba(124,92,252,.6), inset 0 0 40px rgba(255,255,255,.18);display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div style="width:64px;height:64px;color:#fff">${icon(sc.coreIcon || 'brain')}</div>
      <div style="font-size:30px;font-weight:800;letter-spacing:4px;margin-top:6px">${sc.core.t}</div>
      <div style="font-size:18px;color:#d9defa;margin-top:2px">${sc.core.d}</div></div>`;
  tl.fromTo(core, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.5)' }, sc.lines[0].start - .2);
  pulses.push({ e: core.firstChild, base: .7, amp: .5 });
  const lines = wrap.querySelectorAll('.ol');
  sc.orbit.forEach((o, i) => {
    const a = (-90 + 45 + i * 90) * Math.PI / 180;
    const nx = 400 + Math.cos(a) * R, ny = 400 + Math.sin(a) * R;
    const node = place(el('div', 'glass', `<div style="display:flex;align-items:center;gap:16px"><div class="itile" style="width:58px;height:58px;padding:13px">${icon(o.icon)}</div><div style="font-size:26px;font-weight:700;white-space:nowrap">${o.t}</div></div>`), 0, 0);
    node.style.padding = '14px 24px 14px 14px'; node.style.borderRadius = '22px';
    wrap.appendChild(node);
    const left = Math.cos(a) < 0;
    gsap.set(node, { x: nx + (left ? -290 : -30), y: ny - 43 });
    if (left) node.style.flexDirection = 'row';
    tl.to(lines[i], { strokeDashoffset: 0, duration: .6, ease: 'power2.out' }, o.time - .25);
    tl.fromTo(node, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .7, ease: 'back.out(1.7)' }, o.time);
  });
  // closing chip row
  if (sc.chips) {
    const ct = sc.lines[Math.min(sc.chipsCue ?? 2, sc.lines.length - 1)].start;
    const chips = place(el('div', '', sc.chips.map(x => `<span style="display:inline-block;padding:10px 20px;margin:0 12px 12px 0;border-radius:30px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);font-size:22px;font-weight:600">${x}</span>`).join('')), 140, 560, 760);
    cam.appendChild(chips); rise(Array.from(chips.children), ct, { y: 20, stagger: .18, dur: .6 });
  }
};

B.layers = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 900, size: 66, y: 150 });
  const N = sc.items.length;
  // list
  const rows = sc.items.map((it, i) => {
    const r = place(el('div', 'row', `<div class="lnum" style="font-family:JBM;font-size:20px;color:#6f86ad;width:34px">${pad2(i + 1)}</div><div class="itile">${icon(it.icon)}</div><div><div class="tt">${it.t}</div><div class="dd">${it.d}</div></div>`), 140, 340 + i * 102);
    cam.appendChild(r); return r;
  });
  // 3D stack
  const persp = place(el('div'), 1000, 120, 820, 760); persp.style.perspective = '2200px'; cam.appendChild(persp);
  const stack = place(el('div'), 230, 300, 380, 380); stack.style.transformStyle = 'preserve-3d';
  stack.style.transform = 'rotateX(60deg) rotateZ(-40deg)'; persp.appendChild(stack);
  const cols = ['#2F80ED', '#5a6cf6', '#7C5CFC', '#20C7D9', '#34D399'];
  const slabs = sc.items.map((it, i) => {
    const s = el('div'); Object.assign(s.style, { position: 'absolute', inset: '0', borderRadius: '40px', border: `2px solid ${cols[i]}`,
      background: `linear-gradient(135deg, ${cols[i]}55, ${cols[i]}14)`, boxShadow: `0 0 60px ${cols[i]}33`,
      display: 'flex', alignItems: 'flex-end', padding: '30px', fontWeight: 800, fontSize: '40px', letterSpacing: '1px', color: '#fff' });
    s.innerHTML = `<span style="opacity:.9">${it.t.toUpperCase()}</span>`;
    stack.appendChild(s); return s;
  });
  sc.items.forEach((it, i) => {
    tl.fromTo(rows[i], { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .6, ease: 'power3.out' }, it.time - .1);
    tl.fromTo(slabs[i], { z: i * 100 + 340, opacity: 0 }, { z: i * 100, opacity: 1, duration: .9, ease: 'expo.out' }, it.time - .15);
    tl.to(slabs[i], { boxShadow: `0 0 120px ${cols[i]}aa`, duration: .4 }, it.time);
    if (i < N - 1) {
      tl.to(slabs[i], { boxShadow: `0 0 50px ${cols[i]}33`, duration: .4 }, sc.items[i + 1].time);
      tl.to(rows[i], { opacity: .55, duration: .4 }, sc.items[i + 1].time);
    }
  });
  // final: all rows full and stack slowly rotates
  tl.to(rows, { opacity: 1, duration: .5 }, sc.items[N - 1].time + 1.6);
  tl.fromTo(stack, { rotationZ: -40 }, { rotationZ: -28, duration: sc.dur, ease: 'none' }, t);
};

B.grid = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1400, size: 70, y: 150 });
  sc.groups.forEach((g, gi) => {
    const y = 360 + gi * 220;
    const gh = place(el('div', 'row', `<div class="itile ${gi ? 'g' : ''}" style="width:56px;height:56px;padding:13px">${icon(g.icon)}</div><div class="tt" style="font-size:28px;width:260px;line-height:1.15">${g.t}</div>`), 140, y + 40);
    cam.appendChild(gh); rise(gh, g.time - .2, { y: 20 });
    g.cards.forEach((c, ci) => {
      const card = place(el('div', 'glass', `<div style="display:flex;align-items:center;gap:22px;height:100%">
        <div style="width:92px;height:92px;border-radius:24px;display:grid;place-items:center;font-size:34px;font-weight:800;background:${gi ? 'linear-gradient(140deg,#20C7D9,#34D399)' : 'linear-gradient(140deg,#2F80ED,#7C5CFC)'};color:#fff;box-shadow:0 12px 40px rgba(0,0,0,.35)">${c.m}</div>
        <div><div style="font-size:34px;font-weight:700;letter-spacing:-.6px;white-space:nowrap">${c.t}</div><div style="font-size:21px;color:#9FB0CC;margin-top:4px">${c.d}</div></div></div>`), 480 + ci * 440, y, 410, 160);
      card.style.padding = '0 28px'; cam.appendChild(card);
      tl.fromTo(card, { y: 60, opacity: 0, rotateX: -25, scale: .92 }, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: .8, ease: 'back.out(1.4)' }, g.time + ci * .22);
    });
  });
  if (sc.banner) {
    const b = place(el('div', '', `<span style="width:30px;height:30px;display:inline-block;vertical-align:middle;margin-right:14px;color:#34D399">${icon('sparkles')}</span>${sc.banner.t}`), 0, 818, W);
    b.style.textAlign = 'center'; b.style.fontSize = '30px'; b.style.fontWeight = '700';
    cam.appendChild(b); rise(b, sc.banner.time, { y: 24 });
  }
};

B.terminal = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 640, size: 64, y: 190, subY: 270 });
  const tw = place(el('div', 'term', `<div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><span>${sc.window}</span></div><div class="body"></div>`), 860, 210, 940, 560);
  cam.appendChild(tw);
  tl.fromTo(tw, { y: 80, opacity: 0, rotateY: -14, transformPerspective: 1600 }, { y: 0, opacity: 1, rotateY: 0, duration: 1.1, ease: 'expo.out' }, t + .25);
  terminals.push({ body: tw.querySelector('.body'), cmds: sc.commands, sc });
  if (sc.callout) {
    const c = place(el('div', 'glass', `<div style="display:flex;gap:20px;align-items:center"><div class="itile g">${icon(sc.callout.icon)}</div>
      <div><div style="font-family:JBM;font-size:16px;letter-spacing:2px;color:#34D399;text-transform:uppercase">${sc.callout.label}</div><div style="font-size:26px;font-weight:600;margin-top:6px;line-height:1.3">${sc.callout.t}</div></div></div>`), 140, 560, 640);
    c.style.padding = '26px 30px'; cam.appendChild(c);
    tl.fromTo(c, { x: -50, opacity: 0, scale: .95 }, { x: 0, opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.5)' }, sc.callout.time);
  }
};
const terminals = [];
function renderTerminal(T, t) {
  let html = '';
  let cursorPlaced = false;
  for (let i = 0; i < T.cmds.length; i++) {
    const c = T.cmds[i];
    if (t < c.time) break;
    const tdur = Math.min(1.5, Math.max(.5, c.cmd.length * .045));
    const n = Math.floor(Math.min(1, (t - c.time) / tdur) * c.cmd.length);
    const typed = c.cmd.slice(0, n).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const typing = n < c.cmd.length;
    html += c.comment ? `<span class="cm">${typed}</span>` : `<span class="pr">❯ </span>${typed}`;
    const next = T.cmds[i + 1];
    if (typing || !next || t < next.time) { if (!cursorPlaced && (typing || !c.out || t < c.time + tdur + .3)) { html += `<span class="cur" style="opacity:${(Math.floor(t * 2.2) % 2 && !typing) ? 0 : 1}"></span>`; cursorPlaced = true; } }
    html += '\n';
    if (c.out && t >= c.time + tdur + .3) html += `<span class="${c.ok ? 'ok' : 'out'}">${c.out}</span>\n`;
  }
  if (T._last !== html) { T.body.innerHTML = html; T._last = html; }
}

B.steps = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1400, size: 72, y: 150 });
  const N = sc.steps.length;
  const xs = sc.steps.map((_, i) => N === 3 ? [330, 960, 1590][i] : 300 + i * (1320 / (N - 1)));
  const ys = sc.steps.map((_, i) => 640 - i * (130 / (N - 1)));
  const cw = N === 3 ? 460 : 380;
  const svg = place(el('div'), 0, 0, W, H); cam.appendChild(svg);
  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < N; i++) { const dx = (xs[i] - xs[i - 1]) / 2; d += ` C ${xs[i - 1] + dx} ${ys[i - 1]}, ${xs[i] - dx} ${ys[i]}, ${xs[i]} ${ys[i]}`; }
  svg.innerHTML = `<svg width="${W}" height="${H}" style="position:absolute;inset:0"><defs><linearGradient id="sg" x1="0" x2="1"><stop offset="0" stop-color="#4F9BFF"/><stop offset=".5" stop-color="#8B6CFF"/><stop offset="1" stop-color="#34D399"/></linearGradient></defs>
    <path d="${d}" stroke="rgba(255,255,255,.08)" stroke-width="6" fill="none"/><path class="sp" d="${d}" stroke="url(#sg)" stroke-width="6" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="filter:drop-shadow(0 0 12px rgba(124,92,252,.8))"/></svg>`;
  const sp = svg.querySelector('.sp');
  sc.steps.forEach((s, i) => {
    const node = place(el('div'), xs[i] - 60, ys[i] - 60, 120, 120);
    node.innerHTML = `<div style="position:absolute;inset:-30px;border-radius:50%;background:radial-gradient(circle,rgba(124,92,252,.5),transparent 70%)"></div><div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(140deg,#2F80ED,#7C5CFC 55%,#34D399);padding:4px"><div style="width:100%;height:100%;border-radius:50%;background:#0a1d45;display:grid;place-items:center;padding:30px;color:#fff">${icon(s.icon)}</div></div>`;
    cam.appendChild(node);
    const lab = place(el('div', '', `<span style="font-family:JBM;font-size:20px;color:#34D399;margin-right:10px">${pad2(i + 1)}</span><span style="font-size:34px;font-weight:800">${s.t}</span>`), xs[i] - 200, ys[i] - 140, 400);
    lab.style.textAlign = 'center'; cam.appendChild(lab);
    const card = place(el('div', 'glass', s.p ? `<div style="font-family:JBM;font-size:${N === 3 ? 24 : 21}px;line-height:1.4;color:#dfe8f7"><span style="color:#34D399">❯ </span><span class="ty"></span></div>` : `<div style="font-size:24px;line-height:1.35;color:#c9d6ea;text-align:center">${s.d || ''}</div>`), xs[i] - cw / 2, ys[i] + 95, cw);
    card.style.padding = '22px 26px'; cam.appendChild(card);
    if (s.p) typers.push({ e: card.querySelector('.ty'), text: s.p, t0: s.time + .35 });
    tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .8, ease: 'back.out(2)' }, s.time - .15);
    rise(lab, s.time, { y: 20, dur: .6 }); rise(card, s.time + .15, { y: 30, dur: .7 });
    if (i > 0) tl.to(sp, { strokeDashoffset: 1 - i / (N - 1), duration: .9, ease: 'power2.inOut' }, s.time - .6);
  });
};
const typers = [];

B.recap = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 860, size: 74, y: 160 });
  sc.takeaways.forEach((k, i) => {
    const r = place(el('div', 'row', `<svg width="54" height="54" viewBox="0 0 54 54" style="flex:none"><circle cx="27" cy="27" r="24" fill="rgba(52,211,153,.12)" stroke="#34D399" stroke-width="2.5"/><path class="ck" d="M16 28 l7 7 l15 -16" fill="none" stroke="#34D399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg><div class="tt" style="font-size:31px;line-height:1.25;width:760px">${k.t}</div>`), 140, 360 + i * 120);
    cam.appendChild(r);
    tl.fromTo(r, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .6, ease: 'power3.out' }, k.time);
    tl.to(r.querySelector('.ck'), { strokeDashoffset: 0, duration: .45, ease: 'power2.out' }, k.time + .3);
  });
  const m = sc.mission;
  const card = place(el('div', '', `<div style="position:absolute;inset:0;border-radius:32px;padding:3px;background:linear-gradient(140deg,#2F80ED,#7C5CFC,#34D399);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor"></div>
    <div style="position:absolute;inset:-60px;border-radius:60px;background:radial-gradient(circle at 50% 40%,rgba(124,92,252,.28),transparent 65%);z-index:-1"></div>
    <div style="padding:52px 54px">
      <div style="display:flex;align-items:center;gap:18px"><div class="itile g" style="width:72px;height:72px;padding:17px">${icon(m.icon)}</div><div class="eyebrow" style="color:#34D399">Your mission</div></div>
      <div style="font-size:40px;font-weight:700;line-height:1.3;margin-top:34px;letter-spacing:-.6px">${m.t}</div>
      <div style="margin-top:38px;display:flex;align-items:center;gap:14px;font-family:JBM;font-size:18px;color:#9FB0CC">${Array.from({ length: 10 }, (_, i) => `<i style="display:block;width:${i < L.lesson ? 34 : 18}px;height:8px;border-radius:5px;background:${i < L.lesson ? 'linear-gradient(90deg,#2F80ED,#34D399)' : 'rgba(255,255,255,.14)'}"></i>`).join('')}<span style="margin-left:10px;white-space:nowrap;font-size:16px">Lesson ${pad2(L.lesson)} of 10</span></div>
    </div>`), 1060, 250, 720, 560);
  card.style.background = 'rgba(8,22,52,.75)'; card.style.borderRadius = '32px'; cam.appendChild(card);
  tl.fromTo(card, { y: 70, opacity: 0, scale: .94, rotateY: 12, transformPerspective: 1600 }, { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.1, ease: 'expo.out' }, m.time - .3);
};

B.next = (sc, cam) => {
  const t = sc.start;
  const nx = L.next || {};
  const eb = nx.final ? 'Course complete' : (nx.promo ? 'Start here' : 'Up next');
  const nl = nx.final ? L.course : `Lesson ${pad2(nx.lesson)}`;
  const e = place(el('div', 'eyebrow', eb), 140, 250); cam.appendChild(e); rise(e, t, { y: 16 });
  const n = place(el('div', 'h grad', nl), 140, 300); n.style.fontSize = '46px'; n.style.letterSpacing = '-1px'; cam.appendChild(n); rise(n, t + .15, { y: 20 });
  const h = place(el('div', 'h', L.next.title), 140, 370, 980); h.style.fontSize = '92px'; cam.appendChild(h); kinetic(h, t + .3);
  const cta = place(el('div', '', `<span style="display:inline-flex;align-items:center;gap:14px;padding:16px 30px;border-radius:40px;background:linear-gradient(100deg,#2F80ED,#7C5CFC 55%,#34D399);font-size:26px;font-weight:700;color:#fff;box-shadow:0 20px 60px rgba(124,92,252,.45)">letsvibeai.com <span style="width:26px;height:26px;display:inline-block">${icon('arrow-right')}</span></span><span style="margin-left:26px;font-size:24px;font-weight:600;color:#B9C6DD;letter-spacing:1px">Learn. Build. Ship.</span>`), 140, 720);
  cam.appendChild(cta); rise(cta, sc.lines[2] ? sc.lines[2].start - .3 : t + 2, { y: 30 });
  const p = portal(cam, 1440, 470, 255, t + .2, { imgW: 572 }); pulses.push({ e: p._glow, base: .75, amp: 0 });
  const np = place(el('div', 'nameplate glass', `<div class="nm">${nx.final ? 'Proud of you' : (nx.promo ? 'Patrick Diamitani' : 'See you in the next one')}</div><div class="rl">${nx.promo ? 'Your instructor' : '— Pat'}</div>`), 1440 - 220, 760, 440);
  cam.appendChild(np); rise(np, t + 1.0, { y: 24 });
};

B.statement = (sc, cam) => {
  const t = sc.start;
  if (sc.eyebrow) { const e = place(el('div', 'eyebrow', sc.eyebrow), 0, 330, W); e.style.justifyContent = 'center'; e.style.display = 'flex'; cam.appendChild(e); rise(e, t, { y: 16 }); }
  const h = place(el('div', 'h', sc.headline), 160, 390, 1600); h.style.fontSize = '104px'; h.style.textAlign = 'center'; cam.appendChild(h); kinetic(h, t + .2, .09, 1);
  if (sc.sub) { const s = place(el('div', 'sub', sc.sub), 260, 660, 1400); s.style.textAlign = 'center'; cam.appendChild(s); rise(s, t + 1); }
};

/* ---------- code editor ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function hl(line, lang) {
  if (/^\s*(---|```)\s*$/.test(line)) return `<span style="color:#5d6f93">${esc(line)}</span>`;
  if (/^\s*#/.test(line) && lang !== 'json') return `<span style="color:#B7A6FF;font-weight:600">${esc(line)}</span>`;
  const C = (c, x) => `<span style="color:${c}">${x}</span>`;
  const parts = lang === 'json' ? line.split(/("[^"]*")/) : [line];
  return parts.map((tok, i) => {
    if (lang === 'json' && /^"/.test(tok)) return C(/^\s*:/.test(parts[i + 1] || '') ? '#7FD4FF' : '#7CE3B4', esc(tok));
    let x = esc(tok);
    if (i === 0) {
      x = x.replace(/^(\s*)(- |\d+\. |├── |└── |│   )/, (m, a, b) => a + C('#34D399', b));
      if (lang !== 'json') x = x.replace(/^((?:\s|<[^>]+>[^<]*<\/span>)*)([A-Za-z_][\w-]*)(:)(?=\s|$)/, (m, a, k, c) => a + C('#7FD4FF', k) + c);
    }
    x = x.replace(/`([^`]+)`/g, (m) => C('#FFB86B', m));
    x = x.replace(/(\$\{[A-Z_]+\}|\$ARGUMENTS)/g, (m) => C('#FF9BC1', m));
    return x;
  }).join('');
}
B.code = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 640, size: 62, y: 170, subY: sc.subY || 240 });
  const lines = sc.code.split('\n'); const LH = 40;
  const hgt = Math.min(640, 120 + lines.length * LH);
  const x0 = 820, y0 = Math.max(190, 520 - hgt / 2), wid = 980;
  const ed = place(el('div', 'term', `<div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><span style="color:#cfe0ff">${sc.path}</span></div><div class="body" style="position:relative;padding:28px 0 28px 0;font-size:24px;line-height:${LH}px"></div>`), x0, y0, wid, hgt);
  cam.appendChild(ed);
  tl.fromTo(ed, { y: 80, opacity: 0, rotateY: -14, transformPerspective: 1600 }, { y: 0, opacity: 1, rotateY: 0, duration: 1.1, ease: 'expo.out' }, t + .25);
  const body = ed.querySelector('.body');
  const lang = /json$/.test(sc.path) ? 'json' : 'md';
  const lineEls = lines.map((ln, i) => {
    const d = el('div', '', `<span style="display:inline-block;width:64px;text-align:right;margin-right:28px;color:#3e5079">${i + 1}</span>${hl(ln, lang) || ' '}`);
    d.style.position = 'relative'; d.style.zIndex = 2; d.style.whiteSpace = 'pre'; body.appendChild(d); return d;
  });
  // reveal: lines appear by cue groups or typed in sequence
  if (sc.reveal) {
    sc.reveal.forEach(r => { const els = lineEls.slice(r.from - 1, r.to); tl.fromTo(els, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .45, stagger: .07, ease: 'power2.out' }, r.time); });
  } else {
    tl.fromTo(lineEls, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .4, stagger: .07, ease: 'power2.out' }, t + .9);
  }
  (sc.highlights || []).forEach((h, k) => {
    const band = el('div'); Object.assign(band.style, { position: 'absolute', left: '14px', right: '14px', top: (28 + (h.from - 1) * LH - 4) + 'px', height: ((h.to - h.from + 1) * LH + 8) + 'px',
      borderRadius: '12px', background: 'linear-gradient(90deg, rgba(124,92,252,.28), rgba(47,128,237,.10))', borderLeft: '4px solid #34D399', zIndex: 1 });
    body.appendChild(band);
    const tag = el('div', '', h.label); Object.assign(tag.style, { position: 'absolute', right: '22px', top: (28 + (h.from - 1) * LH + 2) + 'px', zIndex: 3, fontFamily: 'Sora', fontSize: '17px', fontWeight: 700,
      letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '20px', background: 'linear-gradient(100deg,#20C7D9,#34D399)', color: '#04112a' });
    body.appendChild(tag);
    tl.fromTo(band, { opacity: 0, scaleX: .2, transformOrigin: '0 50%' }, { opacity: 1, scaleX: 1, duration: .5, ease: 'power3.out' }, h.time);
    tl.fromTo(tag, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: .4 }, h.time + .15);
    const nxt = sc.highlights[k + 1];
    if (nxt) { tl.fromTo(band, { opacity: 1 }, { opacity: .25, duration: .4, immediateRender: false }, nxt.time); tl.fromTo(tag, { opacity: 1 }, { opacity: 0, duration: .3, immediateRender: false }, nxt.time); }
    if (h.note) {
      const r = place(el('div', 'row', `<div class="itile ${k % 2 ? 'g' : ''}" style="width:54px;height:54px;padding:13px">${icon(h.icon || 'arrow-right')}</div><div class="tt" style="font-size:26px;line-height:1.3;width:520px;font-weight:600">${h.note}</div>`), 140, (sc.notesY || 430) + k * ((sc.highlights.length > 3) ? 82 : 96));
      cam.appendChild(r); tl.fromTo(r, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .6, ease: 'power3.out' }, h.time);
    }
  });
};

/* ---------- cards row ---------- */
B.cards = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1500, size: 70, y: 160, subY: 160 });
  const N = sc.cards.length, gap = 28, total = 1640, cw = (total - gap * (N - 1)) / N;
  const y = sc.sub ? 420 : 380;
  sc.cards.forEach((c, i) => {
    const card = place(el('div', 'glass', `<div class="itile ${i % 2 ? 'g' : ''}" style="width:76px;height:76px;padding:18px">${icon(c.icon)}</div>
      <div style="font-family:JBM;font-size:18px;color:#5f7aa6;margin-top:30px">${pad2(i + 1)}</div>
      <div style="font-size:${N > 4 ? 28 : 33}px;font-weight:800;letter-spacing:-.6px;margin-top:6px;line-height:1.15">${c.t}</div>
      ${c.d ? `<div style="font-size:${N > 4 ? 20 : 22}px;color:#9FB0CC;margin-top:12px;line-height:1.4">${c.d}</div>` : ''}`), 140 + i * (cw + gap), y, cw, sc.cardH || 320);
    card.style.padding = '36px 32px'; cam.appendChild(card);
    tl.fromTo(card, { y: 80, opacity: 0, rotateX: -30, transformPerspective: 1400, scale: .94 }, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: .85, ease: 'back.out(1.3)' }, c.time);
    tl.to(card, { boxShadow: '0 30px 80px rgba(0,0,0,.35), 0 0 0 2px rgba(52,211,153,.55), 0 0 60px rgba(52,211,153,.25)', duration: .35 }, c.time + .2);
    const nx = sc.cards[i + 1];
    tl.to(card, { boxShadow: '0 30px 80px rgba(0,0,0,.35), 0 0 0 0px rgba(52,211,153,0), 0 0 0px rgba(52,211,153,0)', duration: .4 }, nx ? nx.time : sc.end - 1.2);
  });
};

/* ---------- compare ---------- */
B.compare = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1500, size: 70, y: 150 });
  const sides = [sc.left, sc.right];
  const panels = sides.map((s, i) => {
    const good = s.tone === 'good';
    const p = place(el('div', 'glass', `<div style="display:flex;align-items:center;gap:18px">
        <div class="itile ${good ? 'g' : ''}" style="${good ? '' : 'background:linear-gradient(140deg,rgba(255,93,122,.35),rgba(124,92,252,.2))'}">${icon(s.icon)}</div>
        <div><div style="font-size:16px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${good ? '#34D399' : '#FF7A93'}">${s.tag || (good ? 'Do this' : 'Not this')}</div>
        <div style="font-size:36px;font-weight:800;letter-spacing:-.8px;margin-top:4px">${s.title}</div></div></div>
      <div class="its" style="margin-top:30px"></div>`), i ? 1000 : 140, 340, 780, 480);
    p.style.padding = '40px 44px'; if (good) p.style.borderColor = 'rgba(52,211,153,.35)';
    cam.appendChild(p);
    const box = p.querySelector('.its');
    const rows = s.items.map((it, k) => {
      const r = el('div', '', `<span style="flex:none;width:30px;height:30px;color:${good ? '#34D399' : '#FF7A93'}">${icon(good ? 'check' : 'x')}</span><span>${it}</span>`);
      Object.assign(r.style, { display: 'flex', gap: '16px', alignItems: 'center', fontSize: s.mono ? '23px' : '27px', fontFamily: s.mono ? 'JBM' : 'Sora', fontWeight: s.mono ? 400 : 600, padding: '13px 0', borderBottom: k < s.items.length - 1 ? '1px solid rgba(255,255,255,.07)' : 'none', color: '#e3ebf7' });
      box.appendChild(r); return r;
    });
    tl.fromTo(p, { y: 60, opacity: 0, rotateY: i ? 12 : -12, transformPerspective: 1600 }, { y: 0, opacity: 1, rotateY: 0, duration: .9, ease: 'expo.out' }, s.time);
    tl.fromTo(rows, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .45, stagger: .28, ease: 'power2.out' }, s.time + .35);
    return p;
  });
  const vs = place(el('div', '', 'VS'), 960 - 40, 540, 80, 80);
  Object.assign(vs.style, { borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '24px', background: 'linear-gradient(140deg,#2F80ED,#7C5CFC)', boxShadow: '0 0 40px rgba(124,92,252,.6)' });
  cam.appendChild(vs); tl.fromTo(vs, { scale: 0 }, { scale: 1, duration: .6, ease: 'back.out(2)' }, sc.right.time - .2);
  tl.to(panels[0], { opacity: .5, filter: 'saturate(.3)', scale: .97, duration: .6 }, sc.right.time + .2);
  tl.to(panels[1], { boxShadow: '0 30px 80px rgba(0,0,0,.35), 0 0 80px rgba(52,211,153,.22)', duration: .6 }, sc.right.time + .2);
};

/* ---------- table (per-harness) ---------- */
B.table = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 620, size: 66, y: 190, subY: 260 });
  const N = sc.rows.length, RH = Math.min(96, 560 / N);
  const y0 = 540 - (N * RH) / 2;
  sc.rows.forEach((r, i) => {
    const row = place(el('div', 'glass', `<div style="display:flex;align-items:center;height:100%;gap:22px">
      <div style="width:58px;height:58px;border-radius:16px;display:grid;place-items:center;font-weight:800;font-size:22px;flex:none;background:${i % 2 ? 'linear-gradient(140deg,#20C7D9,#34D399)' : 'linear-gradient(140deg,#2F80ED,#7C5CFC)'}">${r.m || r.t.slice(0, 2)}</div>
      <div style="font-size:27px;font-weight:700;width:270px;white-space:nowrap">${r.t}</div>
      <div style="font-family:JBM;font-size:22px;color:#bfe9ff;padding:8px 16px;border-radius:12px;background:rgba(32,199,217,.08);border:1px solid rgba(32,199,217,.25);white-space:nowrap">${esc(r.v)}</div>
      ${r.tag ? `<div class="rtag" style="margin-left:auto;font-size:15px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 14px;border-radius:20px;background:linear-gradient(100deg,#20C7D9,#34D399);color:#04112a;white-space:nowrap">${r.tag}</div>` : ''}</div>`), 820, y0 + i * RH, 980, RH - 16);
    row.style.padding = '0 22px'; row.style.borderRadius = '20px'; cam.appendChild(row);
    tl.fromTo(row, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: .7, ease: 'power3.out' }, (sc.rowsAt ?? (t + .9)) + i * .16);
    if (r.time) tl.to(row, { boxShadow: '0 0 0 2px rgba(52,211,153,.7), 0 0 60px rgba(52,211,153,.25)', scale: 1.03, duration: .5 }, r.time);
  });
};

/* ---------- tree (lead -> specialists) ---------- */
B.tree = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1500, size: 66, y: 140 });
  const lx = 960, ly = 390;
  const lead = place(el('div', 'glass', `<div style="display:flex;align-items:center;gap:18px"><div class="itile">${icon(sc.leader.icon)}</div><div><div style="font-size:30px;font-weight:800">${sc.leader.t}</div><div style="font-size:19px;color:#9FB0CC">${sc.leader.d}</div></div></div>`), lx - 220, ly - 55, 440);
  lead.style.padding = '20px 26px'; cam.appendChild(lead);
  tl.fromTo(lead, { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .8, ease: 'back.out(1.6)' }, sc.leader.time ?? t + .8);
  const N = sc.nodes.length; const xs = sc.nodes.map((_, i) => 960 + (i - (N - 1) / 2) * 420), ny = 680;
  const svg = place(el('div'), 0, 0, W, H); cam.insertBefore(svg, cam.firstChild);
  svg.innerHTML = `<svg width="${W}" height="${H}" style="position:absolute;inset:0"><defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8B6CFF"/><stop offset="1" stop-color="#34D399"/></linearGradient></defs>${xs.map(x => `<path class="tp" d="M ${lx} ${ly + 60} C ${lx} ${ly + 160}, ${x} ${ny - 170}, ${x} ${ny - 70}" stroke="url(#tg)" stroke-width="4" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="filter:drop-shadow(0 0 10px rgba(124,92,252,.7))"/>`).join('')}</svg>`;
  const paths = svg.querySelectorAll('.tp');
  sc.nodes.forEach((n, i) => {
    const node = place(el('div', 'glass', `<div class="itile ${i % 2 ? 'g' : ''}" style="margin:0 auto">${icon(n.icon)}</div><div style="font-size:28px;font-weight:800;margin-top:16px">${n.t}</div><div style="font-size:19px;color:#9FB0CC;margin-top:6px">${n.d || ''}</div>
      ${sc.badge ? `<div class="bdg" style="margin-top:16px;display:inline-block;font-family:JBM;font-size:15px;padding:5px 12px;border-radius:14px;border:1px solid rgba(52,211,153,.4);color:#7CE3B4">${sc.badge.t}</div>` : ''}`), xs[i] - 180, ny - 70, 360);
    node.style.padding = '26px 22px'; node.style.textAlign = 'center'; cam.appendChild(node);
    tl.to(paths[i], { strokeDashoffset: 0, duration: .6, ease: 'power2.out' }, n.time - .3);
    tl.fromTo(node, { y: 50, opacity: 0, scale: .85 }, { y: 0, opacity: 1, scale: 1, duration: .7, ease: 'back.out(1.6)' }, n.time);
    if (sc.badge) tl.fromTo(node.querySelector('.bdg'), { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, sc.badge.time + i * .15);
  });
};

/* ---------- equation (One Must Act) ---------- */
B.equation = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1500, size: 66, y: 150 });
  const N = sc.terms.length; const xs = sc.terms.map((_, i) => 960 + (i - (N - 1) / 2) * 400);
  sc.terms.forEach((m, i) => {
    const big = place(el('div', '', m.v), xs[i] - 190, 380, 380); Object.assign(big.style, { textAlign: 'center', fontSize: m.v.length > 3 ? '130px' : '170px', fontWeight: 800, letterSpacing: '-6px', lineHeight: '200px' });
    big.className = 'grad'; cam.appendChild(big);
    const lab = place(el('div', '', `<div style="font-size:30px;font-weight:800">${m.t}</div><div style="font-size:21px;color:#9FB0CC;margin-top:8px;line-height:1.35">${m.d}</div>`), xs[i] - 175, 600, 350); lab.style.textAlign = 'center'; cam.appendChild(lab);
    tl.fromTo(big, { opacity: 0, scale: .4, filter: 'blur(16px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: .9, ease: 'expo.out' }, m.time);
    rise(lab, m.time + .25, { y: 20 });
    if (i < N - 1) {
      const ar = place(el('div', '', icon('chevron-right')), xs[i] + 168, 455, 64, 64); ar.style.color = '#34D399'; ar.style.opacity = .9; cam.appendChild(ar);
      tl.fromTo(ar, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .5 }, sc.terms[i + 1].time - .2);
    }
  });
};

/* ---------- stats ---------- */
B.stats = (sc, cam) => {
  const t = sc.start;
  header(cam, sc, t, { w: 1500, size: 70, y: 170 });
  const N = sc.stats.length; const cw = 1640 / N;
  sc.stats.forEach((s, i) => {
    const b = place(el('div', '', `<div class="num grad" style="font-size:170px;font-weight:800;letter-spacing:-6px;line-height:1.1">0</div><div style="font-size:30px;font-weight:700;margin-top:8px">${s.label}</div>`), 140 + i * cw, 420, cw - 40);
    cam.appendChild(b); rise(b, s.time, { y: 40 });
    counters.push({ e: b.querySelector('.num'), to: s.value, suffix: s.suffix || '', t0: s.time, d: 1.2 });
  });
};
const counters = [];

/* ---------- build ---------- */
const scenesEl = document.getElementById('scenes');
const pillsEl = document.getElementById('pills');
const progEl = document.getElementById('progress');
document.getElementById('vmark').innerHTML = VOUT;
document.getElementById('lockup').innerHTML = `${SYMBOL}<div class="wm">LetsVibe<b>AI</b></div><div class="sep"></div><div class="course">${L.course} · <span>${L.badge || ('Lesson ' + pad2(L.lesson))}</span></div>`;
const segs = [];
L.scenes.forEach((sc, i) => {
  const s = el('div', 'scene'); const cam = el('div', 'cam'); s.appendChild(cam); scenesEl.appendChild(s);
  (B[sc.type] || B.statement)(sc, cam);
  // enter / exit / camera drift
  tl.fromTo(s, { opacity: 0, scale: .965, filter: 'blur(12px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: .75, ease: 'power3.out' }, sc.start);
  tl.fromTo(cam, { scale: 1.0 }, { scale: 1.035, duration: sc.dur, ease: 'none' }, sc.start);
  if (i < L.scenes.length - 1) tl.to(s, { opacity: 0, scale: 1.05, filter: 'blur(14px)', duration: .5, ease: 'power2.in' }, sc.end - .5);
  else tl.to(s, { opacity: 0, duration: .8 }, sc.end - .8);
  // chapter pill
  const pill = el('div', 'pill', `<span class="n">${pad2(i + 1)}/${pad2(L.scenes.length)}</span>${sc.chapter || ''}`); pillsEl.appendChild(pill);
  tl.fromTo(pill, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: .5 }, sc.start + .2);
  tl.to(pill, { opacity: 0, y: 10, duration: .3 }, sc.end - .35);
  const seg = el('div', 'seg', '<i></i>'); progEl.appendChild(seg); segs.push(seg.firstChild);
  // light sweep at each cut
  if (i > 0) tl.fromTo('#flash', { opacity: 0, x: -900 }, { opacity: 1, x: 900, duration: .9, ease: 'power2.inOut' }, sc.start - .45).to('#flash', { opacity: 0, duration: .2 }, sc.start + .35);
});
tl.fromTo('#chrome', { opacity: 0 }, { opacity: 1, duration: 1 }, .2);
tl.to('#chrome', { opacity: 0, duration: .8 }, L.total - 1);

/* ---------- background: light ribbons + particles ---------- */
const bg = document.getElementById('bg'), ctx = bg.getContext('2d');
let seed = 1337; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const P = Array.from({ length: 120 }, () => ({ x: rnd() * W, y: rnd() * H, r: .6 + rnd() * 2.1, vy: 6 + rnd() * 22, ph: rnd() * 6.28, sp: .2 + rnd() * .6, c: ['#20C7D9', '#34D399', '#9b86ff', '#ffffff', '#4F9BFF'][Math.floor(rnd() * 5)] }));
const RIB = [
  { y0: 900, y1: 160, amp: 90, f: .11, ph: 0, cols: ['#2F80ED', '#7C5CFC'], n: 16, a: .16 },
  { y0: 1040, y1: 380, amp: 120, f: .08, ph: 2, cols: ['#20C7D9', '#34D399'], n: 14, a: .12 },
  { y0: 760, y1: -40, amp: 70, f: .13, ph: 4, cols: ['#7C5CFC', '#34D399'], n: 12, a: .09 },
];
function drawBG(t, energy) {
  ctx.clearRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter';
  RIB.forEach((rb, k) => {
    const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, rb.cols[0]); g.addColorStop(1, rb.cols[1]);
    ctx.strokeStyle = g;
    for (let i = 0; i < rb.n; i++) {
      const o = (i - rb.n / 2) * 7, wob = Math.sin(t * rb.f * 6.28 + rb.ph + i * .18);
      ctx.globalAlpha = rb.a * (.5 + .5 * Math.sin(i * .7 + t * .6 + k)) * (.75 + energy * .5);
      ctx.lineWidth = i % 4 === 0 ? 2.2 : 1;
      ctx.beginPath();
      ctx.moveTo(-100, rb.y0 + o);
      ctx.bezierCurveTo(500, rb.y0 - 200 + o + wob * rb.amp, 1200, rb.y1 + 300 + o - wob * rb.amp * 1.2, 2050, rb.y1 + o + wob * 40);
      ctx.stroke();
    }
  });
  P.forEach(p => {
    const y = ((p.y - t * p.vy) % (H + 40) + H + 40) % (H + 40) - 20;
    const x = p.x + Math.sin(t * p.sp + p.ph) * 26;
    ctx.globalAlpha = (.25 + .45 * (.5 + .5 * Math.sin(t * 1.3 + p.ph * 3))) * .9;
    ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(x, y, p.r, 0, 6.283); ctx.fill();
  });
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}

/* ---------- captions ---------- */
const capbox = document.getElementById('capbox');
const allLines = [];
L.scenes.forEach(sc => { if (sc.captions !== false) (sc.lines || []).forEach(l => allLines.push(l)); });
allLines.forEach(l => { // chunk long lines
  const ws = l.words; l.chunks = [];
  if (ws.length <= 10) l.chunks.push(ws);
  else { const k = Math.ceil(ws.length / Math.ceil(ws.length / 8)); for (let i = 0; i < ws.length; i += k) l.chunks.push(ws.slice(i, i + k)); }
});
let capKey = '';
function drawCaptions(t) {
  const l = allLines.find(l => t >= l.start - .15 && t <= l.end + .4);
  if (!l) { capbox.style.opacity = 0; capKey = ''; return; }
  let ch = l.chunks.find(c => t <= c[c.length - 1].e + .05) || l.chunks[l.chunks.length - 1];
  const key = l.start + ':' + l.chunks.indexOf(ch);
  if (key !== capKey) { capbox.innerHTML = ch.map(w => `<span>${w.w}</span>`).join(''); capKey = key; }
  const spans = capbox.children;
  ch.forEach((w, i) => { spans[i].className = t >= w.e ? 'p' : (t >= w.s ? 'c' : ''); });
  const fin = Math.min(1, (t - (l.start - .15)) / .15), fout = Math.min(1, (l.end + .4 - t) / .2);
  capbox.style.opacity = Math.max(0, Math.min(fin, fout));
}

/* ---------- cameo frames ---------- */
const loads = [];
cameoCanvases.forEach(cc => {
  const name = cc.sc.clip;
  if (!cameoFrames[name]) {
    cameoFrames[name] = Array.from({ length: cc.sc.clip_frames }, (_, i) => {
      const im = new Image(); loads.push(new Promise(r => { im.onload = r; im.onerror = r; }));
      im.src = `../assets/cameos/${name}/f/${String(i + 1).padStart(4, '0')}.png`; return im;
    });
  }
});
document.querySelectorAll('img').forEach(im => loads.push(im.complete ? Promise.resolve() : new Promise(r => { im.onload = r; im.onerror = r; })));

/* ---------- seek ---------- */
window.__seek = function (t) {
  tl.seek(t, false);
  const f = Math.max(0, Math.min(L.env.length - 1, Math.round(t * FPS)));
  const energy = L.env[f] || 0;
  drawBG(t, energy);
  drawCaptions(t);
  spinners.forEach(s => { const a = (t * s.speed) % 360; if (s.svg) s.e.setAttribute('transform', `rotate(${a} 400 400)`); else s.e.style.transform = `rotate(${a}deg)`; });
  pulses.forEach(p => { if (p.amp) p.e.style.opacity = Math.min(1, p.base + p.amp * energy); });
  terminals.forEach(T => renderTerminal(T, t));
  typers.forEach(ty => { const n = Math.max(0, Math.floor((t - ty.t0) / .04)); ty.e.textContent = ty.text.slice(0, n); });
  cameoCanvases.forEach(cc => {
    const fr = cameoFrames[cc.sc.clip]; const i = Math.max(0, Math.min(fr.length - 1, Math.floor((t - cc.sc.clip_start) * 30)));
    if (cc._i !== i) { cc.ctx.clearRect(0, 0, 680, 620); if (fr[i].naturalWidth) cc.ctx.drawImage(fr[i], 0, 0); cc._i = i; }
  });
  counters.forEach(c => { const p = Math.max(0, Math.min(1, (t - c.t0) / c.d)); const e = 1 - Math.pow(1 - p, 3); c.e.textContent = Math.round(c.to * e) + c.suffix; });
  L.scenes.forEach((sc, i) => { segs[i].style.width = (Math.max(0, Math.min(1, (t - sc.start) / sc.dur)) * 100) + '%'; });
};
Promise.all([document.fonts.ready, ...loads]).then(() => { window.__seek(0); window.__ready = true; window.__total = L.total; });
})();
