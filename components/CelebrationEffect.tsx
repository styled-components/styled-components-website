'use client';

import React from 'react';
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
import { ringColor } from '../utils/logoPalette';

const COLORS = Array.from({ length: 9 }, (_, i) => ringColor(i * 2));

const CHARS = ['{', '}', '<', '>', '/', '*', '#', '.', ';', ':', '$', '&', '(', ')', '='];
const TRAIL_CHARS = ['|', '.', '*', '·'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

let nextId = 0;

// ---------------------------------------------------------------------------
// Tier config
// ---------------------------------------------------------------------------

function getTier(): 'phone' | 'mobile' | 'desktop' {
  const w = window.innerWidth;
  if (w < 650) return 'phone';
  if (w < 1000) return 'mobile';
  return 'desktop';
}

const TIER_CONFIG = {
  phone: { maxFireworks: 2, burstCount: [35, 50], fontSize: [12, 20], trailSize: 24 },
  mobile: { maxFireworks: 3, burstCount: [50, 70], fontSize: [14, 24], trailSize: 28 },
  desktop: { maxFireworks: 3, burstCount: [70, 100], fontSize: [16, 30], trailSize: 32 },
} as const;

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------

interface ParticleData {
  id: number;
  char: string;
  angle: number;
  speed: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  x: number;
  y: number;
}

interface FireworkData {
  id: number;
  launchX: number;
  burstX: number;
  trailChar: string;
  trailColor: string;
  trailSize: number;
  startY: number;
  burstY: number;
  duration: number;
  particles: ParticleData[];
}

// ---------------------------------------------------------------------------
// @property registration for animatable custom properties
// ---------------------------------------------------------------------------

const PropertyRegistrations = createGlobalStyle`
  @property --progress {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }

  @property --trail-progress {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }
`;

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

// Opacity holds at 1 across the 35% plateau before fading — the eye reads
// the plateau as "the explosion." With fill-mode: both the 0% state applies
// during animation-delay, so particles stay invisible until ignition.
const burstAnim = keyframes`
  0% { --progress: 0; opacity: 0; }
  4% { opacity: 1; }
  35% { opacity: 1; }
  100% { --progress: 1; opacity: 0; }
`;

// Flash peak at 92% matches the late-ignition point (particle delay =
// duration - 0.1). Shadow count stays uniform across stops so text-shadow
// interpolates smoothly instead of flickering between shadow counts.
const trailAnim = keyframes`
  0% {
    --trail-progress: 0;
    opacity: 0.3;
    text-shadow:
      0 0 6px var(--particle-color),
      0 0 16px var(--particle-color),
      0 0 0 transparent;
    scale: 1;
  }
  86% {
    opacity: 1;
    text-shadow:
      0 0 10px var(--particle-color),
      0 0 26px var(--particle-color),
      0 0 0 transparent;
    scale: 1.05;
  }
  92% {
    opacity: 1;
    text-shadow:
      0 0 20px var(--particle-color),
      0 0 50px var(--particle-color),
      0 0 90px var(--particle-color);
    scale: 1.3;
  }
  100% {
    --trail-progress: 1;
    opacity: 0;
    text-shadow:
      0 0 4px var(--particle-color),
      0 0 0 transparent,
      0 0 0 transparent;
    scale: 0.8;
  }
`;

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Trail = styled.span.attrs<{
  $startX: number;
  $endX: number;
  $startY: number;
  $endY: number;
  $color: string;
  $size: number;
  $duration: number;
}>(p => ({
  style: {
    '--start-x': `${p.$startX}px`,
    '--end-x': `${p.$endX}px`,
    '--start-y': `${p.$startY}px`,
    '--end-y': `${p.$endY}px`,
    '--particle-color': p.$color,
    fontSize: `${p.$size}px`,
    animationDuration: `${p.$duration}s`,
  } as React.CSSProperties,
}))`
  position: absolute;
  top: 0;
  left: 0;
  font-family: monospace;
  color: var(--particle-color);
  /* X: linear interpolation. Y: quadratic ease-out (2p - p²) — decelerating
     rise, zero velocity at apex, exactly how gravity slows a launched shell. */
  translate: calc(var(--start-x) + (var(--end-x) - var(--start-x)) * var(--trail-progress))
    calc(
      var(--start-y) + (var(--end-y) - var(--start-y)) *
        (2 * var(--trail-progress) - var(--trail-progress) * var(--trail-progress))
    );
  animation: ${trailAnim} linear forwards;
  will-change: translate, opacity, scale;
`;

type ParticleAttrs = {
  $angle: number;
  $speed: number;
  $color: string;
  $size: number;
  $duration: number;
  $delay: number;
  $x: number;
  $y: number;
};

const particleAttrs = (p: ParticleAttrs) => ({
  style: {
    '--angle': p.$angle,
    '--speed': p.$speed,
    '--particle-color': p.$color,
    '--size': `${p.$size}px`,
    '--dur': `${p.$duration}s`,
    '--delay': `${p.$delay}s`,
    left: `${p.$x}px`,
    top: `${p.$y}px`,
  } as React.CSSProperties,
});

const particleBase = css`
  position: absolute;
  font-family: monospace;
  font-size: var(--size);
  color: var(--particle-color);
  translate: calc(cos(var(--angle) * 1rad) * var(--speed) * var(--progress) * 1vmin)
    calc(
      sin(var(--angle) * 1rad) * var(--speed) * var(--progress) * 1vmin + var(--progress) * var(--progress) *
        var(--progress) * 40vmin
    );
  scale: calc(1 - var(--progress) * 0.7);
  /* backwards applies opacity:0 during animation-delay; forwards pins the
     100% state so particles don't snap back to origin before unmount. */
  animation: ${burstAnim} var(--dur) ease-out var(--delay) both;
  will-change: translate, scale, opacity;
`;

const ParticleCharBase = styled.span.attrs<ParticleAttrs>(particleAttrs)`
  ${particleBase}
  text-shadow:
    0 0 8px var(--particle-color),
    0 0 24px var(--particle-color),
    0 0 60px var(--particle-color);
`;

const ParticleChar = React.memo(ParticleCharBase);
const TrailMemo = React.memo(Trail);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function generateParticles(x: number, y: number, color: string, delay: number): ParticleData[] {
  const tier = getTier();
  const cfg = TIER_CONFIG[tier];
  const count = Math.floor(rand(cfg.burstCount[0], cfg.burstCount[1]));
  const TAU = Math.PI * 2;
  const particles: ParticleData[] = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      id: nextId++,
      char: pick(CHARS),
      angle: (i / count) * TAU + rand(-0.3, 0.3),
      speed: rand(20, 70),
      color,
      size: rand(cfg.fontSize[0], cfg.fontSize[1]),
      duration: rand(1.8, 3.3),
      // Stagger layer promotion across 2–3 frames instead of spiking on one.
      delay: delay + rand(0, 0.04),
      x,
      y,
    });
  }

  return particles;
}

export default function CelebrationEffect() {
  const [fireworks, setFireworks] = React.useState<FireworkData[]>([]);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const pendingRemovals = React.useRef<Map<number, Set<number>>>(new Map());
  const flushScheduled = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function spawnFirework() {
      const el = overlayRef.current;
      if (!el) return;

      const tier = getTier();
      const cfg = TIER_CONFIG[tier];
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const burstX = rand(w * 0.15, w * 0.85);
      // Launch position: offset sideways from the burst point so the shell
      // arcs instead of rising straight up. Larger offset = more visible arc.
      const launchX = Math.max(0, Math.min(w, burstX + rand(-w * 0.15, w * 0.15)));
      const trailColor = pick(COLORS);
      const burstY = rand(h * 0.15, h * 0.45);

      const duration = rand(1.1, 1.5);
      const fw: FireworkData = {
        id: nextId++,
        launchX,
        burstX,
        trailChar: pick(TRAIL_CHARS),
        trailColor,
        trailSize: cfg.trailSize,
        startY: h,
        burstY,
        duration,
        // Late ignition: burst begins 100ms before the shell reaches full
        // apex, so explosion and mortar-flash visually overlap.
        particles: generateParticles(burstX, burstY, trailColor, Math.max(0, duration - 0.1)),
      };

      setFireworks(prev => {
        if (prev.length >= cfg.maxFireworks) return prev;
        return [...prev, fw];
      });
    }

    spawnFirework();
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;

    function scheduleNext() {
      timer = setTimeout(
        () => {
          if (stopped) return;
          spawnFirework();
          scheduleNext();
        },
        rand(2000, 4000)
      );
    }
    scheduleNext();

    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  // fwId/particleId come from data attributes rather than a per-particle
  // closure, so the callback identity stays stable and React.memo holds.
  const handleParticleEnd = React.useCallback((e: React.AnimationEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    const fwId = Number(el.dataset.fw);
    const particleId = Number(el.dataset.pid);
    if (!Number.isFinite(fwId) || !Number.isFinite(particleId)) return;

    let set = pendingRemovals.current.get(fwId);
    if (!set) {
      set = new Set();
      pendingRemovals.current.set(fwId, set);
    }
    set.add(particleId);

    if (flushScheduled.current) return;
    flushScheduled.current = true;
    requestAnimationFrame(() => {
      flushScheduled.current = false;
      const removals = pendingRemovals.current;
      pendingRemovals.current = new Map();

      setFireworks(prev => {
        const updated = prev.map(fw => {
          const toRemove = removals.get(fw.id);
          if (!toRemove || toRemove.size === 0) return fw;
          return { ...fw, particles: fw.particles.filter(p => !toRemove.has(p.id)) };
        });
        return updated.filter(fw => fw.particles.length > 0);
      });
    });
  }, []);

  return (
    <>
      <PropertyRegistrations />
      <Overlay ref={overlayRef} aria-hidden="true">
        {fireworks.map(fw => (
          <React.Fragment key={fw.id}>
            <TrailMemo
              $startX={fw.launchX}
              $endX={fw.burstX}
              $startY={fw.startY}
              $endY={fw.burstY}
              $color={fw.trailColor}
              $size={fw.trailSize}
              $duration={fw.duration}
            >
              {fw.trailChar}
            </TrailMemo>

            {fw.particles.map(p => (
              <ParticleChar
                key={p.id}
                data-fw={fw.id}
                data-pid={p.id}
                $angle={p.angle}
                $speed={p.speed}
                $color={p.color}
                $size={p.size}
                $duration={p.duration}
                $delay={p.delay}
                $x={p.x}
                $y={p.y}
                onAnimationEnd={handleParticleEnd}
              >
                {p.char}
              </ParticleChar>
            ))}
          </React.Fragment>
        ))}
      </Overlay>
    </>
  );
}
