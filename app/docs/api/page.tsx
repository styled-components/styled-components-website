import { Metadata } from 'next';
import DocsLayout from '@/components/DocsLayout';
import DocsPageNav from '@/components/DocsPageNav';

import Primary from '@/sections/api/primary/index.mdx';
import Helpers from '@/sections/api/helpers/index.mdx';
import SupportedCSS from '@/sections/api/supported-css.mdx';
import TypeScript from '@/sections/api/typescript.mdx';
import OldAPIs from '@/sections/api/old/index.mdx';
import TestUtilities from '@/sections/api/test-utils/index.mdx';

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'API Reference of styled-components',
};

export default function APIPage() {
  return (
    <DocsLayout title="API Reference">
      <Primary />
      <Helpers />
      <TestUtilities />
      <SupportedCSS />
      <TypeScript />
      <OldAPIs />
      <DocsPageNav current="api" />
    </DocsLayout>
  );
}
