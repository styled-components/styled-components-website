'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../utils/theme';

type Vec3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const MAX_FACES = 20;
const SCALE = 0.38;
const CYCLE_MS = 5000;
const MORPH_MS = 1200;
const STAGGER_MS = 400;

// ---------------------------------------------------------------------------
// Vector math
// ---------------------------------------------------------------------------

function normalize(v: Vec3): Vec3 {
  const r = Math.hypot(...v);
  return r === 0 ? v : [v[0] / r, v[1] / r, v[2] / r];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function dot3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function midpt(a: [number, number], b: [number, number]): [number, number] {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

// ---------------------------------------------------------------------------
// Platonic solids — vertices normalized to unit sphere
// ---------------------------------------------------------------------------

function nv(verts: Vec3[]): Vec3[] {
  return verts.map(normalize);
}

const SOLIDS = [
  {
    name: 'tetrahedron',
    verts: nv([
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ]),
    faces: [
      [0, 1, 2],
      [0, 3, 1],
      [0, 2, 3],
      [1, 3, 2],
    ],
  },
  {
    name: 'cube',
    verts: nv([
      [-1, -1, -1],
      [-1, -1, 1],
      [-1, 1, -1],
      [-1, 1, 1],
      [1, -1, -1],
      [1, -1, 1],
      [1, 1, -1],
      [1, 1, 1],
    ]),
    faces: [
      [0, 1, 3, 2],
      [4, 6, 7, 5],
      [0, 4, 5, 1],
      [2, 3, 7, 6],
      [0, 2, 6, 4],
      [1, 5, 7, 3],
    ],
  },
  {
    name: 'octahedron',
    verts: nv([
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ]),
    faces: [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 4, 2],
      [1, 3, 4],
      [1, 5, 3],
      [1, 2, 5],
    ],
  },
  {
    name: 'dodecahedron',
    verts: nv([
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
      [0, 1 / PHI, PHI],
      [0, 1 / PHI, -PHI],
      [0, -1 / PHI, PHI],
      [0, -1 / PHI, -PHI],
      [1 / PHI, PHI, 0],
      [1 / PHI, -PHI, 0],
      [-1 / PHI, PHI, 0],
      [-1 / PHI, -PHI, 0],
      [PHI, 0, 1 / PHI],
      [PHI, 0, -1 / PHI],
      [-PHI, 0, 1 / PHI],
      [-PHI, 0, -1 / PHI],
    ]),
    faces: [
      [0, 8, 4, 14, 12],
      [0, 12, 1, 17, 16],
      [0, 16, 2, 10, 8],
      [3, 11, 7, 15, 13],
      [3, 13, 2, 16, 17],
      [3, 17, 1, 9, 11],
      [4, 8, 10, 6, 18],
      [4, 18, 19, 5, 14],
      [5, 19, 7, 11, 9],
      [1, 12, 14, 5, 9],
      [2, 13, 15, 6, 10],
      [6, 15, 7, 19, 18],
    ],
  },
  {
    name: 'icosahedron',
    verts: nv([
      [-1, PHI, 0],
      [1, PHI, 0],
      [-1, -PHI, 0],
      [1, -PHI, 0],
      [0, -1, PHI],
      [0, 1, PHI],
      [0, -1, -PHI],
      [0, 1, -PHI],
      [PHI, 0, -1],
      [PHI, 0, 1],
      [-PHI, 0, -1],
      [-PHI, 0, 1],
    ]),
    faces: [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ],
  },
];

// ---------------------------------------------------------------------------
// Face normal computation + spatial matching
// ---------------------------------------------------------------------------

function computeFaceNormal(solid: (typeof SOLIDS)[number], faceIdx: number[]): Vec3 {
  const verts = faceIdx.map(i => [solid.verts[i][0], -solid.verts[i][1], solid.verts[i][2]] as Vec3);
  const n = verts.length;
  const center: Vec3 = [
    verts.reduce((s, v) => s + v[0], 0) / n,
    verts.reduce((s, v) => s + v[1], 0) / n,
    verts.reduce((s, v) => s + v[2], 0) / n,
  ];
  let normal = normalize(cross(sub(verts[1], verts[0]), sub(verts[2], verts[0])));
  if (dot3(center, normal) < 0) normal = [-normal[0], -normal[1], -normal[2]];
  return normal;
}

// Chain-match faces between consecutive solids so smaller solids' div indices
// are always a strict subset of the next larger solid's indices.
// Chain: tetra(4) ⊂ cube(6) ⊂ octa(8) ⊂ dodeca(12) ⊂ icosa(20)
// Each transition only adds/removes the delta faces.

function greedyMatch(smallNormals: Vec3[], largeNormals: Vec3[], largeMapping: number[]): number[] {
  const pairs: { si: number; li: number; score: number }[] = [];
  for (let si = 0; si < smallNormals.length; si++) {
    for (let li = 0; li < largeNormals.length; li++) {
      pairs.push({ si, li, score: dot3(smallNormals[si], largeNormals[li]) });
    }
  }
  pairs.sort((a, b) => b.score - a.score);

  const mapping = new Array(smallNormals.length).fill(-1);
  const usedSmall = new Set<number>();
  const usedLarge = new Set<number>();

  for (const { si, li } of pairs) {
    if (usedSmall.has(si) || usedLarge.has(li)) continue;
    mapping[si] = largeMapping[li];
    usedSmall.add(si);
    usedLarge.add(li);
    if (usedSmall.size === smallNormals.length) break;
  }

  return mapping;
}

function buildChainMappings(): number[][] {
  const mappings: number[][] = new Array(5);

  // Icosahedron: identity mapping (all 20 slots used)
  mappings[4] = SOLIDS[4].faces.map((_, i) => i);

  // Chain from largest to smallest — each inherits indices from the next larger
  const chain: [number, number][] = [
    [3, 4],
    [2, 3],
    [1, 2],
    [0, 1],
  ];

  for (const [smaller, larger] of chain) {
    const smallNormals = SOLIDS[smaller].faces.map(f => computeFaceNormal(SOLIDS[smaller], f));
    const largeNormals = SOLIDS[larger].faces.map(f => computeFaceNormal(SOLIDS[larger], f));
    mappings[smaller] = greedyMatch(smallNormals, largeNormals, mappings[larger]);
  }

  return mappings;
}

const ALL_MAPPINGS = buildChainMappings();

// ---------------------------------------------------------------------------
// Per-slot canonical data from icosahedron.
// Each div slot is LOCKED to the icosa face's orientation. Rotation never changes.
// Other solids' face vertices are projected onto this fixed plane for clip-path.
// ---------------------------------------------------------------------------

type SlotData = {
  u: Vec3;
  v: Vec3;
  normal: Vec3;
  cx: number;
  cy: number;
  cz: number;
  ax: number;
  ay: number;
  az: number;
  angle: number;
};

const SLOTS: SlotData[] = (() => {
  const icosa = SOLIDS[4];
  return icosa.faces.map(faceIdx => {
    const verts = faceIdx.map(i => [icosa.verts[i][0], -icosa.verts[i][1], icosa.verts[i][2]] as Vec3);
    const n = verts.length;
    const center: Vec3 = [
      verts.reduce((s, v) => s + v[0], 0) / n,
      verts.reduce((s, v) => s + v[1], 0) / n,
      verts.reduce((s, v) => s + v[2], 0) / n,
    ];
    let normal = normalize(cross(sub(verts[1], verts[0]), sub(verts[2], verts[0])));
    if (dot3(center, normal) < 0) normal = [-normal[0], -normal[1], -normal[2]];
    const u = normalize(sub(verts[1], verts[0]));
    const v: Vec3 = normalize(cross(normal, u));
    const rot = axisAngleFromBasis(u, v, normal);
    return { u, v, normal, cx: center[0], cy: center[1], cz: center[2], ...rot };
  });
})();

type FaceConfig = {
  clipPath: string;
  tx: number;
  ty: number;
  tz: number;
  ax: number;
  ay: number;
  az: number;
  angle: number;
  hue: number;
  lum: number;
  chroma: number;
  active: boolean;
};

// Hidden state per slot: positioned and rotated to match icosa, clip collapsed
const SLOT_HIDDEN: FaceConfig[] = SLOTS.map(slot => ({
  clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
  tx: slot.cx,
  ty: slot.cy,
  tz: slot.cz,
  ax: slot.ax,
  ay: slot.ay,
  az: slot.az,
  angle: slot.angle,
  hue: 0,
  lum: 0.82,
  chroma: 0,
  active: false,
}));

function axisAngleFromBasis(u: Vec3, v: Vec3, n: Vec3): { ax: number; ay: number; az: number; angle: number } {
  const trace = u[0] + v[1] + n[2];
  const cosA = Math.max(-1, Math.min(1, (trace - 1) / 2));
  const angle = Math.acos(cosA);

  if (angle < 0.001) return { ax: 0, ay: 1, az: 0, angle: 0 };

  if (angle > Math.PI - 0.001) {
    const diags = [u[0] + 1, v[1] + 1, n[2] + 1];
    const idx = diags.indexOf(Math.max(...diags));
    const col: Vec3 = idx === 0 ? [u[0] + 1, u[1], u[2]] : idx === 1 ? [v[0], v[1] + 1, v[2]] : [n[0], n[1], n[2] + 1];
    const len = Math.hypot(...col);
    return len > 0.001
      ? { ax: col[0] / len, ay: col[1] / len, az: col[2] / len, angle: 180 }
      : { ax: 0, ay: 1, az: 0, angle: 180 };
  }

  const raw: Vec3 = [v[2] - n[1], n[0] - u[2], u[1] - v[0]];
  const len = Math.hypot(...raw);
  return {
    ax: raw[0] / len,
    ay: raw[1] / len,
    az: raw[2] / len,
    angle: (angle * 180) / Math.PI,
  };
}

function computeSingleFace(solid: (typeof SOLIDS)[number], fi: number, divIdx: number): FaceConfig {
  const slot = SLOTS[divIdx];
  const faceIdx = solid.faces[fi];
  const verts = faceIdx.map(i => [solid.verts[i][0], -solid.verts[i][1], solid.verts[i][2]] as Vec3);
  const n = verts.length;

  const center: Vec3 = [
    verts.reduce((s, v) => s + v[0], 0) / n,
    verts.reduce((s, v) => s + v[1], 0) / n,
    verts.reduce((s, v) => s + v[2], 0) / n,
  ];

  let normal = normalize(cross(sub(verts[1], verts[0]), sub(verts[2], verts[0])));
  if (dot3(center, normal) < 0) normal = [-normal[0], -normal[1], -normal[2]];

  // Align in-plane rotation to slot's U vector (projected onto this face's plane)
  const d = dot3(slot.u, normal);
  const projected: Vec3 = [slot.u[0] - d * normal[0], slot.u[1] - d * normal[1], slot.u[2] - d * normal[2]];
  const pLen = Math.hypot(...projected);
  const u: Vec3 =
    pLen > 0.001 ? [projected[0] / pLen, projected[1] / pLen, projected[2] / pLen] : normalize(sub(verts[1], verts[0]));
  const v: Vec3 = normalize(cross(normal, u));

  // Project onto face's OWN plane (correct geometry)
  const local: [number, number][] = verts.map(vert => {
    const rel = sub(vert, center);
    return [dot3(rel, u), dot3(rel, v)];
  });

  let pts: [number, number][];
  if (n === 3) {
    pts = [local[0], midpt(local[0], local[1]), local[1], midpt(local[1], local[2]), local[2]];
  } else if (n === 4) {
    pts = [local[0], midpt(local[0], local[1]), local[1], local[2], local[3]];
  } else {
    pts = [...local];
  }

  const clipPoints = pts.map(
    ([pu, pv]) => `${(50 + pu * SCALE * 100).toFixed(2)}% ${(50 + pv * SCALE * 100).toFixed(2)}%`
  );

  // Rotation from face's own basis (aligned to slot U, so changes are minimal)
  const rot = axisAngleFromBasis(u, v, normal);

  // Color from face's own spatial position — evenly distributed per solid
  const azimuth = Math.atan2(normal[0], normal[2]);
  const elevation = Math.asin(Math.max(-1, Math.min(1, normal[1])));
  const t = azimuth / (2 * Math.PI) + 0.5;

  return {
    clipPath: `polygon(${clipPoints.join(', ')})`,
    tx: center[0],
    ty: center[1],
    tz: center[2],
    ...rot,
    hue: (t * 360 + (elevation / Math.PI) * 40) % 360,
    lum: 0.82,
    chroma: 0.3 + Math.abs(elevation) * 0.08,
    active: true,
  };
}

function computeConfigs(solidIdx: number): FaceConfig[] {
  const solid = SOLIDS[solidIdx];
  const mapping = ALL_MAPPINGS[solidIdx];

  // Start all 20 slots as hidden, pre-oriented to their canonical icosa position
  const configs: FaceConfig[] = SLOT_HIDDEN.map(h => ({ ...h }));

  // Place each active face at its matched slot.
  // Rotation is locked per slot — only clip-path, position, and opacity change.
  for (let fi = 0; fi < solid.faces.length; fi++) {
    const divIdx = mapping[fi];
    configs[divIdx] = computeSingleFace(solid, fi, divIdx);
  }

  return configs;
}

const ALL_CONFIGS = SOLIDS.map((_, i) => computeConfigs(i));

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const spin = keyframes`
  from { transform: rotateX(-16deg) rotateY(0deg); }
  to   { transform: rotateX(-16deg) rotateY(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
`;

const Scene = styled.div`
  position: relative;
  transform-style: preserve-3d;
`;

const Spinner = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: ${spin} 10s linear infinite;
`;

const SolidLabel = styled.span`
  font-size: 0.6875rem;
  color: ${theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
`;

type TransitionPhase = 'emerging' | 'persisting' | 'collapsing' | 'static';

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

const Face = styled.div<{ $phase: TransitionPhase; $active: boolean }>`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  pointer-events: ${p => (p.$active ? 'auto' : 'none')};
  opacity: ${p => (p.$active ? 1 : 0)};
  transition: ${p => {
    const base = p.$phase === 'persisting' ? STAGGER_MS * 0.6 : 0;
    return [
      `clip-path ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
      `translate ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
      `rotate ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
      `opacity ${MORPH_MS * 0.6}ms ${EASE} calc(${base}ms + var(--stagger))`,
      `background ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
    ].join(', ');
  }};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: black;
    opacity: 0;
    transition: opacity 150ms ease;
    pointer-events: none;
  }

  ${Wrapper}:hover &::after {
    opacity: 0.6;
  }

  ${Wrapper}:hover &:hover::after {
    opacity: 0;
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PlatonicLogo({
  size = 120,
  fixedSolid,
  hideLabel,
  className,
}: {
  size?: number;
  fixedSolid?: number;
  hideLabel?: boolean;
  className?: string;
}) {
  const [solidIndex, setSolidIndex] = useState(fixedSolid ?? 0);

  useEffect(() => {
    if (fixedSolid != null) return;
    const id = setInterval(() => {
      setSolidIndex(prev => (prev + 1) % SOLIDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [fixedSolid]);

  const configs = ALL_CONFIGS[solidIndex];
  const prevConfigsRef = useRef(configs);
  const s = size * SCALE;

  useEffect(() => {
    prevConfigsRef.current = configs;
  }, [configs]);

  return (
    <Wrapper className={className}>
      <Scene style={{ width: size, height: size }}>
        <Spinner>
          {configs.map((face, i) => {
            const wasActive = prevConfigsRef.current[i].active;
            const phase: TransitionPhase =
              !wasActive && face.active
                ? 'emerging'
                : wasActive && face.active
                ? 'persisting'
                : wasActive && !face.active
                ? 'collapsing'
                : 'static';
            const stagger = (i / (MAX_FACES - 1)) * STAGGER_MS * 0.3;

            return (
              <Face
                key={i}
                $phase={phase}
                $active={face.active}
                style={
                  {
                    clipPath: face.clipPath,
                    background: face.active ? `oklch(${face.lum} ${face.chroma} ${face.hue})` : 'transparent',
                    translate: `${face.tx * s}px ${face.ty * s}px ${face.tz * s}px`,
                    rotate: `${face.ax} ${face.ay} ${face.az} ${face.angle}deg`,
                    '--stagger': `${stagger}ms`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </Spinner>
      </Scene>
      {!hideLabel && <SolidLabel>{size}px</SolidLabel>}
    </Wrapper>
  );
}
