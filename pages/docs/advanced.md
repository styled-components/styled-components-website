import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Theming from '../../sections/advanced/theming.md'
import Refs from '../../sections/advanced/refs.md'
import Security from '../../sections/advanced/security.md'
import ExistingCSS from '../../sections/advanced/existing-css.md'
import MediaTemplates from '../../sections/advanced/media-templates.md'
import TaggedTemplateLiterals from '../../sections/advanced/tagged-template-literals.md'
import ServerSideRendering from '../../sections/advanced/server-side-rendering.md'
import ComponentsAsSelectors from '../../sections/advanced/components-as-selectors.md'

<Theming />
<Refs />
<Security />
<ExistingCSS />
<MediaTemplates />
<TaggedTemplateLiterals />
<ServerSideRendering />
<ComponentsAsSelectors />

<NextPage href="/docs/api" title="API Reference" />

export default ({ children }) => (
  <DocsLayout title="Advanced" description="Advanced usage of styled-components - Theming, refs, Security, Existing CSS, Media Templates, Tagged Template Literals, SSR">
    {children}
  </DocsLayout>
)

