/**
 * Generates public/favicon.svg, a translucent 3D cube with palette colors.
 * Run: node scripts/gen-favicon.mjs > public/favicon.svg
 */

const MAX_FACES = 20;

const lightPalette = [
  'oklch(0.6579 0.2752 25.7477)', 'oklch(0.7133 0.2268 42.8918)',
  'oklch(0.7583 0.2155 65.4221)', 'oklch(0.7979 0.2386 85.2743)',
  'oklch(0.682 0.2741 104.0057)', 'oklch(0.7434 0.2246 122.9199)',
  'oklch(0.6637 0.2479 136.97)',   'oklch(0.7545 0.258 149.7267)',
  'oklch(0.7855 0.2177 170.2576)', 'oklch(0.7061 0.2436 183.6472)',
  'oklch(0.6488 0.2213 203.8675)', 'oklch(0.7193 0.176 226.5113)',
  'oklch(0.6051 0.2341 253.7474)', 'oklch(0.674 0.1845 266.6025)',
  'oklch(0.7487 0.1439 281.5611)', 'oklch(0.6441 0.239 303.5304)',
  'oklch(0.7606 0.2253 325.2988)', 'oklch(0.6961 0.2463 337.0433)',
  'oklch(0.657 0.2534 352.3631)',  'oklch(0.6748 0.27 8.3969)',
];

const darkPalette = [
  'oklch(0.6694 0.2477 23.0264)', 'oklch(0.7200 0.2027 40.905)',
  'oklch(0.7522 0.1996 62.908)',  'oklch(0.7913 0.2102 82.2482)',
  'oklch(0.8328 0.2501 97.2626)', 'oklch(0.8674 0.2407 114.9615)',
  'oklch(0.8594 0.2821 131.5641)','oklch(0.8373 0.2627 147.8038)',
  'oklch(0.8235 0.2354 165.7866)','oklch(0.8509 0.2114 183.7583)',
  'oklch(0.8198 0.2042 197.6572)','oklch(0.7505 0.1916 209.8018)',
  'oklch(0.7055 0.1704 235.9564)','oklch(0.6609 0.1774 264.5021)',
  'oklch(0.7373 0.1341 276.0508)','oklch(0.7968 0.1093 296.4129)',
  'oklch(0.7443 0.197 317.5406)', 'oklch(0.7118 0.2537 333.0661)',
  'oklch(0.7240 0.2287 349.1495)','oklch(0.6909 0.2362 5.228)',
];

function normalize(v) {
  const r = Math.hypot(...v);
  return r === 0 ? v : v.map(c => c / r);
}
function cross(a, b) {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
}
function dot3(a, b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
function sub(a, b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function withAlpha(c, a) { return c.slice(0, -1) + ` / ${a})`; }
function boostL(c, amt) {
  return c.replace(/oklch\(([\d.]+)/, (_, l) => `oklch(${Math.min(1, parseFloat(l) + amt).toFixed(4)}`);
}

const cube = {
  verts: normalize.length ? [[-1,-1,-1],[-1,-1,1],[-1,1,-1],[-1,1,1],[1,-1,-1],[1,-1,1],[1,1,-1],[1,1,1]].map(normalize) : [],
  faces: [[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]],
};

const SIZE = 64;
const DEG = Math.PI / 180;
const ROT = [200 * DEG, 25 * DEG, 26 * DEG];

function rotate(v, [rx, ry, rz]) {
  let p = [v[0], -v[1], v[2]];
  let c, s;
  c = Math.cos(rx); s = Math.sin(rx); p = [p[0], p[1]*c - p[2]*s, p[1]*s + p[2]*c];
  c = Math.cos(ry); s = Math.sin(ry); p = [p[0]*c + p[2]*s, p[1], -p[0]*s + p[2]*c];
  c = Math.cos(rz); s = Math.sin(rz); p = [p[0]*c - p[1]*s, p[0]*s + p[1]*c, p[2]];
  return p;
}

const r = SIZE / 2;
const verts = cube.verts.map(v => rotate(v, ROT));
const cos45 = Math.cos(-Math.PI / 4), sin45 = Math.sin(-Math.PI / 4);

const faces = cube.faces.map((idx, fi) => {
  const v3 = idx.map(i => verts[i]);
  const n = v3.length;
  const ctr = [0, 1, 2].map(d => v3.reduce((s, v) => s + v[d], 0) / n);
  let norm = normalize(cross(sub(v3[1], v3[0]), sub(v3[2], v3[0])));
  if (dot3(ctr, norm) < 0) norm = norm.map(c => -c);

  const ov = idx.map(i => { const v = cube.verts[i]; return [v[0], -v[1], v[2]]; });
  const oc = [0, 1, 2].map(d => ov.reduce((s, v) => s + v[d], 0) / n);
  let on = normalize(cross(sub(ov[1], ov[0]), sub(ov[2], ov[0])));
  if (dot3(oc, on) < 0) on = on.map(c => -c);

  const rx = on[0] * cos45 + on[2] * sin45;
  const rz = -on[0] * sin45 + on[2] * cos45;

  return {
    fi, depth: ctr[2],
    az: Math.atan2(rx, rz),
    pts: v3.map(v => `${(r + v[0] * r).toFixed(4)},${(r + v[1] * r).toFixed(4)}`).join(' '),
  };
});

faces.sort((a, b) => a.az - b.az);
faces.forEach((f, rank) => { f.step = Math.round((rank * MAX_FACES) / faces.length) % MAX_FACES; });
faces.sort((a, b) => a.depth - b.depth);

const steps = [...new Set(faces.map(f => f.step))].sort((a, b) => a - b);
const lightCSS = steps.map(s => {
  const c = withAlpha(boostL(lightPalette[s], 0.04), 0.6);
  return `    .p${s} { fill: ${c}; stroke: ${c}; }`;
}).join('\n');
const darkCSS = steps.map(s => {
  const c = withAlpha(boostL(darkPalette[s], 0.02), 0.65);
  return `      .p${s} { fill: ${c}; stroke: ${c}; }`;
}).join('\n');

process.stdout.write(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <style>
    polygon { stroke-width: 0; mix-blend-mode: soft-light; }
${lightCSS}
    @media (prefers-color-scheme: dark) {
${darkCSS}
    }
  </style>
${faces.map(f => `  <polygon class="p${f.step}" points="${f.pts}"/>`).join('\n')}
</svg>`);
