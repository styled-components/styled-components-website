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
`;

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

// Opacity holds at 1 across the 35% plateau before fading, the eye reads
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
//
// translate is baked into each keyframe stop using calc() with static
// per-instance custom properties (--start-x/y, --end-x/y) instead of
// animating via @property --trail-progress, which Safari doesn't reliably
// animate inside translate calc expressions.
// X: linear interpolation at each stop (p).
// Y: quadratic ease-out 2p-p² evaluated at each stop, decelerating rise.
// Y uses quadratic ease-out: f(p) = 2p - p². Evaluated at each stop:
// p=0: 0, p=0.2: 0.36, p=0.4: 0.64, p=0.6: 0.84, p=0.8: 0.96,
// p=0.86: 0.9804, p=0.92: 0.9936, p=1: 1
const trailAnim = keyframes`
  0% {
    translate: var(--start-x) var(--start-y);
    opacity: 0.3;
    text-shadow:
      0 0 6px var(--particle-color),
      0 0 16px var(--particle-color),
      0 0 0 transparent;
    scale: 1;
  }
  20% {
    translate:
      calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.2)
      calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.36);
  }
  40% {
    translate:
      calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.4)
      calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.64);
  }
  60% {
    translate:
      calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.6)
      calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.84);
  }
  80% {
    translate:
      calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.8)
      calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.96);
  }
  86% {
    translate:
      calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.86)
      calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.9804);
    opacity: 1;
    text-shadow:
      0 0 10px var(--particle-color),
      0 0 26px var(--particle-color),
      0 0 0 transparent;
    scale: 1.05;
  }
  92% {
    translate:
      calc(var(--start-x) + (var(--end-x) - var(--start-x)) * 0.92)
      calc(var(--start-y) + (var(--end-y) - var(--start-y)) * 0.9936);
    opacity: 1;
    text-shadow:
      0 0 20px var(--particle-color),
      0 0 50px var(--particle-color),
      0 0 90px var(--particle-color);
    scale: 1.3;
  }
  100% {
    translate: var(--end-x) var(--end-y);
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
`;

const ParticleCharBase = styled.span.attrs<ParticleAttrs>(particleAttrs)`
  ${particleBase}
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
      // Jitter ignition across a few frames so the burst doesn't all light up on the same tick.
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
      if (!overlayRef.current) return;

      const tier = getTier();
      const cfg = TIER_CONFIG[tier];
      const w = window.innerWidth;
      const h = window.innerHeight;

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

    let timer: ReturnType<typeof setTimeout> | null = null;
    let stopped = false;
    let visible = true;

    function scheduleNext() {
      timer = setTimeout(
        () => {
          timer = null;
          if (stopped || !visible) return;
          spawnFirework();
          scheduleNext();
        },
        rand(2000, 4000)
      );
    }

    spawnFirework();
    scheduleNext();

    // Long pages scroll the overlay off-screen. Without this, the rAF
    // animations keep painting invisible particles at full GPU cost.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && timer != null) {
        clearTimeout(timer);
        timer = null;
      } else if (visible && timer == null && !stopped) {
        scheduleNext();
      }
    });
    if (overlayRef.current) io.observe(overlayRef.current);

    return () => {
      stopped = true;
      if (timer != null) clearTimeout(timer);
      io.disconnect();
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
