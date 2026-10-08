const C = { navy: '#14224A', paper: '#F5F4EF', amber: '#E9A93B', mute: '#C9CFE3', line: '#33457A', card: '#1C2D5E' };
const FORMATS = { '16:9': [1920, 1080], '1:1': [1080, 1080], '4:5': [1080, 1350], '9:16': [1080, 1920] };
const MOTION = {
  enter: (s, d = 0.7) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutCubic }),
  pop: (s, d = 0.6) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutBack }),
  draw: (s, d = 1) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInOutCubic }),
};
const DISPLAY = "'Outfit', sans-serif", MONO = "'IBM Plex Mono', monospace", BODY = "'Manrope', sans-serif";

function useLayout() {
  const ctx = React.useContext(PromoCtx);
  return ctx;
}
const PromoCtx = React.createContext(null);

function Abs({ children, style }) {
  return <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...style }}>{children}</div>;
}

function Hook() {
  const { T, CUES, u, W } = useLayout();
  const s = CUES.Hook, next = CUES.Layers;
  const a = MOTION.enter(s + 0.1)(T);
  const count = Math.round(10 * MOTION.draw(s + 0.6, 1.4)(T));
  const fill = 0.1 * MOTION.draw(s + 0.6, 1.4)(T) + 0.9 * MOTION.draw(s + 3, 1.1)(T);
  const swap = MOTION.enter(s + 3.1, 0.6)(T);
  const out = 1 - MOTION.enter(next - 0.45, 0.45)(T);
  const barW = Math.min(W * 0.8, 1300 * u);
  return (
    <Abs style={{ opacity: out, gap: 36 * u }}>
      <div style={{ fontFamily: MONO, fontSize: 30 * u, letterSpacing: '0.12em', color: C.mute, textTransform: 'uppercase', opacity: a * (1 - swap), transform: `translateY(${(1 - a) * 20 * u}px)` }}>Most people use</div>
      <div style={{ position: 'relative', height: 240 * u, width: '100%' }}>
        <div style={{ position: 'absolute', inset: 0, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 600, fontSize: 240 * u, lineHeight: 1, letterSpacing: '-0.04em', color: C.paper, opacity: a * (1 - swap), transform: `scale(${0.9 + 0.1 * a})` }}>{count}%</div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: DISPLAY, fontWeight: 600, fontSize: 104 * u, lineHeight: 1.02, letterSpacing: '-0.03em', color: C.paper, opacity: swap, transform: `translateY(${(1 - swap) * 30 * u}px)`, padding: `0 ${60 * u}px` }}>The other 90% is architecture.</div>
      </div>
      <div style={{ width: barW, height: 18 * u, borderRadius: 99, background: C.card, overflow: 'hidden', opacity: a }}>
        <div style={{ width: `${fill * 100}%`, height: '100%', background: C.amber, borderRadius: 99 }}></div>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 30 * u, letterSpacing: '0.12em', color: C.mute, textTransform: 'uppercase', opacity: a * (1 - swap) }}>of Claude.</div>
    </Abs>
  );
}

const LAYERS = [
  ['01', 'Model', 'Claude — app or API'],
  ['02', 'Context', 'Projects · CLAUDE.md · memory'],
  ['03', 'Capabilities', 'Skills · MCP connectors'],
  ['04', 'Surfaces', 'Chat · Cowork · Claude Code'],
  ['05', 'Orchestration', 'Subagents · hooks · schedules'],
];
function Layers() {
  const { T, CUES, u, W, portrait } = useLayout();
  const s = CUES.Layers, next = CUES.Habits;
  const t = MOTION.enter(s + 0.2)(T);
  const out = 1 - MOTION.enter(next - 0.5, 0.5)(T);
  const colW = Math.min(W * 0.86, 1240 * u);
  const rowH = (portrait ? 150 : 118) * u;
  const sweep = (T - (s + 7.2)) / 0.45;
  return (
    <Abs style={{ opacity: out * (T > s - 0.5 ? 1 : 0), gap: 48 * u }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? 96 : 76) * u, letterSpacing: '-0.03em', color: C.paper, textAlign: 'center', lineHeight: 1.02, opacity: t, transform: `translateY(${(1 - t) * 24 * u}px)`, padding: `0 ${50 * u}px` }}>Five layers. Learn them in order.</div>
      <div style={{ width: colW, display: 'flex', flexDirection: 'column-reverse', gap: 12 * u }}>
        {LAYERS.map(([n, name, sub], i) => {
          const p = MOTION.pop(s + 1.4 + i * 1.0, 0.7)(T);
          const lit = sweep >= i && sweep < i + 1.6;
          return (
            <div key={n} style={{ height: rowH, borderRadius: 18 * u, background: lit ? C.amber : C.card, display: 'flex', alignItems: 'center', gap: 32 * u, padding: `0 ${36 * u}px`, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 60 * u}px)` }}>
              <span style={{ fontFamily: MONO, fontSize: 28 * u, color: lit ? C.navy : C.amber, width: 50 * u }}>{n}</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? 50 : 44) * u, color: lit ? C.navy : C.paper, flex: portrait ? 1 : '0 0 34%' }}>{name}</span>
              {!portrait && <span style={{ fontFamily: BODY, fontSize: 30 * u, color: lit ? C.navy : C.mute }}>{sub}</span>}
            </div>
          );
        })}
      </div>
    </Abs>
  );
}

const HABITS = [['01', 'Start in a Project.', 'Say it once. Reuse it forever.'], ['02', 'Package repeat work as Skills.', 'Done three times? Make it a SKILL.md.'], ['03', 'Plan before you build.', 'Correct the plan, not the product.']];
function Habits() {
  const { T, CUES, u, portrait } = useLayout();
  const s = CUES.Habits, per = (CUES.Tracks - s) / 3;
  return HABITS.map(([n, h, sub], i) => {
    const a = s + i * per;
    const inn = MOTION.enter(a + 0.05, 0.6)(T), out = 1 - MOTION.enter(a + per - 0.4, 0.4)(T);
    const o = T >= a - 0.1 && T < a + per + 0.05 ? inn * out : 0;
    return (
      <Abs key={n} style={{ opacity: o, alignItems: 'flex-start', padding: `0 ${(portrait ? 80 : 180) * u}px`, gap: 28 * u }}>
        <div style={{ fontFamily: MONO, fontSize: 34 * u, color: C.amber, letterSpacing: '0.1em' }}>HABIT {n}</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? 132 : 128) * u, lineHeight: 1, letterSpacing: '-0.035em', color: C.paper, maxWidth: '14ch', transform: `translateX(${(1 - inn) * 60 * u}px)` }}>{h}</div>
        <div style={{ fontFamily: BODY, fontSize: 42 * u, color: C.mute, opacity: MOTION.enter(a + 0.5, 0.6)(T) }}>{sub}</div>
      </Abs>
    );
  });
}

const TRACKS = [['01', 'Projects', 'Context, once'], ['02', 'Skills', 'Your know-how, packaged'], ['03', 'Artifacts', 'Usable output'], ['04', 'Cowork', 'Delegate real work'], ['05', 'Claude Code', 'Build and ship']];
function Tracks() {
  const { T, CUES, u, portrait } = useLayout();
  const s = CUES.Tracks, next = CUES.CTA;
  const t = MOTION.enter(s + 0.1)(T);
  const out = 1 - MOTION.enter(next - 0.3, 0.3)(T);
  return (
    <Abs style={{ opacity: (T > s - 0.2 ? 1 : 0) * out, gap: 56 * u, padding: `0 ${70 * u}px` }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? 104 : 88) * u, letterSpacing: '-0.03em', color: C.paper, textAlign: 'center', lineHeight: 1, opacity: t, transform: `translateY(${(1 - t) * 24 * u}px)`, maxWidth: '16ch' }}>Five tools. One way of working.</div>
      <div style={{ display: 'flex', flexDirection: portrait ? 'column' : 'row', gap: 18 * u, width: '100%', justifyContent: 'center' }}>
        {TRACKS.map(([k, name, sub], i) => {
          const p = MOTION.pop(s + 0.9 + i * 0.32, 0.6)(T);
          return (
            <div key={k} style={{ flex: portrait ? 'none' : '1 1 0', maxWidth: portrait ? 'none' : 330 * u, background: C.card, borderRadius: 22 * u, padding: portrait ? `${26 * u}px ${36 * u}px` : `${36 * u}px ${30 * u}px`, display: 'flex', flexDirection: portrait ? 'row' : 'column', alignItems: portrait ? 'baseline' : 'flex-start', gap: (portrait ? 24 : 12) * u, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 60 * u}px) scale(${0.94 + 0.06 * p})` }}>
              <span style={{ fontFamily: MONO, fontSize: 24 * u, color: C.amber }}>{k}</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 50 * u, color: C.paper, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{name}</span>
              <span style={{ fontFamily: BODY, fontSize: 28 * u, color: C.mute }}>{sub}</span>
            </div>
          );
        })}
      </div>
    </Abs>
  );
}

// Keep in sync with tools/vo-lines.json (the Kokoro script places audio at these times)
const VO = [
  { at: 0.3, text: 'Most people use about ten percent of Claude.' },
  { at: 2.9, text: 'The other ninety is architecture.' },
  { at: 5.3, text: 'There are five layers.' },
  { at: 6.6, text: 'The model. Context. Capabilities.' },
  { at: 9.6, text: 'Surfaces. And orchestration.' },
  { at: 11.6, text: 'Learn them in order.' },
  { at: 14.2, text: 'Start every workstream in a Project.' },
  { at: 17.2, text: 'Package repeat work as Skills.' },
  { at: 20.2, text: 'And plan before you build.' },
  { at: 23.3, text: 'Projects, Skills, Artifacts, Cowork, Claude Code.' },
  { at: 26.0, text: 'Explained in plain English.' },
  { at: 29.6, text: 'Claude Mastery, from GencyAI.' },
  { at: 31.6, text: 'Free at gencyai.com/claude' },
];
function Subtitles({ on }) {
  const { T, CUES, u, H, portrait } = useLayout();
  if (!on) return null;
  let cur = null;
  for (let i = 0; i < VO.length; i++) { const end = i + 1 < VO.length ? VO[i + 1].at - 0.15 : cur ? 99 : 99; if (T >= VO[i].at && T < end) cur = VO[i]; }
  if (!cur) return null;
  const onAmber = T >= CUES.CTA;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: (portrait ? 260 : 64) * u, display: 'flex', justifyContent: 'center', padding: `0 ${60 * u}px`, pointerEvents: 'none' }}>
      <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: (portrait ? 46 : 36) * u, lineHeight: 1.3, textAlign: 'center', color: onAmber ? C.paper : C.navy, background: onAmber ? C.navy : C.paper, padding: `${10 * u}px ${22 * u}px`, borderRadius: 12 * u, maxWidth: '26ch' }}>{cur.text}</div>
    </div>
  );
}

function AudioTrack({ src, total }) {
  const { T } = useLayout();
  const { playing } = useComposition();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (Math.abs(v.currentTime - T) > 0.3) { try { v.currentTime = T; } catch (e) {} }
    if (playing && v.paused) v.play().catch(() => {});
    if (!playing && !v.paused) v.pause();
  }, [T, playing]);
  return <video ref={ref} src={src} preload="auto" playsInline data-om-exportable-video-play-start="0" data-om-exportable-video-play-end={String(total)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}></video>;
}

function CTA() {
  const { T, CUES, u, H, portrait } = useLayout();
  const s = CUES.CTA;
  const wipe = MOTION.draw(s - 0.35, 0.8)(T);
  const logo = MOTION.pop(s + 0.4, 0.8)(T);
  const line = MOTION.enter(s + 1.1)(T);
  const pill = MOTION.pop(s + 1.7, 0.7)(T);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H * wipe, background: C.amber, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 * u, padding: `0 ${60 * u}px`, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 * u, opacity: Math.min(1, logo * 1.3), transform: `scale(${0.85 + 0.15 * logo})` }}>
          <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 220 * u, letterSpacing: '-0.035em', color: C.navy, lineHeight: 1 }}>Gency</span>
          <span style={{ fontFamily: MONO, fontSize: 44 * u, color: C.navy, border: `${3 * u}px solid ${C.navy}`, padding: `${2 * u}px ${12 * u}px`, borderRadius: 10 * u }}>AI</span>
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: (portrait ? 64 : 58) * u, color: C.navy, opacity: line, transform: `translateY(${(1 - line) * 20 * u}px)`, lineHeight: 1.1 }}>Claude Mastery — the free video library</div>
        <div style={{ background: C.navy, color: C.paper, fontFamily: BODY, fontWeight: 700, fontSize: 42 * u, padding: `${24 * u}px ${48 * u}px`, borderRadius: 999, opacity: Math.min(1, pill * 1.3), transform: `scale(${0.8 + 0.2 * pill})` }}>gencyai.com/claude</div>
      </div>
    </div>
  );
}

function Piece({ W, H, t }) {
  const { T, CUES, authoredTotal } = useComposition();
  const u = Math.min(W, H) / 1080;
  const portrait = H > W * 1.1;
  const drift = 1 + 0.03 * (T / (authoredTotal || 1));
  const orbX = W * (0.78 - 0.2 * (T / (authoredTotal || 1)));
  return (
    <PromoCtx.Provider value={{ T, CUES, u, W, H, portrait }}>
      <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, background: C.navy, overflow: 'hidden', fontFamily: BODY }}>
        <div style={{ position: 'absolute', width: 900 * u, height: 900 * u, borderRadius: '50%', left: orbX - 450 * u, top: H * 0.12 - 450 * u, background: 'radial-gradient(circle, rgba(233,169,59,0.16), rgba(233,169,59,0) 65%)' }}></div>
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${drift})` }}>
          <Hook /><Layers /><Habits /><Tracks />
        </div>
        <div style={{ position: 'absolute', top: 48 * u, left: 56 * u, display: 'flex', alignItems: 'baseline', gap: 8 * u, opacity: T < CUES.CTA ? 0.9 : 0 }}>
          <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 40 * u, color: C.paper, letterSpacing: '-0.02em' }}>Gency</span>
          <span style={{ fontFamily: MONO, fontSize: 14 * u, color: C.paper, border: `1.5px solid ${C.paper}`, padding: `0 ${5 * u}px`, borderRadius: 4 * u }}>AI</span>
        </div>
        <CTA />
        <Subtitles on={t.captions} />
        {t.voiceover && <AudioTrack src="assets/voiceover.wav" total={authoredTotal} />}
        {t.music && <AudioTrack src="assets/music.mp3" total={authoredTotal} />}
      </div>
    </PromoCtx.Provider>
  );
}

function GencyPromo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const [W, H] = FORMATS[t.format] || FORMATS['16:9'];
  return (
    <>
      <CompositionStage key={t.format} width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.navy}>
        <Piece W={W} H={H} t={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Export format" />
        <TweakSelect label="Aspect ratio" value={t.format} options={['16:9', '1:1', '4:5', '9:16']} onChange={v => setTweak('format', v)} />
        <TweakSection label="Audio" />
        <TweakToggle label="Voiceover (assets/voiceover.wav)" value={t.voiceover} onChange={v => setTweak('voiceover', v)} />
        <TweakToggle label="Music bed (assets/music.mp3)" value={t.music} onChange={v => setTweak('music', v)} />
        <TweakToggle label="Burned-in captions" value={t.captions} onChange={v => setTweak('captions', v)} />
        <TweakSection label="Editor" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </>
  );
}
window.GencyPromo = GencyPromo;
