const C = { navy: '#14224A', deep: '#0E1834', paper: '#F5F4EF', amber: '#E9A93B', mute: '#C9CFE3', line: '#33457A', card: '#1C2D5E' };
const FORMATS = { '16:9': [1920, 1080], '1:1': [1080, 1080], '9:16': [1080, 1920] };
const MOTION = {
  enter: (s, d = 0.7) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutCubic }),
  pop: (s, d = 0.6) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutBack }),
  draw: (s, d = 1) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInOutCubic }),
};
const DISPLAY = "'Outfit', sans-serif", MONO = "'IBM Plex Mono', monospace", BODY = "'Manrope', sans-serif";
const LCtx = React.createContext(null);
const useL = () => React.useContext(LCtx);

function Wordmark({ size, color }) {
  return <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: size, letterSpacing: '-0.02em', color, lineHeight: 1 }}>GencyAI</span>;
}

function Scene({ sc, children, align = 'flex-start' }) {
  const { T, u, portrait } = useL();
  const inn = MOTION.enter(sc.start, 0.6)(T), out = 1 - MOTION.enter(sc.end - 0.45, 0.45)(T);
  const vis = T >= sc.start - 0.05 && T < sc.end + 0.05;
  const local = clamp((T - sc.start) / (sc.end - sc.start), 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: vis ? inn * out : 0, transform: `translateY(${(1 - inn) * 28 * u}px) scale(${1 + 0.03 * local})`, transformOrigin: '30% 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: align, gap: 30 * u, padding: portrait ? `${200 * u}px ${80 * u}px ${300 * u}px` : `${150 * u}px ${150 * u}px ${190 * u}px` }}>
      {children}
    </div>
  );
}

function Eyebrow({ sc, text }) {
  const { T, u } = useL();
  const a = MOTION.enter(sc.start + 0.15)(T);
  return <div style={{ fontFamily: MONO, fontSize: 28 * u, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.amber, opacity: a }}>{text}</div>;
}
function Headline({ sc, size = 96, max = '17ch' }) {
  const { T, u, portrait } = useL();
  const a = MOTION.enter(sc.start + 0.3, 0.8)(T);
  return <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? size * 1.05 : size) * u, lineHeight: 1.02, letterSpacing: '-0.035em', color: C.paper, maxWidth: max, textWrap: 'balance', opacity: a, transform: `translateY(${(1 - a) * 30 * u}px)` }}>{sc.headline}</div>;
}
function Sub({ sc, at = 1.3 }) {
  const { T, u } = useL();
  if (!sc.sub) return null;
  const a = MOTION.enter(sc.start + at, 0.7)(T);
  return <div style={{ fontFamily: BODY, fontSize: 40 * u, lineHeight: 1.4, color: C.mute, maxWidth: '40ch', textWrap: 'pretty', opacity: a }}>{sc.sub}</div>;
}

function TitleScene({ sc, lesson }) {
  const { T, u } = useL();
  const n = MOTION.pop(sc.start + 0.2, 0.9)(T);
  const bar = MOTION.draw(sc.start + 0.9, 1.6)(T);
  return (
    <Scene sc={sc}>
      <div style={{ fontFamily: MONO, fontSize: 30 * u, letterSpacing: '0.14em', color: C.mute, textTransform: 'uppercase', opacity: n }}>Agent Harness Mastery · Lesson</div>
      <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 300 * u, lineHeight: 0.85, letterSpacing: '-0.05em', color: C.amber, opacity: Math.min(1, n * 1.3), transform: `scale(${0.85 + 0.15 * n})`, transformOrigin: 'left bottom' }}>{String(lesson.n).padStart(2, '0')}</div>
      <Headline sc={sc} size={112} max="15ch" />
      <div style={{ width: 520 * u * bar, height: 10 * u, borderRadius: 99, background: C.amber }}></div>
      <Sub sc={sc} at={1.6} />
    </Scene>
  );
}

function StatementScene({ sc }) {
  return (
    <Scene sc={sc}>
      {sc.eyebrow && <Eyebrow sc={sc} text={sc.eyebrow} />}
      <Headline sc={sc} size={128} max="14ch" />
      <Sub sc={sc} />
    </Scene>
  );
}

function PointsScene({ sc }) {
  const { T, u, portrait } = useL();
  const shown = sc.items.filter(it => T >= it.at - 0.2).length;
  return (
    <Scene sc={sc}>
      {sc.eyebrow && <Eyebrow sc={sc} text={sc.eyebrow} />}
      <Headline sc={sc} size={84} max="20ch" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 * u, width: '100%', maxWidth: 1500 * u, marginTop: 16 * u }}>
        {sc.items.map((it, i) => {
          const p = MOTION.pop(it.at - 0.2, 0.6)(T);
          const active = i === shown - 1;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 30 * u, padding: `${(portrait ? 26 : 22) * u}px ${34 * u}px`, borderRadius: 20 * u, background: active ? C.amber : C.card, opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * 70 * u}px)` }}>
              <span style={{ fontFamily: MONO, fontSize: 28 * u, color: active ? C.navy : C.amber, width: 46 * u, flex: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? 46 : 44) * u, color: active ? C.navy : C.paper, flex: portrait ? 1 : '0 0 auto', lineHeight: 1.15 }}>{it.t}</span>
              {it.d && !portrait && <span style={{ fontFamily: BODY, fontSize: 32 * u, color: active ? C.navy : C.mute, marginLeft: 'auto', textAlign: 'right' }}>{it.d}</span>}
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

function CodeScene({ sc }) {
  const { T, u, portrait } = useL();
  const typeDur = Math.min((sc.end - sc.start) * 0.55, sc.code.length / 45);
  const k = MOTION.draw(sc.start + 1.0, typeDur)(T);
  const n = Math.round(sc.code.length * k);
  const win = MOTION.enter(sc.start + 0.5, 0.8)(T);
  const blink = Math.floor(T * 2) % 2 === 0 || k < 1;
  return (
    <Scene sc={sc}>
      <div style={{ display: 'flex', flexDirection: portrait ? 'column' : 'row', gap: 70 * u, alignItems: portrait ? 'stretch' : 'center', width: '100%' }}>
        <div style={{ flex: portrait ? 'none' : '0 0 34%', display: 'flex', flexDirection: 'column', gap: 26 * u }}>
          {sc.eyebrow && <Eyebrow sc={sc} text={sc.eyebrow} />}
          <Headline sc={sc} size={76} max="12ch" />
          <Sub sc={sc} at={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0, background: C.deep, border: `${2 * u}px solid ${C.line}`, borderRadius: 24 * u, overflow: 'hidden', opacity: win, transform: `translateY(${(1 - win) * 50 * u}px)`, boxShadow: `0 ${30 * u}px ${80 * u}px rgba(0,0,0,0.35)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 * u, padding: `${18 * u}px ${26 * u}px`, borderBottom: `${2 * u}px solid ${C.line}` }}>
            <span style={{ width: 16 * u, height: 16 * u, borderRadius: '50%', background: C.amber }}></span>
            <span style={{ width: 16 * u, height: 16 * u, borderRadius: '50%', background: C.line }}></span>
            <span style={{ width: 16 * u, height: 16 * u, borderRadius: '50%', background: C.line }}></span>
            <span style={{ fontFamily: MONO, fontSize: 24 * u, color: C.amber, marginLeft: 12 * u }}>{sc.path}</span>
          </div>
          <pre style={{ margin: 0, padding: `${28 * u}px ${32 * u}px`, fontFamily: MONO, fontSize: (portrait ? 28 : 27) * u, lineHeight: 1.6, color: '#E8ECF8', whiteSpace: 'pre-wrap', minHeight: 420 * u }}>{sc.code.slice(0, n)}<span style={{ background: blink ? C.amber : 'transparent', color: C.amber }}>{'\u00a0'}</span></pre>
        </div>
      </div>
    </Scene>
  );
}

function HarnessScene({ sc }) {
  const { T, u, portrait } = useL();
  const sweepStart = sc.start + 2.4, per = Math.max(0.9, (sc.end - 0.8 - sweepStart) / sc.items.length);
  const lit = Math.floor((T - sweepStart) / per);
  return (
    <Scene sc={sc}>
      {sc.eyebrow && <Eyebrow sc={sc} text={sc.eyebrow} />}
      <Headline sc={sc} size={80} max="22ch" />
      <div style={{ display: 'grid', gridTemplateColumns: portrait ? '1fr' : 'repeat(3, minmax(0,1fr))', gap: 18 * u, width: '100%', marginTop: 12 * u }}>
        {sc.items.map((it, i) => {
          const p = MOTION.pop(sc.start + 0.9 + i * 0.18, 0.6)(T);
          const on = i === lit;
          return (
            <div key={i} style={{ background: on ? C.amber : C.card, borderRadius: 20 * u, padding: `${(portrait ? 22 : 28) * u}px ${30 * u}px`, display: 'flex', flexDirection: 'column', gap: 12 * u, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 50 * u}px) scale(${on ? 1.03 : 1})` }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 40 * u, color: on ? C.navy : C.paper }}>{it.t}</span>
              <span style={{ fontFamily: MONO, fontSize: 25 * u, lineHeight: 1.45, color: on ? C.navy : C.mute, wordBreak: 'break-word' }}>{it.d}</span>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

function StepsScene({ sc }) {
  const { T, u, portrait } = useL();
  const line = MOTION.draw(sc.items[0].at - 0.2, Math.max(1, sc.items[sc.items.length - 1].at - sc.items[0].at))(T);
  return (
    <Scene sc={sc}>
      {sc.eyebrow && <Eyebrow sc={sc} text={sc.eyebrow} />}
      <Headline sc={sc} size={84} max="20ch" />
      <div style={{ position: 'relative', display: 'flex', flexDirection: portrait ? 'column' : 'row', gap: 22 * u, width: '100%', marginTop: 30 * u }}>
        {!portrait && <div style={{ position: 'absolute', left: 0, top: 50 * u, height: 4 * u, width: `${line * 100}%`, background: C.amber, borderRadius: 99 }}></div>}
        {sc.items.map((it, i) => {
          const p = MOTION.pop(it.at - 0.2, 0.6)(T);
          return (
            <div key={i} style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: portrait ? 'row' : 'column', alignItems: portrait ? 'center' : 'flex-start', gap: 22 * u, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 40 * u}px)` }}>
              <div style={{ width: 100 * u, height: 100 * u, flex: 'none', borderRadius: '50%', background: C.amber, color: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 32 * u }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 * u }}>
                <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 46 * u, color: C.paper }}>{it.t}</span>
                {it.d && <span style={{ fontFamily: BODY, fontSize: 30 * u, color: C.mute, lineHeight: 1.4 }}>{it.d}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
}

function EndScene({ sc, lesson }) {
  const { T, u, H, portrait } = useL();
  const wipe = MOTION.draw(sc.start - 0.35, 0.8)(T);
  const a = MOTION.enter(sc.start + 0.4)(T), b = MOTION.enter(sc.start + 1.2)(T), c = MOTION.pop(sc.start + 2.0, 0.7)(T);
  if (T < sc.start - 0.4) return null;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H * wipe, background: C.amber, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 * u, padding: `0 ${80 * u}px`, textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 30 * u, letterSpacing: '0.14em', color: C.navy, textTransform: 'uppercase', opacity: a }}>Lesson {String(lesson.n).padStart(2, '0')} complete</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: (portrait ? 110 : 120) * u, lineHeight: 1, letterSpacing: '-0.035em', color: C.navy, maxWidth: '15ch', textWrap: 'balance', opacity: a, transform: `translateY(${(1 - a) * 24 * u}px)` }}>{sc.headline}</div>
        {sc.sub && <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 40 * u, color: C.navy, opacity: b, maxWidth: '36ch' }}>{sc.sub}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 * u, opacity: Math.min(1, c * 1.3), transform: `scale(${0.85 + 0.15 * c})`, flexDirection: portrait ? 'column' : 'row' }}>
          <Wordmark size={84 * u} color={C.navy} />
          <span style={{ background: C.navy, color: C.paper, fontFamily: BODY, fontWeight: 700, fontSize: 38 * u, padding: `${20 * u}px ${42 * u}px`, borderRadius: 999 }}>gencyai.com</span>
        </div>
      </div>
    </div>
  );
}

const RENDER = { title: TitleScene, statement: StatementScene, points: PointsScene, code: CodeScene, harness: HarnessScene, steps: StepsScene };

function Subtitles({ lines, endAt }) {
  const { T, u, portrait } = useL();
  const cur = lines.find(l => T >= l.at && T < l.end + 0.35);
  if (!cur) return null;
  const onAmber = T >= endAt;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: (portrait ? 170 : 66) * u, display: 'flex', justifyContent: 'center', padding: `0 ${70 * u}px`, pointerEvents: 'none' }}>
      <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: (portrait ? 42 : 34) * u, lineHeight: 1.3, textAlign: 'center', color: onAmber ? C.paper : C.navy, background: onAmber ? C.navy : C.paper, padding: `${10 * u}px ${24 * u}px`, borderRadius: 12 * u, maxWidth: portrait ? '24ch' : '44ch' }}>{cur.cap || cur.say}</div>
    </div>
  );
}

function AudioTrack({ src, total, loopLen, volume = 1 }) {
  const { T } = useL();
  const { playing } = useComposition();
  const ref = React.useRef(null);
  const [bad, setBad] = React.useState(false);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    v.volume = volume;
    const target = loopLen ? T % loopLen : T;
    if (!loopLen && v.duration && T > v.duration) { if (!v.paused) v.pause(); return; }
    if (Math.abs(v.currentTime - target) > 0.3) { try { v.currentTime = target; } catch (e) {} }
    if (playing && v.paused) v.play().catch(() => {});
    if (!playing && !v.paused) v.pause();
  }, [T, playing, volume]);
  if (bad) return null;
  return <video ref={ref} src={src} preload="auto" playsInline loop={!!loopLen} onError={() => setBad(true)} data-om-exportable-video-play-start="0" data-om-exportable-video-play-end={String(loopLen || total)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}></video>;
}

function Piece({ W, H, t, lesson }) {
  const { T, CUES, authoredTotal } = useComposition();
  const u = Math.min(W, H) / 1080;
  const portrait = H > W * 1.1;
  const names = lesson.scenes.map(s => s.name);
  const scenes = lesson.scenes.map((s, i) => ({ ...s, start: CUES[s.name], end: i + 1 < names.length ? CUES[names[i + 1]] : authoredTotal }));
  const endSc = scenes[scenes.length - 1];
  const prog = clamp(T / (endSc.start || 1), 0, 1);
  const orbX = W * (0.8 - 0.25 * (T / (authoredTotal || 1)));
  const orbY = H * (0.2 + 0.08 * Math.sin(T / 6));
  const lines = lesson.scenes.flatMap(s => s.lines);
  const num = String(lesson.n).padStart(2, '0');
  return (
    <LCtx.Provider value={{ T, u, W, H, portrait }}>
      <div data-screen-label={`L${num} t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, background: C.navy, overflow: 'hidden', fontFamily: BODY }}>
        <div style={{ position: 'absolute', width: 1100 * u, height: 1100 * u, borderRadius: '50%', left: orbX - 550 * u, top: orbY - 550 * u, background: 'radial-gradient(circle, rgba(233,169,59,0.15), rgba(233,169,59,0) 65%)' }}></div>
        <div style={{ position: 'absolute', width: 900 * u, height: 900 * u, borderRadius: '50%', left: W * 0.05 - 450 * u + 60 * u * Math.sin(T / 9), top: H * 0.95 - 450 * u, background: 'radial-gradient(circle, rgba(77,102,180,0.22), rgba(77,102,180,0) 65%)' }}></div>
        {scenes.slice(0, -1).map(sc => { const R = RENDER[sc.layout] || StatementScene; return <R key={sc.name} sc={sc} lesson={lesson} />; })}
        <div style={{ position: 'absolute', top: 54 * u, left: 64 * u, right: 64 * u, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 * u, opacity: T < endSc.start - 0.3 ? 1 : 0 }}>
          <Wordmark size={42 * u} color={C.paper} />
          {!portrait && <span style={{ fontFamily: MONO, fontSize: 22 * u, letterSpacing: '0.1em', color: C.mute, textTransform: 'uppercase' }}>Lesson {num} · {lesson.title}</span>}
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 6 * u, width: `${prog * 100}%`, background: C.amber }}></div>
        <EndScene sc={endSc} lesson={lesson} />
        {t.captions && <Subtitles lines={lines} endAt={endSc.start} />}
        {t.voiceover && <AudioTrack src={`assets/lessons/lesson-${num}-vo.wav`} total={authoredTotal} />}
        {t.ambient && <AudioTrack src="assets/ambient-bed.wav" total={authoredTotal} loopLen={window.GENCY_AMBIENT_LEN || 64} volume={0.8} />}
      </div>
    </LCtx.Provider>
  );
}

function GencyLesson() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const lesson = (window.GENCY_LESSONS || []).find(l => l.n === window.LESSON_ID);
  if (!lesson) return <div style={{ color: '#fff', padding: 40 }}>Lesson data missing.</div>;
  const [W, H] = FORMATS[t.format] || FORMATS['16:9'];
  return (
    <>
      <CompositionStage key={t.format} width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={C.navy}>
        <Piece W={W} H={H} t={t} lesson={lesson} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Export format" />
        <TweakSelect label="Aspect ratio" value={t.format} options={['16:9', '1:1', '9:16']} onChange={v => setTweak('format', v)} />
        <TweakSection label="Audio" />
        <TweakToggle label="Voiceover (run tools/make_lesson_voiceover.py)" value={t.voiceover} onChange={v => setTweak('voiceover', v)} />
        <TweakToggle label="Ambient bed" value={t.ambient} onChange={v => setTweak('ambient', v)} />
        <TweakToggle label="Burned-in captions" value={t.captions} onChange={v => setTweak('captions', v)} />
        <TweakSection label="Editor" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </>
  );
}
window.GencyLesson = GencyLesson;
