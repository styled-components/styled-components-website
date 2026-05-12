'use client';

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../utils/theme';
import {
  Add,
  Remove,
  PlayArrow,
  Pause,
  Visibility,
  VisibilityOff,
  ThreeDRotation,
  SyncDisabled,
} from '@styled-icons/material';

type Vec3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const MAX_FACES = 20;
const SCALE = 0.5;
const MORPH_SCALE = 0.7; // shrink just enough to avoid worst overlaps
const CYCLE_MS = 5000;
const MORPH_MS = 900;
const STAGGER_MS = 300;

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
// Quaternion math for drag rotation
// ---------------------------------------------------------------------------

type Quat = [number, number, number, number]; // [w, x, y, z]

function qMul(a: Quat, b: Quat): Quat {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}

function qNorm(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  return len > 0 ? [q[0] / len, q[1] / len, q[2] / len, q[3] / len] : q;
}

function quatToCSS(q: Quat): string {
  // Convert quaternion to axis-angle for CSS rotate3d
  const len = Math.hypot(q[1], q[2], q[3]);
  if (len < 1e-6) return 'rotate3d(0,1,0,0deg)';
  const angle = 2 * Math.atan2(len, q[0]) * (180 / Math.PI);
  return `rotate3d(${q[1] / len},${q[2] / len},${q[3] / len},${angle}deg)`;
}

// ---------------------------------------------------------------------------
// Platonic solids, vertices normalized to unit sphere
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

  const mapping: number[] = Array.from({ length: smallNormals.length }, () => -1);
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
  const mappings: number[][] = Array.from({ length: 5 }, () => []);

  // Icosahedron: identity mapping (all 20 slots used)
  mappings[4] = SOLIDS[4].faces.map((_, i) => i);

  // Chain from largest to smallest, each inherits indices from the next larger
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

// Assign palette steps by face normal azimuth, faces pointing in similar
// directions get similar hues, creating a smooth spatial gradient across
// the surface with no high-contrast edges between neighbors.
const SLOT_PALETTE_STEP: number[] = (() => {
  // Compute azimuth for each slot and sort by it
  // Rotate sampling direction by -45° around Y
  const cos45 = Math.cos(-Math.PI / 4),
    sin45 = Math.sin(-Math.PI / 4);
  const indexed = SLOTS.map((slot, i) => {
    const rx = slot.normal[0] * cos45 + slot.normal[2] * sin45;
    const rz = -slot.normal[0] * sin45 + slot.normal[2] * cos45;
    return { i, az: Math.atan2(rx, rz) };
  });
  indexed.sort((a, b) => a.az - b.az);

  // Assign sequential palette indices in azimuth order
  const steps = Array.from({ length: MAX_FACES }, () => 0);
  for (let rank = 0; rank < indexed.length; rank++) {
    steps[indexed[rank].i] = rank;
  }
  return steps;
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
  paletteStep: number;
  active: boolean;
  radius: number; // face radius as fraction of container (0-1)
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
  paletteStep: 0,
  active: false,
  radius: 0,
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

  // Align in-plane rotation to the face edge nearest to the slot's U vector.
  // First project slot U onto the face plane, then snap to the closest edge
  // direction (respecting face symmetry). This prevents faces with high
  // symmetry (squares, pentagons) from appearing tilted at rest.
  const d = dot3(slot.u, normal);
  const projected: Vec3 = [slot.u[0] - d * normal[0], slot.u[1] - d * normal[1], slot.u[2] - d * normal[2]];
  const pLen = Math.hypot(...projected);
  let u: Vec3;
  if (pLen > 0.001) {
    const projU: Vec3 = [projected[0] / pLen, projected[1] / pLen, projected[2] / pLen];
    // Snap to nearest face edge direction
    let bestDot = -2;
    let bestEdge: Vec3 = projU;
    for (let ei = 0; ei < n; ei++) {
      const edge = normalize(sub(verts[(ei + 1) % n], verts[ei]));
      const alignment = Math.abs(dot3(projU, edge));
      if (alignment > bestDot) {
        bestDot = alignment;
        // Preserve sign: if projected U opposes the edge, flip
        bestEdge = dot3(projU, edge) >= 0 ? edge : [-edge[0], -edge[1], -edge[2]];
      }
    }
    u = bestEdge;
  } else {
    u = normalize(sub(verts[1], verts[0]));
  }
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

  // Face radius as fraction of container (max vertex distance from center, scaled)
  const radius = Math.max(...local.map(([pu, pv]) => Math.hypot(pu, pv))) * SCALE;

  // Rotation from face's own basis (aligned to slot U, so changes are minimal)
  const rot = axisAngleFromBasis(u, v, normal);

  return {
    clipPath: `polygon(${clipPoints.join(', ')})`,
    tx: center[0],
    ty: center[1],
    tz: center[2],
    ...rot,
    paletteStep: SLOT_PALETTE_STEP[divIdx],
    active: true,
    radius,
  };
}

function computeConfigs(solidIdx: number): FaceConfig[] {
  const solid = SOLIDS[solidIdx];
  const mapping = ALL_MAPPINGS[solidIdx];

  const configs: FaceConfig[] = SLOT_HIDDEN.map(h => ({ ...h }));

  for (let fi = 0; fi < solid.faces.length; fi++) {
    const divIdx = mapping[fi];
    configs[divIdx] = computeSingleFace(solid, fi, divIdx);
  }

  // Redistribute palette steps: active faces sorted by spatial azimuth get
  // evenly-spaced palette indices. At 4 faces → steps 0,5,10,15 (max spread).
  // At 20 faces → steps 0,1,2,...19 (smooth gradient). Scales naturally.
  const activeSlots = configs
    .map((c, i) => ({ i, azRank: SLOT_PALETTE_STEP[i], active: c.active }))
    .filter(s => s.active)
    .toSorted((a, b) => a.azRank - b.azRank);

  const n = activeSlots.length;
  for (let rank = 0; rank < n; rank++) {
    configs[activeSlots[rank].i].paletteStep = Math.round((rank * MAX_FACES) / n) % MAX_FACES;
  }

  return configs;
}

const ALL_CONFIGS = SOLIDS.map((_, i) => computeConfigs(i));

// Pre-computed active face indices and action slot counts per solid
const ALL_ACTIVE_INDICES: number[][] = ALL_CONFIGS.map(configs =>
  configs.reduce<number[]>((acc, c, i) => {
    if (c.active) acc.push(i);
    return acc;
  }, [])
);

// Pre-computed size-dependent style strings (translate, rotate, stagger, iconSize)
// keyed by solidIndex:size. Avoids ~80 toFixed() calls + string allocations per render.
const solidStyleCache = new Map<string, { translate: string; rotate: string; stagger: string; iconSize: string }[]>();

// Per-face depth bias: push each face outward along its normal by a tiny
// unique amount (i * DEPTH_BIAS_PX). Breaks z-degeneracy for the painter's
// algorithm when two faces are edge-on, preventing flicker without needing
// backface-visibility:hidden. Face centers point along the outward normal
// for platonic solids, so scaling the translation achieves the push.
const DEPTH_BIAS_PX = 0.01;

function getSolidStyles(solidIndex: number, size: number) {
  const key = `${solidIndex}:${size}`;
  const cached = solidStyleCache.get(key);
  if (cached) return cached;
  const s = size * SCALE;
  const configs = ALL_CONFIGS[solidIndex];
  const styles = configs.map((face, i) => {
    // Normalize the face center to get outward direction, then add depth bias
    const cLen = Math.hypot(face.tx, face.ty, face.tz);
    const bias = cLen > 0.001 ? (i * DEPTH_BIAS_PX) / cLen : 0;
    return {
      translate: `${(face.tx * (s + bias)).toFixed(3)}px ${(face.ty * (s + bias)).toFixed(3)}px ${(face.tz * (s + bias)).toFixed(3)}px`,
      rotate: `${face.ax.toFixed(6)} ${face.ay.toFixed(6)} ${face.az.toFixed(6)} ${face.angle.toFixed(3)}deg`,
      stagger: `${((i / (MAX_FACES - 1)) * STAGGER_MS * 0.3).toFixed(2)}ms`,
      iconSize: `${(face.radius * size * 0.5).toFixed(3)}px`,
    };
  });
  solidStyleCache.set(key, styles);
  return styles;
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
`;

const Scene = styled.div`
  position: relative;
  transform-style: preserve-3d;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const Spinner = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(-40deg) rotateY(40deg) rotateZ(10deg);
`;

const SolidLabel = styled.span`
  font-size: 0.6875rem;
  color: ${theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
`;

type TransitionPhase = 'emerging' | 'persisting' | 'collapsing' | 'static';

const EASE = 'cubic-bezier(0.28, 0.11, 0.32, 1)';

const Face = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  /* No backface-visibility: hidden, during solid-to-solid morph transitions
     the interpolation path can briefly orient a face's normal away from the
     camera, causing it to pop out of existence mid-animation. Painter's sort
     via preserve-3d occludes back faces behind opaque front faces naturally. */
  pointer-events: ${p => (p.$active ? 'auto' : 'none')};
  opacity: ${p => (p.$active ? 1 : 0)};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--face-opaque);
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }

  &:hover::after,
  &[data-grabbed]::after {
    opacity: 1;
  }
`;

const FaceIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%) scale(0.3);
  line-height: 1;
  color: white;
  opacity: 0;
  transition:
    opacity 250ms ${EASE},
    transform 350ms ${EASE};
  pointer-events: none;
  filter: drop-shadow(0 1px 2px oklch(0 0 0 / 0.4));

  svg {
    width: 100%;
    height: 100%;
  }

  ${Scene}:hover & {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1);
  }
`;

// ---------------------------------------------------------------------------
// Shared rotation singleton, all PlatonicLogo instances spin in sync
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'sc-logo-prefs';
const IDLE_SPEED = 0.09;
const IDLE_VEL = { dx: IDLE_SPEED, dy: IDLE_SPEED * -0.4 };
const BLEND_RATE = 0.04;
const SENSITIVITY = 0.015;

const initXH = (-40 * Math.PI) / 180 / 2;
const initYH = (40 * Math.PI) / 180 / 2;
const initZH = (10 * Math.PI) / 180 / 2;
const INIT_QUAT: Quat = qMul(
  qMul([Math.cos(initXH), Math.sin(initXH), 0, 0], [Math.cos(initYH), 0, Math.sin(initYH), 0]),
  [Math.cos(initZH), 0, 0, Math.sin(initZH)]
);

const defaultPrefs: LogoPrefs = { autoPlay: true, spinning: true, seeThrough: false };

// Persist across HMR, module re-evaluation creates a fresh object otherwise,
// orphaning listeners attached by still-mounted components.
const GLOBAL_KEY = '__scLogoRotation' as const;

type SharedRotation = {
  quat: Quat;
  velocity: { dx: number; dy: number };
  idleVel: { dx: number; dy: number };
  dragging: boolean;
  solidIndex: number;
  prefs: LogoPrefs;
  prefsLoaded: boolean;
  solidListeners: Set<(idx: number) => void>;
  prefsListeners: Set<(prefs: LogoPrefs) => void>;
  subscribers: Set<(css: string) => void>;
  rafId: number | null;
  lastTime: number;
  lastCss: string;
  setSolidIndex(idx: number): void;
  advanceSolid(): void;
  prevSolid(): void;
  updatePrefs(patch: Partial<LogoPrefs>): void;
  start(): void;
  stop(): void;
  subscribe(cb: (css: string) => void): () => void;
  applyDrag(dx: number, dy: number): void;
};

const sharedRotation: SharedRotation = ((globalThis as Record<string, unknown>)[GLOBAL_KEY] as SharedRotation) ?? {
  quat: [...INIT_QUAT] as Quat,
  velocity: { ...IDLE_VEL },
  idleVel: { ...IDLE_VEL },
  dragging: false,
  solidIndex: 4,
  prefs: { ...defaultPrefs } as LogoPrefs,
  prefsLoaded: false,
  solidListeners: new Set<(idx: number) => void>(),
  prefsListeners: new Set<(prefs: LogoPrefs) => void>(),
  subscribers: new Set<(css: string) => void>(),
  rafId: null as number | null,
  lastTime: 0,
  lastCss: '',

  setSolidIndex(idx: number) {
    this.solidIndex = idx;
    for (const cb of this.solidListeners) cb(idx);
  },

  advanceSolid() {
    this.setSolidIndex((this.solidIndex + 1) % SOLIDS.length);
  },

  prevSolid() {
    this.setSolidIndex((this.solidIndex - 1 + SOLIDS.length) % SOLIDS.length);
  },

  updatePrefs(patch: Partial<LogoPrefs>) {
    this.prefs = { ...this.prefs, ...patch };
    savePrefs(this.prefs);
    for (const cb of this.prefsListeners) cb(this.prefs);
  },

  start() {
    if (this.rafId != null) return;
    const loop = (now: number) => {
      if (!this.dragging) {
        const yHalf = (this.velocity.dx * SENSITIVITY) / 2;
        const xHalf = (-this.velocity.dy * SENSITIVITY) / 2;
        const spinQ: Quat = qMul([Math.cos(xHalf), Math.sin(xHalf), 0, 0], [Math.cos(yHalf), 0, Math.sin(yHalf), 0]);
        this.quat = qNorm(qMul(spinQ, this.quat));

        this.velocity.dx = this.velocity.dx * (1 - BLEND_RATE) + this.idleVel.dx * BLEND_RATE;
        this.velocity.dy = this.velocity.dy * (1 - BLEND_RATE) + this.idleVel.dy * BLEND_RATE;
      }
      this.lastTime = now;
      const css = quatToCSS(this.quat);
      if (css !== this.lastCss) {
        this.lastCss = css;
        for (const cb of this.subscribers) cb(css);
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  },

  stop() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  },

  subscribe(cb: (css: string) => void) {
    // Load persisted prefs once on first subscriber
    if (!this.prefsLoaded) {
      this.prefsLoaded = true;
      const loaded = loadPrefs();
      this.prefs = loaded;
      for (const pcb of this.prefsListeners) pcb(loaded);
    }
    this.subscribers.add(cb);
    if (this.subscribers.size === 1) this.start();
    cb(quatToCSS(this.quat));
    return () => {
      this.subscribers.delete(cb);
      if (this.subscribers.size === 0) this.stop();
    };
  },

  applyDrag(dx: number, dy: number) {
    const yHalf = (dx * SENSITIVITY) / 2;
    const xHalf = (-dy * SENSITIVITY) / 2;
    const dragQ: Quat = qMul([Math.cos(xHalf), Math.sin(xHalf), 0, 0], [Math.cos(yHalf), 0, Math.sin(yHalf), 0]);
    this.quat = qNorm(qMul(dragQ, this.quat));
  },
};
(globalThis as Record<string, unknown>)[GLOBAL_KEY] = sharedRotation;

// ---------------------------------------------------------------------------
// Face actions, assigned to active faces, more choices as face count grows
// ---------------------------------------------------------------------------

type LogoPrefs = {
  autoPlay: boolean;
  spinning: boolean;
  seeThrough: boolean;
};

function loadPrefs(): LogoPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultPrefs };
}

function savePrefs(prefs: LogoPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

type FaceAction = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const ACTIONS: Record<string, FaceAction> = {
  next: { id: 'next', icon: <Add />, label: 'Next shape' },
  prev: { id: 'prev', icon: <Remove />, label: 'Previous shape' },
  play: { id: 'play', icon: <PlayArrow />, label: 'Auto-advance' },
  pause: { id: 'pause', icon: <Pause />, label: 'Pause' },
  spin: { id: 'spin', icon: <ThreeDRotation />, label: 'Spin' },
  stopSpin: { id: 'stopSpin', icon: <SyncDisabled />, label: 'Stop spin' },
  see: { id: 'see', icon: <VisibilityOff />, label: 'See-through' },
  opaque: { id: 'opaque', icon: <Visibility />, label: 'Opaque' },
};

function getActionsForFaceCount(count: number, solidIndex: number, prefs: LogoPrefs): FaceAction[] {
  const list: FaceAction[] = [];
  if (solidIndex < SOLIDS.length - 1) list.push(ACTIONS.next);
  if (solidIndex > 0) list.push(ACTIONS.prev);
  list.push(prefs.autoPlay ? ACTIONS.pause : ACTIONS.play);
  list.push(prefs.spinning ? ACTIONS.stopSpin : ACTIONS.spin);
  list.push(prefs.seeThrough ? ACTIONS.opaque : ACTIONS.see);
  return list.slice(0, count);
}

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
  const [solidIndex, setSolidIndex] = useState(fixedSolid ?? sharedRotation.solidIndex);
  const [prefs, setPrefs] = useState<LogoPrefs>(sharedRotation.prefs);

  // Subscribe to shared state on mount
  useEffect(() => {
    const onPrefs = (p: LogoPrefs) => setPrefs(p);
    sharedRotation.prefsListeners.add(onPrefs);

    // Sync from singleton immediately, covers the case where prefs
    // were already loaded by another instance or a prior subscribe() call
    setPrefs({ ...sharedRotation.prefs });

    if (fixedSolid == null) {
      const onSolid = (idx: number) => setSolidIndex(idx);
      sharedRotation.solidListeners.add(onSolid);
      setSolidIndex(sharedRotation.solidIndex);
      return () => {
        sharedRotation.solidListeners.delete(onSolid);
        sharedRotation.prefsListeners.delete(onPrefs);
      };
    }
    return () => {
      sharedRotation.prefsListeners.delete(onPrefs);
    };
  }, [fixedSolid]);

  // --- Auto-advance ---
  useEffect(() => {
    if (fixedSolid != null || !prefs.autoPlay) return;
    const id = setInterval(() => {
      if (!sharedRotation.dragging) {
        sharedRotation.advanceSolid();
      }
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [fixedSolid, prefs.autoPlay]);

  // --- Shared rotation subscription ---
  const spinnerRef = useRef<HTMLDivElement>(null);

  const configs = ALL_CONFIGS[solidIndex];
  const prevConfigsRef = useRef(configs);
  const [morphing, setMorphing] = useState(false);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    setMorphing(true);
    const timer = setTimeout(() => setMorphing(false), MORPH_MS + STAGGER_MS);
    return () => clearTimeout(timer);
  }, [solidIndex]);

  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Subscribe to shared rotation
  useEffect(() => {
    return sharedRotation.subscribe(css => {
      if (spinnerRef.current) {
        spinnerRef.current.style.transform = css;
      }
    });
  }, []);

  // --- Face action handler (ref so pointer effect always sees latest state) ---
  const activeIndices = ALL_ACTIVE_INDICES[solidIndex];
  const handleFaceAction = (actionIdx: number) => {
    const actions = getActionsForFaceCount(activeIndices.length, solidIndex, prefs);
    const action = actions[actionIdx];
    if (!action) return;

    switch (action.id) {
      case 'next':
        sharedRotation.advanceSolid();
        break;
      case 'prev':
        sharedRotation.prevSolid();
        break;
      case 'play':
        sharedRotation.updatePrefs({ autoPlay: true });
        break;
      case 'pause':
        sharedRotation.updatePrefs({ autoPlay: false });
        break;
      case 'spin':
        sharedRotation.updatePrefs({ spinning: true });
        sharedRotation.idleVel = { ...IDLE_VEL };
        sharedRotation.velocity = { ...sharedRotation.idleVel };
        break;
      case 'stopSpin':
        sharedRotation.updatePrefs({ spinning: false });
        sharedRotation.idleVel = { dx: 0, dy: 0 };
        sharedRotation.velocity = { dx: 0, dy: 0 };
        break;
      case 'see':
        sharedRotation.updatePrefs({ seeThrough: true });
        break;
      case 'opaque':
        sharedRotation.updatePrefs({ seeThrough: false });
        break;
    }
  };
  const faceActionRef = useRef(handleFaceAction);
  faceActionRef.current = handleFaceAction;

  // --- Pointer interaction ---
  const clickedFaceRef = useRef<number | null>(null);
  const grabbedFaceRef = useRef<HTMLElement | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const scene = spinnerRef.current?.parentElement;
    if (!scene) return;

    let downPos = { x: 0, y: 0 };
    const CLICK_THRESHOLD = 5;

    const onPointerDown = (e: PointerEvent) => {
      sharedRotation.dragging = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      sharedRotation.velocity = { dx: 0, dy: 0 };
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
      downPos = { x: e.clientX, y: e.clientY };
      scene.setPointerCapture(e.pointerId);

      const target = e.target as HTMLElement;
      const faceIdx = target.dataset.faceAction;
      clickedFaceRef.current = faceIdx != null ? Number(faceIdx) : null;
      if (target.closest && target !== scene) {
        const face = (target.closest('[data-face-action]') as HTMLElement) ?? target;
        face.setAttribute('data-grabbed', '');
        grabbedFaceRef.current = face;
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!sharedRotation.dragging) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      sharedRotation.velocity = {
        dx: dx * 0.4 + sharedRotation.velocity.dx * 0.6,
        dy: dy * 0.4 + sharedRotation.velocity.dy * 0.6,
      };

      sharedRotation.applyDrag(dx, dy);
    };
    const onPointerUp = (e: PointerEvent) => {
      sharedRotation.dragging = false;
      if (grabbedFaceRef.current) {
        grabbedFaceRef.current.removeAttribute('data-grabbed');
        grabbedFaceRef.current = null;
      }

      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      if (dist < CLICK_THRESHOLD) {
        const faceIdx = clickedFaceRef.current;
        if (faceIdx != null) {
          faceActionRef.current(faceIdx);
        } else {
          sharedRotation.advanceSolid();
        }
        clickedFaceRef.current = null;
        return;
      }
      clickedFaceRef.current = null;

      sharedRotation.updatePrefs({ autoPlay: false, spinning: false });
      sharedRotation.idleVel = { dx: 0, dy: 0 };

      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        sharedRotation.updatePrefs({ autoPlay: true, spinning: true });
        sharedRotation.idleVel = { ...IDLE_VEL };
        sharedRotation.velocity = { ...sharedRotation.idleVel };
      }, 5000);

      const vel = sharedRotation.velocity;
      const speed = Math.hypot(vel.dx, vel.dy);
      if (speed > 1.5) {
        vel.dx *= 1.2;
        vel.dy *= 1.2;
      } else {
        vel.dx = 0;
        vel.dy = 0;
      }
    };

    scene.addEventListener('pointerdown', onPointerDown);
    scene.addEventListener('pointermove', onPointerMove, { passive: true });
    scene.addEventListener('pointerup', onPointerUp);
    scene.addEventListener('pointercancel', onPointerUp);
    return () => {
      scene.removeEventListener('pointerdown', onPointerDown);
      scene.removeEventListener('pointermove', onPointerMove);
      scene.removeEventListener('pointerup', onPointerUp);
      scene.removeEventListener('pointercancel', onPointerUp);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    prevConfigsRef.current = configs;
  }, [configs]);

  // Build action assignments for active faces (using precomputed active indices)
  const actions = getActionsForFaceCount(activeIndices.length, solidIndex, prefs);
  const faceActionMap = new Map<number, { action: FaceAction; idx: number }>();
  for (let ai = 0; ai < Math.min(activeIndices.length, actions.length); ai++) {
    faceActionMap.set(activeIndices[ai], { action: actions[ai], idx: ai });
  }

  const slotStyles = getSolidStyles(solidIndex, size);

  return (
    <Wrapper className={className}>
      <Scene style={{ width: size, height: size }}>
        <Spinner ref={spinnerRef}>
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
            const mapped = faceActionMap.get(i);
            const cachedStyle = slotStyles[i];

            // Geometry transitions activate when faces are emerging/persisting/
            // collapsing (phase !== 'static') OR during the scale bounce
            // (morphing). At rest, only background + scale transitions remain,
            // preventing Safari from re-evaluating timing each rAF frame.
            const isTransitioning = phase !== 'static' || morphing;
            const base = phase === 'persisting' ? STAGGER_MS * 0.6 : 0;
            const transition = isTransitioning
              ? [
                  `clip-path ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
                  `translate ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
                  `rotate ${MORPH_MS}ms ${EASE} calc(${base}ms + var(--stagger))`,
                  `opacity ${MORPH_MS * 0.6}ms ${EASE} calc(${base}ms + var(--stagger))`,
                  `background 600ms ease-in-out`,
                  `scale ${morphing ? MORPH_MS * 0.3 : MORPH_MS * 0.8}ms ${EASE}`,
                ].join(', ')
              : 'background 600ms ease-in-out';

            return (
              <Face
                key={i}
                $active={face.active}
                data-face-action={mapped ? mapped.idx : undefined}
                style={
                  {
                    clipPath: face.clipPath,
                    background: face.active
                      ? prefs.seeThrough
                        ? `color-mix(in oklch, ${theme.palette[face.paletteStep]}, transparent 40%)`
                        : theme.palette[face.paletteStep]
                      : 'transparent',
                    translate: cachedStyle.translate,
                    rotate: cachedStyle.rotate,
                    scale: morphing ? MORPH_SCALE : 1,
                    transition,
                    '--stagger': cachedStyle.stagger,
                    '--face-opaque': face.active ? theme.palette[face.paletteStep] : 'transparent',
                  } as React.CSSProperties
                }
              >
                {mapped && face.active && size >= 100 && (
                  <FaceIcon style={{ width: cachedStyle.iconSize, height: cachedStyle.iconSize }}>
                    {mapped.action.icon}
                  </FaceIcon>
                )}
              </Face>
            );
          })}
        </Spinner>
      </Scene>
      {!hideLabel && <SolidLabel>{size}px</SolidLabel>}
    </Wrapper>
  );
}
