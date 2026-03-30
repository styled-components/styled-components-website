'use client';

import React from 'react';
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';

// ---------------------------------------------------------------------------
// Palette — hue + saturation pairs, lightness varies by theme via light-dark()
// ---------------------------------------------------------------------------

const PALETTE: [number, number][] = [
  [270, 85], // purple
  [200, 80], // sky blue
  [160, 75], // teal
  [45, 90], // gold
  [55, 85], // yellow
  [15, 85], // coral
  [330, 80], // pink
  [120, 60], // green
  [0, 80], // red
];

function paletteColor([h, s]: [number, number]) {
  return `light-dark(oklch(0.82 ${(s / 100) * 0.1} ${h}), oklch(0.72 ${(s / 100) * 0.2} ${h}))`;
}

const COLORS = PALETTE.map(paletteColor);

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
  phone: { maxFireworks: 2, burstCount: [40, 60], fontSize: [12, 20], trailSize: 24 },
  mobile: { maxFireworks: 3, burstCount: [60, 80], fontSize: [14, 24], trailSize: 28 },
  desktop: { maxFireworks: 4, burstCount: [80, 120], fontSize: [16, 30], trailSize: 32 },
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
  x: number;
  y: number;
}

interface FireworkData {
  id: number;
  phase: 'ascending' | 'burst';
  trailX: number;
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

const burstAnim = keyframes`
  from { --progress: 0; }
  to { --progress: 1; }
`;

const trailAnim = keyframes`
  from { --trail-progress: 0; }
  to { --trail-progress: 1; }
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

const FireworkGroup = styled.div`
  display: contents;
`;

const Trail = styled.span.attrs<{
  $x: number;
  $startY: number;
  $endY: number;
  $color: string;
  $size: number;
  $duration: number;
}>(p => ({
  style: {
    '--start-y': `${p.$startY}px`,
    '--end-y': `${p.$endY}px`,
    '--particle-color': p.$color,
    left: `${p.$x}px`,
    fontSize: `${p.$size}px`,
    animationDuration: `${p.$duration}s`,
  } as React.CSSProperties,
}))`
  position: absolute;
  font-family: monospace;
  color: var(--particle-color);
  top: calc(var(--start-y) + (var(--end-y) - var(--start-y)) * var(--trail-progress));
  opacity: calc(0.4 + 0.3 * var(--trail-progress));
  text-shadow: 0 0 6px var(--particle-color), 0 0 16px color-mix(in oklch, var(--particle-color) 50%, transparent);
  animation: ${trailAnim} ease-out forwards;
  will-change: opacity;
`;

// Shared attrs factory and CSS for both sharp and glow particle layers
type ParticleAttrs = {
  $angle: number;
  $speed: number;
  $color: string;
  $size: number;
  $duration: number;
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
  animation: ${burstAnim} var(--dur) ease-out forwards paused;
  animation-play-state: var(--play-state, paused);
  visibility: var(--particle-visibility, hidden);
  will-change: translate, scale, opacity;
`;

const ParticleChar = styled.span.attrs<ParticleAttrs>(particleAttrs)`
  ${particleBase}
  rotate: calc(var(--angle) * 0.3rad * var(--progress));
  opacity: calc(1 - var(--progress) * var(--progress));
  text-shadow: 0 0 8px var(--particle-color), 0 0 30px color-mix(in oklch, var(--particle-color) 60%, transparent),
    0 0 60px color-mix(in oklch, var(--particle-color) 40%, transparent),
    0 0 100px color-mix(in oklch, var(--particle-color) 20%, transparent);
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function generateParticles(x: number, y: number, color: string): ParticleData[] {
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
      x,
      y,
    });
  }

  return particles;
}

export default function CelebrationEffect() {
  const [fireworks, setFireworks] = React.useState<FireworkData[]>([]);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const pendingRemovals = React.useRef<Set<string>>(new Set());
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

      const trailX = rand(w * 0.1, w * 0.9);
      const trailColor = pick(COLORS);
      const burstY = rand(h * 0.15, h * 0.45);

      const fw: FireworkData = {
        id: nextId++,
        phase: 'ascending',
        trailX,
        trailChar: pick(TRAIL_CHARS),
        trailColor,
        trailSize: cfg.trailSize,
        startY: h,
        burstY,
        duration: rand(1.2, 1.8),
        particles: generateParticles(trailX, burstY, trailColor),
      };

      setFireworks(prev => {
        const active = prev.filter(f => f.particles.length > 0 || f.phase === 'ascending');
        if (active.length >= cfg.maxFireworks) return prev;
        return [...prev, fw];
      });
    }

    spawnFirework();
    let timer: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      timer = setTimeout(() => {
        spawnFirework();
        scheduleNext();
      }, rand(2000, 4000));
    }
    scheduleNext();

    return () => clearTimeout(timer);
  }, []);

  function handleTrailEnd(fwId: number) {
    setFireworks(prev => prev.map(fw => (fw.id === fwId ? { ...fw, phase: 'burst' as const } : fw)));
  }

  // Batch particle removals — collect IDs and flush once per frame
  function handleParticleEnd(fwId: number, particleId: number) {
    pendingRemovals.current.add(`${fwId}:${particleId}`);

    if (!flushScheduled.current) {
      flushScheduled.current = true;
      requestAnimationFrame(() => {
        const removals = pendingRemovals.current;
        pendingRemovals.current = new Set();
        flushScheduled.current = false;

        setFireworks(prev => {
          const updated = prev.map(fw => {
            const toRemove = new Set<number>();
            for (const key of removals) {
              const [fId, pId] = key.split(':');
              if (Number(fId) === fw.id) toRemove.add(Number(pId));
            }
            if (toRemove.size === 0) return fw;
            return { ...fw, particles: fw.particles.filter(p => !toRemove.has(p.id)) };
          });
          return updated.filter(fw => fw.phase === 'ascending' || fw.particles.length > 0);
        });
      });
    }
  }

  return (
    <>
      <PropertyRegistrations />
      <Overlay ref={overlayRef} aria-hidden="true">
        {fireworks.map(fw => (
          <FireworkGroup
            key={fw.id}
            style={
              {
                '--play-state': fw.phase === 'burst' ? 'running' : 'paused',
                '--particle-visibility': fw.phase === 'burst' ? 'visible' : 'hidden',
              } as React.CSSProperties
            }
          >
            {fw.phase === 'ascending' && (
              <Trail
                $x={fw.trailX}
                $startY={fw.startY}
                $endY={fw.burstY}
                $color={fw.trailColor}
                $size={fw.trailSize}
                $duration={fw.duration}
                onAnimationEnd={() => handleTrailEnd(fw.id)}
              >
                {fw.trailChar}
              </Trail>
            )}

            {fw.particles.map(p => (
              <ParticleChar
                key={p.id}
                $angle={p.angle}
                $speed={p.speed}
                $color={p.color}
                $size={p.size}
                $duration={p.duration}
                $x={p.x}
                $y={p.y}
                onAnimationEnd={() => handleParticleEnd(fw.id, p.id)}
              >
                {p.char}
              </ParticleChar>
            ))}
          </FireworkGroup>
        ))}
      </Overlay>
    </>
  );
}
