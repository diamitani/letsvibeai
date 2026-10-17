import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, gradients } from "../brand/colors";
import { AtlasLogo } from "../components/AtlasLogo";

// ─────────────────────────────────────────────────────────────
// Atlas brand-locked Cowork Training overview — 60s @ 30fps
// 5 scenes: Hook · What it is · Power features · Outcome · CTA
// ─────────────────────────────────────────────────────────────

const FONT_FAMILY =
  '"Poppins", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif';

// Scene 1 — Hook (0–240, 8s)
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleY = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const subOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" });
  const dotsOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const dotsY = interpolate(frame, [0, 25], [-20, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: gradients.blueToPurple,
        color: colors.white,
        fontFamily: FONT_FAMILY,
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: dotsOpacity, transform: `translateY(${dotsY}px)`, marginBottom: 40 }}>
        <BrandDots />
      </div>
      <div style={{ transform: `translateY(${(1 - titleY) * 60}px)`, opacity: titleY }}>
        <h1 style={{ fontSize: 130, fontWeight: 800, lineHeight: 1.05, margin: 0, letterSpacing: -2 }}>
          Meet Claude.
        </h1>
        <h1
          style={{
            fontSize: 130,
            fontWeight: 800,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: -2,
            color: colors.blue250,
          }}
        >
          Your team&apos;s new AI teammate.
        </h1>
      </div>
      <p
        style={{
          opacity: subOpacity,
          marginTop: 40,
          fontSize: 36,
          fontWeight: 400,
          maxWidth: 1100,
          color: colors.blue100,
        }}
      >
        Built for the way Atlas actually works.
      </p>
      <div style={{ position: "absolute", bottom: 60, left: 60, opacity: subOpacity }}>
        <AtlasLogo variant="reversed" width={180} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 70,
          right: 60,
          fontSize: 18,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: subOpacity * 0.65,
        }}
      >
        Internal Training · 60s overview
      </div>
    </AbsoluteFill>
  );
};

// Three brand-colored dots — Atlas signature
const BrandDots: React.FC = () => (
  <div style={{ display: "flex", gap: 22 }}>
    <Dot color={colors.blue500} />
    <Dot color={colors.purple500} />
    <Dot color={colors.magenta500} />
  </div>
);
const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 30px ${color}80`,
    }}
  />
);

// Scene 2 — What it is (240–660, 14s)
const SceneWhatItIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const cards = [
    {
      label: "Chat",
      desc: "Fast answers. Quick thinking.",
      color: colors.blue500,
      delay: 25,
    },
    {
      label: "Cowork",
      desc: "Get work done — decks, docs, reports.",
      color: colors.purple500,
      delay: 60,
    },
    {
      label: "Code",
      desc: "Build automations & agents.",
      color: colors.magenta500,
      delay: 95,
    },
  ];
  return (
    <AbsoluteFill
      style={{
        background: colors.gray50,
        color: colors.gray900,
        fontFamily: FONT_FAMILY,
        padding: 120,
      }}
    >
      <div style={{ opacity: titleOp, marginBottom: 48 }}>
        <div
          style={{
            width: 80,
            height: 6,
            background: colors.blue500,
            borderRadius: 3,
            marginBottom: 24,
          }}
        />
        <h2 style={{ fontSize: 84, fontWeight: 800, margin: 0, letterSpacing: -1.5, lineHeight: 1.1 }}>
          One assistant.
          <br />
          Three ways to work.
        </h2>
        <p style={{ fontSize: 30, color: colors.gray900, opacity: 0.7, marginTop: 16 }}>
          For marketing, sales, RevOps, and ops at Atlas.
        </p>
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
        {cards.map((c) => {
          const cardOp = interpolate(frame, [c.delay, c.delay + 22], [0, 1], {
            extrapolateRight: "clamp",
          });
          const cardY = interpolate(frame, [c.delay, c.delay + 22], [40, 0], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={c.label}
              style={{
                flex: 1,
                background: colors.white,
                borderRadius: 18,
                padding: 44,
                boxShadow: "0 4px 24px rgba(22,6,41,0.08)",
                opacity: cardOp,
                transform: `translateY(${cardY}px)`,
                borderTop: `6px solid ${c.color}`,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, color: c.color, marginBottom: 8 }}>
                {c.label}
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.25, color: colors.gray900 }}>
                {c.desc}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 40, right: 60 }}>
        <AtlasLogo variant="primary" width={140} />
      </div>
    </AbsoluteFill>
  );
};

// Scene 3 — Power features (660–1200, 18s)
const ScenePowerFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const features = [
    { label: "Projects", desc: "Organize context", color: colors.blue500, delay: 30 },
    { label: "Skills", desc: "Automate repeat work", color: colors.purple500, delay: 75 },
    { label: "Connectors", desc: "HubSpot · Outlook · SharePoint", color: colors.magenta500, delay: 120 },
    { label: "Memory", desc: "Remember what matters", color: colors.coral500, delay: 165 },
  ];
  return (
    <AbsoluteFill
      style={{
        background: gradients.purpleToMagenta,
        color: colors.white,
        fontFamily: FONT_FAMILY,
        padding: 120,
      }}
    >
      <div style={{ opacity: titleOp, marginBottom: 60 }}>
        <div style={{ width: 80, height: 6, background: colors.blue250, borderRadius: 3, marginBottom: 24 }} />
        <h2 style={{ fontSize: 84, fontWeight: 800, margin: 0, letterSpacing: -1.5, lineHeight: 1.1 }}>
          Power features
        </h2>
        <p style={{ fontSize: 30, opacity: 0.85, marginTop: 16 }}>
          Four building blocks. One leveraged team.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 24 }}>
        {features.map((f) => {
          const op = interpolate(frame, [f.delay, f.delay + 22], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(frame, [f.delay, f.delay + 22], [-40, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={f.label}
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 18,
                padding: "32px 40px",
                opacity: op,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 60,
                  background: f.color,
                  borderRadius: 4,
                  boxShadow: `0 0 24px ${f.color}80`,
                }}
              />
              <div>
                <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.05 }}>{f.label}</div>
                <div style={{ fontSize: 26, opacity: 0.8, marginTop: 4 }}>{f.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 40, right: 60 }}>
        <AtlasLogo variant="reversed" width={140} />
      </div>
    </AbsoluteFill>
  );
};

// Scene 4 — Outcome (1200–1560, 12s)
const SceneOutcome: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const items = [
    { value: "Cleaner", label: "CRM data", color: colors.blue500, delay: 25 },
    { value: "Sharper", label: "outreach", color: colors.purple500, delay: 55 },
    { value: "Better", label: "calls", color: colors.magenta500, delay: 85 },
    { value: "Faster", label: "reports", color: colors.coral500, delay: 115 },
  ];
  return (
    <AbsoluteFill
      style={{
        background: colors.gray900,
        color: colors.white,
        fontFamily: FONT_FAMILY,
        padding: 120,
        justifyContent: "center",
      }}
    >
      <div style={{ opacity: titleOp, marginBottom: 60, textAlign: "center" }}>
        <div
          style={{
            width: 80,
            height: 6,
            background: colors.blue500,
            borderRadius: 3,
            margin: "0 auto 24px",
          }}
        />
        <h2 style={{ fontSize: 76, fontWeight: 800, margin: 0, letterSpacing: -1.5 }}>
          The outcome.
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap" }}>
        {items.map((it) => {
          const op = interpolate(frame, [it.delay, it.delay + 16], [0, 1], { extrapolateRight: "clamp" });
          const y = interpolate(frame, [it.delay, it.delay + 16], [30, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={it.value}
              style={{
                opacity: op,
                transform: `translateY(${y}px)`,
                textAlign: "center",
                minWidth: 280,
              }}
            >
              <div
                style={{
                  fontSize: 84,
                  fontWeight: 800,
                  color: it.color,
                  letterSpacing: -1.5,
                  lineHeight: 1,
                }}
              >
                {it.value}
              </div>
              <div style={{ fontSize: 28, opacity: 0.85, marginTop: 8 }}>{it.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 40, right: 60 }}>
        <AtlasLogo variant="reversed" width={140} />
      </div>
    </AbsoluteFill>
  );
};

// Scene 5 — CTA (1560–1800, 8s)
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleY = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const subOp = interpolate(frame, [25, 55], [0, 1], { extrapolateRight: "clamp" });
  const ctaOp = interpolate(frame, [55, 90], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: gradients.blueAccent,
        color: colors.white,
        fontFamily: FONT_FAMILY,
        padding: 120,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 28, opacity: titleY }}>
        <BrandDots />
      </div>
      <div
        style={{
          transform: `translateY(${(1 - titleY) * 40}px)`,
          opacity: titleY,
        }}
      >
        <h2 style={{ fontSize: 96, fontWeight: 800, margin: 0, letterSpacing: -2, lineHeight: 1.05 }}>
          Open the guide.
        </h2>
        <h2
          style={{
            fontSize: 96,
            fontWeight: 800,
            margin: 0,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: colors.blue100,
          }}
        >
          Pick one workflow.
        </h2>
        <h2
          style={{
            fontSize: 96,
            fontWeight: 800,
            margin: 0,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: colors.white,
          }}
        >
          Start today.
        </h2>
      </div>
      <div
        style={{
          opacity: subOp,
          marginTop: 56,
          fontSize: 30,
          fontWeight: 500,
          color: colors.blue100,
        }}
      >
        For people, by people.
      </div>
      <div
        style={{
          opacity: ctaOp,
          marginTop: 24,
          padding: "20px 56px",
          background: colors.white,
          color: colors.blue900,
          borderRadius: 999,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        atlashxm.com / claude-training
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 60, opacity: subOp }}>
        <AtlasLogo variant="reversed" width={180} />
      </div>
    </AbsoluteFill>
  );
};

// Master composition
export const CoworkTraining: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.gray900 }}>
      <Sequence from={0} durationInFrames={240}>
        <SceneHook />
      </Sequence>
      <Sequence from={240} durationInFrames={420}>
        <SceneWhatItIs />
      </Sequence>
      <Sequence from={660} durationInFrames={540}>
        <ScenePowerFeatures />
      </Sequence>
      <Sequence from={1200} durationInFrames={360}>
        <SceneOutcome />
      </Sequence>
      <Sequence from={1560} durationInFrames={240}>
        <SceneCTA />
      </Sequence>
      {/* Voiceover, generated via edge-tts (sandbox stand-in for Chatterbox) */}
      <Audio src={staticFile("voiceover.mp3")} />
    </AbsoluteFill>
  );
};
