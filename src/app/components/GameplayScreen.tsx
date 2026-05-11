import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Video, Heart } from "lucide-react";
import { Button } from "./ui/button";
import blowfishImg from "../../imports/blowfish.png";
import crabsImg from "../../imports/crabs.png";
import eelImg from "../../imports/eel.png";
import electricFishImg from "../../imports/electric_fish.png";
import octopusImg from "../../imports/octopus.png";

const monsterImages = [blowfishImg, crabsImg, eelImg, electricFishImg, octopusImg];

// ─── Types ───────────────────────────────────────────────────
type Monster = {
  id: number;
  x: number;        // % of container width
  y: number;        // % of container height
  vx: number;       // horizontal velocity  (% / s)
  vy: number;       // vertical velocity    (% / s), negative = upward
  gravity: number;  // downward accel       (% / s²)
  imageUrl: string;
  rotation: number;
  rotationSpeed: number; // deg / s
  dead: boolean;    // true = shrinking before removal
  scale: number;    // 1 → 0 on death
  spawnTime: number; // Date.now() — auto-remove after TTL
};

// Slash trail point
type TrailPoint = { x: number; y: number; t: number };

// ─── Fallback emoji (unchanged from working version) ─────────
const FALLBACK: Record<string, string> = {
  blowfish: "🐡",
  crabs: "🦀",
  eel: "🐍",
  electric_fish: "⚡",
  octopus: "🐙",
};

function MonsterImage({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  const key = Object.keys(FALLBACK).find((k) => src.includes(k)) ?? "";
  const emoji = FALLBACK[key] ?? "🌊";

  if (broken) {
    return (
      <span style={{ fontSize: "4rem", lineHeight: 1, userSelect: "none" }} aria-label="sea creature">
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      // ← same classes as the working version — no mixBlendMode added
      className="w-36 h-36 object-contain pointer-events-none select-none"
      style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.5))" }}
      onError={() => setBroken(true)}
    />
  );
}

// ─── Projectile factory ───────────────────────────────────────
// Monsters launch from the bottom edge with an upward velocity
// calculated so they reliably arc into the visible area (y 20-60%)
// before gravity pulls them back down — exactly like Fruit Ninja.
function createMonster(): Monster {
  const x        = 12 + Math.random() * 76;          // spread across the bottom
  const gravity  = 48 + Math.random() * 16;           // 48-64 %/s²
  const peakY    = 18 + Math.random() * 38;           // desired peak: 18-56% from top
  // kinematics: vy² = 2g·Δy   →   vy = -√(2g·(startY - peakY))
  const vy       = -Math.sqrt(2 * gravity * (105 - peakY));
  const vx       = (Math.random() - 0.5) * 20;        // gentle left/right drift

  return {
    id: Date.now() + Math.random(),
    x,
    y: 108,                                            // start just below visible area
    vx,
    vy,
    gravity,
    imageUrl: monsterImages[Math.floor(Math.random() * monsterImages.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 260,       // spin ±130 deg/s
    dead: false,
    scale: 1,
    spawnTime: Date.now(),
  };
}

const MONSTER_TTL = 4500; // ms — auto-remove after ~4.5 s

// ─── Component ───────────────────────────────────────────────
export function GameplayScreen() {
  const navigate = useNavigate();
  const [score, setScore]                       = useState(0);
  const [timeLeft, setTimeLeft]                 = useState(60);
  const [monstersDefeated, setMonstersDefeated] = useState(0);
  const [handDetected, setHandDetected]         = useState(false);
  const [feedbackMessage, setFeedbackMessage]   = useState("");
  const [showFeedback, setShowFeedback]         = useState(false);

  // Ref-based monster list (RAF loop reads/writes without stale closure)
  const monstersRef = useRef<Monster[]>([]);
  const [monstersDisplay, setMonstersDisplay]   = useState<Monster[]>([]);
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);

  const syncMonsters = (updater: (prev: Monster[]) => Monster[]) => {
    monstersRef.current = updater(monstersRef.current);
    setMonstersDisplay([...monstersRef.current]);
  };

  // Slash-trail state
  const trailRef   = useRef<TrailPoint[]>([]);
  const [trailDisplay, setTrailDisplay] = useState<TrailPoint[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const affirmations = [
    "Tino pai! Excellent!",
    "Ka rawe! Amazing!",
    "Kia kaha! Stay strong!",
    "Beautiful slice!",
    "You're a warrior!",
    "Magnificent!",
    "You're protecting the people!",
  ];

  // ── Simulate hand detection
  useEffect(() => {
    const id = setInterval(() => setHandDetected((p) => !p), 2000);
    return () => clearInterval(id);
  }, []);

  // ── Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => navigate("/results", { state: { monstersDefeated, score } }), 1500);
    }
  }, [timeLeft, navigate, monstersDefeated, score]);

  // ── Spawn loop — 1-2 monsters per wave, every 1.2-2 s
  useEffect(() => {
    const schedule = () => {
      if (timeLeftRef.current <= 0) return;
      const delay = 1200 + Math.random() * 800;
      setTimeout(() => {
        if (timeLeftRef.current <= 0) return;
        const wave = Math.random() < 0.38 ? 2 : 1;
        for (let i = 0; i < wave; i++) {
          setTimeout(() => {
            if (monstersRef.current.filter(m => !m.dead).length < 7) {
              syncMonsters(prev => [...prev, createMonster()]);
            }
          }, i * 350);
        }
        schedule();
      }, delay);
    };
    // First monster appears quickly
    const first = setTimeout(() => { syncMonsters(prev => [...prev, createMonster()]); schedule(); }, 600);
    return () => clearTimeout(first);
  }, []);

  // ── Physics RAF loop
  useEffect(() => {
    let rafId: number;
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // seconds, capped
      last = now;
      const nowMs = Date.now();

      syncMonsters(prev => {
        const next: Monster[] = [];
        for (const m of prev) {
          // ── Dying: shrink then remove
          if (m.dead) {
            const ns = m.scale - dt * 6;   // shrinks over ~0.17 s
            if (ns > 0) next.push({ ...m, scale: ns, rotation: m.rotation + m.rotationSpeed * dt });
            continue;
          }

          // ── TTL expiry: fade out naturally (mark dead)
          if (nowMs - m.spawnTime > MONSTER_TTL) {
            next.push({ ...m, dead: true });
            continue;
          }

          // ── Physics step
          const newVy  = m.vy + m.gravity * dt;
          const newX   = m.x  + m.vx * dt;
          const newY   = m.y  + newVy * dt;
          const newRot = m.rotation + m.rotationSpeed * dt;

          // Drop off-screen entirely → remove silently
          if (newY > 118 || newX < -18 || newX > 118) continue;

          next.push({ ...m, x: newX, y: newY, vy: newVy, rotation: newRot });
        }
        return next;
      });

      // Age out old trail points (keep last 180 ms)
      const fresh = trailRef.current.filter(p => now - p.t < 180);
      trailRef.current = fresh;
      setTrailDisplay([...fresh]);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Slice handler
  const handleSliceMonster = (monsterId: number) => {
    syncMonsters(prev => prev.map(m => m.id === monsterId ? { ...m, dead: true, scale: 1 } : m));
    setMonstersDefeated(p => p + 1);
    setScore(p => p + 100);
    const msg = affirmations[Math.floor(Math.random() * affirmations.length)];
    setFeedbackMessage(msg);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1800);
  };

  // ── Mouse / pointer trail — tracks movement over the game canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const now = performance.now();

    trailRef.current = [...trailRef.current.slice(-30), { x: px, y: py, t: now }];

    // Check if the moving pointer overlaps any live monster
    const pctX = (px / rect.width)  * 100;
    const pctY = (py / rect.height) * 100;
    const HIT_RADIUS = 7; // % of container

    syncMonsters(prev =>
      prev.map(m => {
        if (m.dead) return m;
        const dx = m.x - pctX;
        const dy = m.y - pctY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < HIT_RADIUS) {
          setMonstersDefeated(p => p + 1);
          setScore(p => p + 100);
          const msg = affirmations[Math.floor(Math.random() * affirmations.length)];
          setFeedbackMessage(msg);
          setShowFeedback(true);
          setTimeout(() => setShowFeedback(false), 1800);
          return { ...m, dead: true, scale: 1 };
        }
        return m;
      })
    );
  };

  // ── Build SVG path from trail points with fading opacity segments
  const buildTrailPath = () => {
    if (trailDisplay.length < 2) return null;
    const now = performance.now();
    return trailDisplay.map((p, i) => {
      if (i === 0) return null;
      const prev = trailDisplay[i - 1];
      const age  = (now - p.t) / 180;          // 0 (fresh) → 1 (old)
      const alpha = Math.max(0, 1 - age);
      const width = Math.max(1, (1 - age) * 18); // taper from thick to thin
      return (
        <line
          key={i}
          x1={prev.x} y1={prev.y}
          x2={p.x}    y2={p.y}
          stroke={`rgba(180,230,255,${alpha * 0.9})`}
          strokeWidth={width}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 ${Math.round(width * 1.5)}px rgba(100,200,255,${alpha}))` }}
        />
      );
    });
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-900 flex flex-col overflow-hidden">

      {/* ── Header ── */}
      <div className="shrink-0 bg-slate-900/50 backdrop-blur-sm border-b-2 border-cyan-400/30 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">

            <div className="flex-1 bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 rounded-2xl px-10 py-6 border-2 border-emerald-400/50 shadow-lg">
              <div className="flex items-center gap-4">
                <Heart className="w-10 h-10 text-emerald-300" />
                <p className="text-2xl text-white font-semibold">
                  {handDetected ? "Beautiful movements! Keep going!" : "Move with strength and grace!"}
                </p>
              </div>
            </div>

            <div className="text-center bg-gradient-to-br from-amber-600/30 to-yellow-600/30 rounded-xl px-8 py-4 border-2 border-amber-400/50 min-w-[160px] shadow-lg">
              <p className="text-lg text-amber-200 mb-1">Score</p>
              <p className="text-4xl text-white font-bold">{score}</p>
            </div>

            <div className="text-center bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-xl px-8 py-4 border-2 border-cyan-400/50 min-w-[180px] shadow-lg">
              <p className="text-lg text-cyan-200 mb-1">Lives Saved</p>
              <p className="text-4xl text-white font-bold">{monstersDefeated}</p>
            </div>

            <div className="text-center bg-slate-800/60 rounded-xl px-6 py-4 border-2 border-cyan-400/40 min-w-[140px]">
              <p className="text-lg text-cyan-300 mb-1">Time</p>
              <p className={`text-4xl ${timeLeft <= 10 ? "text-amber-300" : "text-white"}`}>
                {timeLeft}s
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-xl px-6 py-3 h-auto bg-white/10 text-white border-cyan-400/50 hover:bg-white/20 ml-6"
          >
            Exit Game
          </Button>
        </div>
      </div>

      {/* ── Gameplay area ── */}
      <div className="flex-1 min-h-0 px-8 py-4 max-w-7xl mx-auto w-full">
        <div
          ref={gameAreaRef}
          className="h-full min-h-[520px] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-cyan-400/30 relative select-none cursor-crosshair"
          onPointerMove={handlePointerMove}
        >
          {/* Ocean background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.3),transparent_50%)]" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-800/40 to-transparent opacity-60" />
          </div>

          {/* Camera indicator */}
          <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-xl flex items-center gap-3 shadow-lg border-2 border-cyan-400/50 z-10 pointer-events-none">
            <Video className="w-6 h-6" />
            Camera Active
          </div>

          {/* Affirmation popup */}
          {showFeedback && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-12 py-6 rounded-2xl text-4xl font-bold shadow-2xl z-20 border-4 border-white/50 whitespace-nowrap pointer-events-none"
              style={{ animation: "popUp 0.18s ease-out forwards" }}>
              {feedbackMessage}
            </div>
          )}

          {/* Kupe character */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="relative">
              <div className="w-40 h-48 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-3xl border-4 border-amber-600" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full border-4 border-amber-500" />
                <div className={`absolute top-16 left-0 w-16 h-4 bg-amber-700 rounded-full origin-right transition-transform ${handDetected ? "rotate-45" : "rotate-12"}`} />
                <div className={`absolute top-16 right-0 w-16 h-4 bg-amber-700 rounded-full origin-left transition-transform ${handDetected ? "-rotate-45" : "-rotate-12"}`} />
                {handDetected && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-32 bg-gradient-to-b from-yellow-600 to-amber-800 rounded-full transform rotate-45 shadow-lg" />
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-3 bg-cyan-700/60 rounded-full blur-sm" />
            </div>
          </div>

          {/* Movement aura */}
          {handDetected && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-400/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
          )}

          {/* ── SVG slash trail — renders above monsters ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 25 }}
          >
            {/* Soft glow layer (wide, low-opacity) */}
            {trailDisplay.length > 1 && (() => {
              const now = performance.now();
              return trailDisplay.map((p, i) => {
                if (i === 0) return null;
                const prev = trailDisplay[i - 1];
                const age  = Math.max(0, 1 - (now - p.t) / 180);
                return (
                  <line key={`glow-${i}`}
                    x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
                    stroke={`rgba(100,200,255,${age * 0.3})`}
                    strokeWidth={age * 40}
                    strokeLinecap="round"
                  />
                );
              });
            })()}
            {/* Core bright trail */}
            {buildTrailPath()}
          </svg>

          {/* ── Monsters ── */}
          {monstersDisplay.map((monster) => (
            <div
              key={monster.id}
              className="absolute"
              style={{
                left: `${monster.x}%`,
                top:  `${monster.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 15,
                willChange: "left, top",
                pointerEvents: monster.dead ? "none" : "auto",
                cursor: monster.dead ? "default" : "pointer",
              }}
              onClick={() => !monster.dead && handleSliceMonster(monster.id)}
            >
              <div
                style={{
                  transform: `rotate(${monster.rotation}deg) scale(${monster.scale})`,
                  width: "9rem",
                  height: "9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Flash white on death
                  filter: monster.dead
                    ? "brightness(4) saturate(0) drop-shadow(0 0 20px white)"
                    : "drop-shadow(0 10px 25px rgba(0,0,0,0.5))",
                  transition: monster.dead ? "filter 0.05s" : "none",
                }}
              >
                <MonsterImage src={monster.imageUrl} />
              </div>
            </div>
          ))}

          {/* Empty state */}
          {monstersDisplay.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-slate-900/60 backdrop-blur-sm px-12 py-8 rounded-3xl border-2 border-cyan-400/50">
                <p className="text-4xl text-cyan-300 mb-4">Get ready, warrior!</p>
                <p className="text-2xl text-cyan-400/90">Sea creatures are on their way</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Instructions bar ── */}
      <div className="shrink-0 bg-gradient-to-r from-slate-900/60 via-emerald-900/40 to-slate-900/60 backdrop-blur-sm border-t-2 border-cyan-400/30 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl text-cyan-200 text-center">
            Move your arms with strength and grace to protect the people!
            <span className="text-emerald-300 ml-3">(Move mouse to slash · Click to strike)</span>
          </p>
        </div>
      </div>

      {/* Popup keyframe */}
      <style>{`
        @keyframes popUp {
          from { transform: translateX(-50%) scale(0.5); opacity: 0; }
          to   { transform: translateX(-50%) scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
