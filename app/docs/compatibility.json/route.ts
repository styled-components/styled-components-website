import { NextResponse } from 'next/server';

import { buildCompatJson } from '@/utils/cssCompatFormats';
import { loadCompatMatrix } from '@/utils/cssCompat.server';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(buildCompatJson(loadCompatMatrix()));
}
