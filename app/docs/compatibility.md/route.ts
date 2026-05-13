import { buildCompatMarkdown } from '@/utils/cssCompatFormats';
import { loadCompatMatrix } from '@/utils/cssCompat.server';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildCompatMarkdown(loadCompatMatrix()), {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  });
}
