import { Metadata } from 'next';
import DocsLayout from '@/components/DocsLayout';
import DocsPageNav from '@/components/DocsPageNav';

import WhatsNew from '@/sections/v7/whats-new.mdx';
import Migration from '@/sections/v7/migration.mdx';
import Native from '@/sections/v7/native.mdx';
import Plugins from '@/sections/v7/plugins.mdx';

export const metadata: Metadata = {
  title: 'styled-components v7',
  description:
    'Now in alpha: in-house CSS engine, modern CSS on React Native, native animations, plugins subpath. Install with npm install styled-components@test; expect frequent updates while internals stabilize.',
};

export default function V7Page() {
  return (
    <DocsLayout title="styled-components v7">
      <WhatsNew />
      <Migration />
      <Native />
      <Plugins />
      <DocsPageNav current="v7" />
    </DocsLayout>
  );
}
