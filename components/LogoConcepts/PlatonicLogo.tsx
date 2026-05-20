'use client';

import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

// CSS Transforms 2 section 7.1 lists mix-blend-mode as a grouping
// property that flattens preserve-3d, so the cube is faked: each face
// is a 2D tile whose matrix3d is composed in JS each frame (global
// quaternion * face local). With no preserve-3d, mix-blend-mode runs
// in normal 2D compositing and reads through to earlier-drawn siblings.

type Quat = [number, number, number, number]; // [w, x, y, z]
type Mat4 = number[]; // length 16, row-major

const SCALE = 0.5;
const INV_SQRT3 = 1 / Math.sqrt(3);
const FACE_EDGE = 2 * INV_SQRT3; // cube edge inscribed in unit sphere

type FaceDef = {
  tx: number;
  ty: number;
  tz: number;
  ax: number;
  ay: number;
  az: number;
  angle: number;
  paletteStep: number;
  // Per-face blend override. Omit to inherit the default ('hard-light').
  // Useful for saturated single-channel colors (e.g. palette[0] red) where
  // hard-light's per-channel branching leaves the visual unchanged.
  blendMode?: React.CSSProperties['mixBlendMode'];
};

const FACES: FaceDef[] = [
  // +Z (front): red. hard-light leaves saturated red unchanged because
  // R locks at 1 via the screen branch; overlay swaps the branching to
  // the backdrop, so red darkens against the page and engages visibly.
  { tx: 0, ty: 0, tz: INV_SQRT3, ax: 0, ay: 1, az: 0, angle: 0, paletteStep: 0, blendMode: 'overlay' },
  // -Z (back): 180deg around Y
  { tx: 0, ty: 0, tz: -INV_SQRT3, ax: 0, ay: 1, az: 0, angle: 180, paletteStep: 10 },
  // +X (right): 90deg around Y
  { tx: INV_SQRT3, ty: 0, tz: 0, ax: 0, ay: 1, az: 0, angle: 90, paletteStep: 3 },
  // -X (left): -90deg around Y
  { tx: -INV_SQRT3, ty: 0, tz: 0, ax: 0, ay: 1, az: 0, angle: -90, paletteStep: 13 },
  // +Y (bottom in CSS coords)
  { tx: 0, ty: INV_SQRT3, tz: 0, ax: 1, ay: 0, az: 0, angle: -90, paletteStep: 6 },
  // -Y (top)
  { tx: 0, ty: -INV_SQRT3, tz: 0, ax: 1, ay: 0, az: 0, angle: 90, paletteStep: 16 },
];

function mat4FromQuat(q: Quat): Mat4 {
  const w = q[0],
    x = q[1],
    y = q[2],
    z = q[3];
  return [
    1 - 2 * y * y - 2 * z * z,
    2 * x * y - 2 * w * z,
    2 * x * z + 2 * w * y,
    0,
    2 * x * y + 2 * w * z,
    1 - 2 * x * x - 2 * z * z,
    2 * y * z - 2 * w * x,
    0,
    2 * x * z - 2 * w * y,
    2 * y * z + 2 * w * x,
    1 - 2 * x * x - 2 * y * y,
    0,
    0,
    0,
    0,
    1,
  ];
}

function mat4FromAxisAngle(ax: number, ay: number, az: number, angleDeg: number): Mat4 {
  const a = (angleDeg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const oc = 1 - c;
  return [
    c + ax * ax * oc,
    ax * ay * oc - az * s,
    ax * az * oc + ay * s,
    0,
    ay * ax * oc + az * s,
    c + ay * ay * oc,
    ay * az * oc - ax * s,
    0,
    az * ax * oc - ay * s,
    az * ay * oc + ax * s,
    c + az * az * oc,
    0,
    0,
    0,
    0,
    1,
  ];
}

function mat4Translate(tx: number, ty: number, tz: number): Mat4 {
  return [1, 0, 0, tx, 0, 1, 0, ty, 0, 0, 1, tz, 0, 0, 0, 1];
}

function mat4Mul(a: Mat4, b: Mat4): Mat4 {
  const o: Mat4 = Array.from({ length: 16 });
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[i * 4 + k] * b[k * 4 + j];
      o[i * 4 + j] = s;
    }
  }
  return o;
}

// CSS matrix3d is column-major. Row-major mat[r*4+c] then column-major emission.
function mat4ToCss(m: Mat4): string {
  return `matrix3d(${m[0]},${m[4]},${m[8]},${m[12]},${m[1]},${m[5]},${m[9]},${m[13]},${m[2]},${m[6]},${m[10]},${m[14]},${m[3]},${m[7]},${m[11]},${m[15]})`;
}

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

const IDLE_SPEED = 0.22;
const IDLE_VEL = { dx: IDLE_SPEED, dy: IDLE_SPEED * -0.4 };
const BLEND_RATE = 0.04;
const SENSITIVITY = 0.015;

// Initial pose: X/Y/Z rotations chosen so the cube reads as mid-spin on
// first paint. Used both as the rAF seed and as the SSR transform so the
// unhydrated logo is already in 3D.
const initXH = (-107.8 * Math.PI) / 180 / 2;
const initYH = (4.4 * Math.PI) / 180 / 2;
const initZH = (-27.6 * Math.PI) / 180 / 2;
const INIT_QUAT: Quat = qMul(
  qMul([Math.cos(initXH), Math.sin(initXH), 0, 0], [Math.cos(initYH), 0, Math.sin(initYH), 0]),
  [Math.cos(initZH), 0, 0, Math.sin(initZH)]
);
const INIT_GLOBAL_MAT = mat4FromQuat(INIT_QUAT);

const GLOBAL_KEY = '__scLogoRotation' as const;

type SharedRotation = {
  quat: Quat;
  velocity: { dx: number; dy: number };
  idleVel: { dx: number; dy: number };
  dragging: boolean;
  subscribers: Set<() => void>;
  rafId: number | null;
  start(): void;
  stop(): void;
  subscribe(cb: () => void): () => void;
  applyDrag(dx: number, dy: number): void;
};

const sharedRotation: SharedRotation = ((globalThis as Record<string, unknown>)[GLOBAL_KEY] as SharedRotation) ?? {
  quat: [...INIT_QUAT] as Quat,
  velocity: { ...IDLE_VEL },
  idleVel: { ...IDLE_VEL },
  dragging: false,
  subscribers: new Set<() => void>(),
  rafId: null as number | null,

  start() {
    if (this.rafId != null) return;
    // Cap at ~60fps. rAF fires at the display refresh rate, so 120Hz /
    // 144Hz screens would otherwise do 2+ times the work for no benefit.
    // 15.4ms (1000/65) threshold survives 60Hz frame jitter without
    // accidentally skipping a paint.
    const FRAME_MS = 1000 / 65;
    let lastTime = 0;
    const loop = (time: number) => {
      this.rafId = requestAnimationFrame(loop);
      if (time - lastTime < FRAME_MS) return;
      lastTime = time;
      if (!this.dragging) {
        const yHalf = (this.velocity.dx * SENSITIVITY) / 2;
        const xHalf = (-this.velocity.dy * SENSITIVITY) / 2;
        const spinQ: Quat = qMul([Math.cos(xHalf), Math.sin(xHalf), 0, 0], [Math.cos(yHalf), 0, Math.sin(yHalf), 0]);
        this.quat = qNorm(qMul(spinQ, this.quat));

        this.velocity.dx = this.velocity.dx * (1 - BLEND_RATE) + this.idleVel.dx * BLEND_RATE;
        this.velocity.dy = this.velocity.dy * (1 - BLEND_RATE) + this.idleVel.dy * BLEND_RATE;
      }
      for (const cb of this.subscribers) cb();
    };
    this.rafId = requestAnimationFrame(loop);
  },

  stop() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  },

  subscribe(cb: () => void) {
    this.subscribers.add(cb);
    if (this.subscribers.size === 1) this.start();
    cb();
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

const Scene = styled.div`
  position: relative;
  display: inline-block;
  perspective: 800px;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const FaceTile = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  mix-blend-mode: hard-light;
  pointer-events: none;
`;

export default function PlatonicLogo({ size = 120, className }: { size?: number; className?: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastZRef = useRef<number[]>([]);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const s = size * SCALE;
  const faceEdgePx = FACE_EDGE * s;
  const halfEdge = faceEdgePx / 2;

  // FaceTile is centered on Scene's center via top:50%/left:50% plus
  // negative margins, so the combined matrix's translation column
  // directly positions the face center. No origin compensation needed.
  const localMats = useMemo(
    () =>
      FACES.map(f =>
        mat4Mul(mat4Translate(f.tx * s, f.ty * s, f.tz * s), mat4FromAxisAngle(f.ax, f.ay, f.az, f.angle))
      ),
    [s]
  );

  // Initial face transforms emitted at render time so the SSR HTML
  // already shows the cube in 3D before hydration. The rAF subscriber
  // takes over after mount and the first invocation writes the same
  // values, so there's no flicker.
  const initialFaceStyles = useMemo(
    () =>
      localMats.map(m => {
        const combined = mat4Mul(INIT_GLOBAL_MAT, m);
        return {
          transform: mat4ToCss(combined),
          zIndex: Math.round(combined[11] * 100) + 1000,
        };
      }),
    [localMats]
  );

  useEffect(() => {
    return sharedRotation.subscribe(() => {
      const g = mat4FromQuat(sharedRotation.quat);
      for (let i = 0; i < FACES.length; i++) {
        const el = faceRefs.current[i];
        if (!el) continue;
        const combined = mat4Mul(g, localMats[i]);
        el.style.transform = mat4ToCss(combined);
        const z = Math.round(combined[11] * 100) + 1000;
        if (lastZRef.current[i] !== z) {
          el.style.zIndex = String(z);
          lastZRef.current[i] = z;
        }
      }
    });
  }, [localMats]);

  // Pointer interaction: drag rotates, fling spins.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const onPointerDown = (e: PointerEvent) => {
      sharedRotation.dragging = true;
      sharedRotation.velocity.dx = 0;
      sharedRotation.velocity.dy = 0;
      lastPointerRef.current.x = e.clientX;
      lastPointerRef.current.y = e.clientY;
      scene.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!sharedRotation.dragging) return;
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current.x = e.clientX;
      lastPointerRef.current.y = e.clientY;

      const vel = sharedRotation.velocity;
      vel.dx = dx * 0.4 + vel.dx * 0.6;
      vel.dy = dy * 0.4 + vel.dy * 0.6;
      sharedRotation.applyDrag(dx, dy);
    };
    const onPointerUp = () => {
      sharedRotation.dragging = false;
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
    };
  }, []);

  return (
    <Scene ref={sceneRef} className={className} style={{ width: size, height: size }}>
      {FACES.map((f, i) => (
        <FaceTile
          key={i}
          ref={el => {
            faceRefs.current[i] = el;
          }}
          style={{
            width: faceEdgePx,
            height: faceEdgePx,
            marginLeft: -halfEdge,
            marginTop: -halfEdge,
            background: theme.palette[f.paletteStep],
            transform: initialFaceStyles[i].transform,
            zIndex: initialFaceStyles[i].zIndex,
            mixBlendMode: f.blendMode,
          }}
        />
      ))}
    </Scene>
  );
}
