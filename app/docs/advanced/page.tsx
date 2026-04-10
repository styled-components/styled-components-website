import { Metadata } from 'next';
import DocsLayout from '@/components/DocsLayout';
import DocsPageNav from '@/components/DocsPageNav';

import Theming from '@/sections/advanced/theming.mdx';
import ServerSideRendering from '@/sections/advanced/server-side-rendering.mdx';
import Performance from '@/sections/advanced/performance.mdx';
import ExistingCSS from '@/sections/advanced/existing-css.mdx';
import ComponentsAsSelectors from '@/sections/advanced/components-as-selectors.mdx';
import StyleObjects from '@/sections/advanced/style-objects.mdx';
import Accessibility from '@/sections/advanced/accessibility.mdx';
import Refs from '@/sections/advanced/refs.mdx';
import Security from '@/sections/advanced/security.mdx';
import TaggedTemplateLiterals from '@/sections/advanced/tagged-template-literals.mdx';

export const metadata: Metadata = {
  title: 'Advanced Usage',
  description: 'Theming, Server-Side Rendering, Performance, Existing CSS, Style Objects, Accessibility and more',
};

export default function AdvancedPage() {
  return (
    <DocsLayout title="Advanced Usage">
      <Theming />
      <ServerSideRendering />
      <Performance />
      <ExistingCSS />
      <ComponentsAsSelectors />
      <StyleObjects />
      <Accessibility />
      <Refs />
      <Security />
      <TaggedTemplateLiterals />
      <DocsPageNav current="advanced" />
    </DocsLayout>
  );
}
