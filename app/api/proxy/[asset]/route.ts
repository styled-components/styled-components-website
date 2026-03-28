import { NextRequest, NextResponse } from 'next/server';

const proxyMap: Record<string, string> = {
  'npm-v.svg': 'https://img.shields.io/npm/v/styled-components.svg',
  'size.svg': 'https://img.shields.io/badge/gzip%20size-12.4%20kB-brightgreen.svg',
  'downloads.svg': 'https://img.shields.io/npm/dm/styled-components.svg?maxAge=3600',
  'stars.svg':
    'https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star&maxAge=3600',
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ asset: string }> }) {
  const { asset } = await params;

  if (!asset) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  const remoteUrl = proxyMap[asset];

  if (typeof remoteUrl === 'undefined') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  try {
    const resp = await fetch(remoteUrl);
    const data = await resp.arrayBuffer();
    const contentType = resp.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(data, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 's-maxage=3600,stale-while-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching remote asset' }, { status: 500 });
  }
}
