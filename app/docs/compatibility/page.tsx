import { Metadata } from 'next';

import DocsLayout from '@/components/DocsLayout';
import DocsPageNav from '@/components/DocsPageNav';
import CompatibilityMatrix from '@/components/CompatibilityMatrix';
import Link from '@/components/Link';
import { loadCompatMatrix } from '@/utils/cssCompat.server';

export const metadata: Metadata = {
  title: 'React Native CanIUse · styled-components',
  description:
    'Which CSS features work on stock React Native vs through styled-components v6 and v7. iOS and Android coverage, plus upstream PRs in flight.',
};

export default function CompatibilityPage() {
  const entries = loadCompatMatrix();

  return (
    <DocsLayout title="React Native CanIUse">
      <p>
        A per-feature reference for which CSS works on React Native. The v6 and v7 columns show styled-components&apos;
        native runtime support; the iOS and Android columns show what stock React Native handles without any
        styled-components polyfill. Click any row for caveats, the underlying RN style key, and links to upstream PRs in
        flight. Machine-readable versions are available as{' '}
        <Link href="/docs/compatibility.json" variant="inline">
          JSON
        </Link>{' '}
        and{' '}
        <Link href="/docs/compatibility.md" variant="inline">
          Markdown
        </Link>
        .
      </p>

      <CompatibilityMatrix entries={entries} />

      <DocsPageNav current="compatibility" />
    </DocsLayout>
  );
}
