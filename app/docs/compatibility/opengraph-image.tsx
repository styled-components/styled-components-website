import { ImageResponse } from 'next/og';

export const alt = 'React Native CanIUse: CSS feature compatibility for styled-components';
const SCALE = 2;
export const size = { width: 1200 * SCALE, height: 630 * SCALE };
export const contentType = 'image/png';

const BG = '#0b0d16';
const SURFACE = '#141826';
const SURFACE_RAISED = '#1a1f30';
const BORDER = '#262b3d';
const TEXT = '#f5f6fa';
const MUTED = '#8b91a8';

const STATUS_COLOR = {
  yes: '#4ade80',
  partial: '#fbbf24',
  no: '#f87171',
} as const;

const FACES: [string, string][] = [
  ['12.7962,10.3482 42.8954,25.0286 32.4747,58.5778 2.3755,43.8975', '#ffc000'],
  ['61.6245,20.1025 51.2038,53.6518 32.4747,58.5778 42.8954,25.0286', '#00ff55'],
  ['31.5253,5.4222 61.6245,20.1025 42.8954,25.0286 12.7962,10.3482', '#5a8aff'],
  ['21.1046,38.9714 2.3755,43.8975 32.4747,58.5778 51.2038,53.6518', '#ff50e0'],
  ['31.5253,5.4222 12.7962,10.3482 2.3755,43.8975 21.1046,38.9714', '#ff2030'],
  ['31.5253,5.4222 21.1046,38.9714 51.2038,53.6518 61.6245,20.1025', '#00cce8'],
];

function buildCube(): string {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
    ...FACES.map(([pts, color]) => `<polygon points="${pts}" fill="${color}" opacity="0.85"/>`),
    '</svg>',
  ].join('');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

type Status = keyof typeof STATUS_COLOR;

// Material Design icon paths (24x24 viewBox), matching the @styled-icons/material
// glyphs used by CompatibilityMatrix: Check / Contrast / Close.
const ICON_PATHS: Record<Status, string> = {
  yes: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  partial:
    'M12 22q-2.075 0-3.9-.788t-3.175-2.137-2.137-3.175T2 12t.788-3.9 2.137-3.175T8.1 2.788 12 2t3.9.788 3.175 2.137 2.137 3.175T22 12t-.788 3.9-2.137 3.175-3.175 2.137T12 22m1-2.05q2.875-.35 4.938-2.45T20 12q0-2.95-2.062-5.087T13 4.05z',
  no: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
};

function buildStatusIcon(status: Status): string {
  const color = STATUS_COLOR[status];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">` +
    `<path d="${ICON_PATHS[status]}" fill="${color}"/>` +
    `</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const SAMPLE_ROWS: Array<{ feature: string; v6: Status; v7: Status; ios: Status; android: Status }> = [
  { feature: 'aspect-ratio', v6: 'partial', v7: 'yes', ios: 'yes', android: 'yes' },
  { feature: 'oklch() / oklab()', v6: 'no', v7: 'yes', ios: 'no', android: 'no' },
  { feature: '@keyframes', v6: 'partial', v7: 'yes', ios: 'partial', android: 'partial' },
  { feature: 'filter', v6: 'no', v7: 'yes', ios: 'partial', android: 'partial' },
  { feature: ':hover', v6: 'no', v7: 'yes', ios: 'no', android: 'no' },
];

const COL_WIDTH = 140 * SCALE;
const PILL_HEIGHT = 44 * SCALE;
const ICON_SIZE = 22 * SCALE;

function StatusPill({ status }: { status: Status }) {
  const color = STATUS_COLOR[status];
  return (
    <div
      style={{
        display: 'flex',
        width: COL_WIDTH,
        height: PILL_HEIGHT,
        background: `${color}1f`,
        border: `${SCALE}px solid ${color}55`,
        borderRadius: 12 * SCALE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={buildStatusIcon(status)} width={ICON_SIZE} height={ICON_SIZE} alt="" />
    </div>
  );
}

export default async function Image() {
  const figtreeBold = await fetch(
    'https://fonts.gstatic.com/s/figtree/v9/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_eYR15e.ttf'
  ).then(r => r.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: BG,
        padding: `${56 * SCALE}px ${64 * SCALE}px`,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 * SCALE, color: MUTED, fontSize: 22 * SCALE }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={buildCube()} width={44 * SCALE} height={44 * SCALE} alt="" />
        <span style={{ color: TEXT, fontWeight: 600 }}>styled-components</span>
        <span>·</span>
        <span>docs</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24 * SCALE }}>
        <div
          style={{
            display: 'flex',
            color: TEXT,
            fontSize: 68 * SCALE,
            fontFamily: 'Figtree',
            fontWeight: 700,
            letterSpacing: -1.5 * SCALE,
            lineHeight: 1,
          }}
        >
          React Native CanIUse
        </div>
        <div style={{ display: 'flex', color: MUTED, fontSize: 26 * SCALE, marginTop: 12 * SCALE }}>
          CSS feature compatibility across sc-v6, sc-v7, iOS, and Android
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 40 * SCALE,
          background: SURFACE,
          border: `${SCALE}px solid ${BORDER}`,
          borderRadius: 16 * SCALE,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: `${12 * SCALE}px ${24 * SCALE}px`,
            gap: 12 * SCALE,
            background: SURFACE_RAISED,
            borderBottom: `${SCALE}px solid ${BORDER}`,
            color: MUTED,
            fontSize: 16 * SCALE,
            fontWeight: 600,
            letterSpacing: SCALE,
            textTransform: 'uppercase',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flex: 1 }}>Feature</div>
          <div style={{ display: 'flex', width: COL_WIDTH, justifyContent: 'center' }}>sc-v6</div>
          <div
            style={{
              display: 'flex',
              width: COL_WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8 * SCALE,
            }}
          >
            <span>sc-v7</span>
            <span
              style={{
                display: 'flex',
                padding: `${2 * SCALE}px ${8 * SCALE}px`,
                fontSize: 11 * SCALE,
                letterSpacing: 0.5 * SCALE,
                borderRadius: 999,
                color: STATUS_COLOR.yes,
                background: `${STATUS_COLOR.yes}22`,
              }}
            >
              NEW
            </span>
          </div>
          <div style={{ display: 'flex', width: COL_WIDTH, justifyContent: 'center' }}>iOS</div>
          <div style={{ display: 'flex', width: COL_WIDTH, justifyContent: 'center' }}>Android</div>
        </div>

        {SAMPLE_ROWS.map(row => (
          <div
            key={row.feature}
            style={{
              display: 'flex',
              padding: `${10 * SCALE}px ${24 * SCALE}px`,
              gap: 12 * SCALE,
              borderTop: `${SCALE}px solid ${BORDER}`,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                color: TEXT,
                fontSize: 22 * SCALE,
                fontFamily: 'monospace',
              }}
            >
              {row.feature}
            </div>
            <StatusPill status={row.v6} />
            <StatusPill status={row.v7} />
            <StatusPill status={row.ios} />
            <StatusPill status={row.android} />
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'Figtree', data: figtreeBold, weight: 700, style: 'normal' }],
    }
  );
}
