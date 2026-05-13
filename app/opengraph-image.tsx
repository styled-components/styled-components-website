import { ImageResponse } from 'next/og';
import { readOgFont } from '@/utils/readOgFont';

export const alt = 'styled-components';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Cube face polygons from gen-favicon.mjs with sRGB hex approximations
const FACES: [string, string][] = [
  ['12.7962,10.3482 42.8954,25.0286 32.4747,58.5778 2.3755,43.8975', '#ffc000'],
  ['61.6245,20.1025 51.2038,53.6518 32.4747,58.5778 42.8954,25.0286', '#00ff55'],
  ['31.5253,5.4222 61.6245,20.1025 42.8954,25.0286 12.7962,10.3482', '#5a8aff'],
  ['21.1046,38.9714 2.3755,43.8975 32.4747,58.5778 51.2038,53.6518', '#ff50e0'],
  ['31.5253,5.4222 12.7962,10.3482 2.3755,43.8975 21.1046,38.9714', '#ff2030'],
  ['31.5253,5.4222 21.1046,38.9714 51.2038,53.6518 61.6245,20.1025', '#00cce8'],
];

function buildSvg(): string {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
    ...FACES.map(([pts, color]) => `<polygon points="${pts}" fill="${color}" opacity="0.7"/>`),
    '</svg>',
  ].join('');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export default async function Image() {
  const figtreeFont = await readOgFont('figtreeBold');

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f8f8f8' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '80px',
          gap: '60px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={buildSvg()} width={400} height={400} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'Figtree',
              fontSize: 100,
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
            }}
          >
            styled
          </span>
          <span
            style={{
              fontFamily: 'Figtree',
              fontSize: 100,
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
            }}
          >
            components
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'Figtree', data: figtreeFont, weight: 700, style: 'normal' }],
    }
  );
}
