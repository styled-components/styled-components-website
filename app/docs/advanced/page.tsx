import DocsLayout from '~/components/DocsLayout';
import NextPage from '~/components/NextPage';

import Theming from '~/sections/advanced/theming.mdx';
import Refs from '~/sections/advanced/refs.mdx';
import Security from '~/sections/advanced/security.mdx';
import ExistingCSS from '~/sections/advanced/existing-css.mdx';
import TaggedTemplateLiterals from '~/sections/advanced/tagged-template-literals.mdx';
import ServerSideRendering from '~/sections/advanced/server-side-rendering.mdx';
import ComponentsAsSelectors from '~/sections/advanced/components-as-selectors.mdx';
import StyleObjects from '~/sections/advanced/style-objects.mdx';

export default function AdvancedPage() {
  return (
    <DocsLayout
      title="Advanced Usage"
      description="Theming, refs, Security, Existing CSS, Tagged Template Literals, Server-Side Rendering and Style Objects"
    >
      <Theming />
      <Refs />
      <Security />
      <ExistingCSS />
      <TaggedTemplateLiterals />
      <ServerSideRendering />
      <ComponentsAsSelectors />
      <StyleObjects />
      <NextPage href="/docs/api" title="API Reference" />
    </DocsLayout>
  );
}
