import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Primary from '../../sections/api/primary/index.md'
import Helpers from '../../sections/api/helpers/index.md'
import SupportedCSS from '../../sections/api/supported-css.md'
import Flow from '../../sections/api/flow.md'
import TypeScript from '../../sections/api/typescript.md'
import OldAPIs from '../../sections/api/old/index.md'

export default ({ children }) => (
  <DocsLayout
    title="API Reference"
    description="API Reference of styled-components"
  >
    {children}
  </DocsLayout>
)

<Primary />
<Helpers />
<SupportedCSS />
<Flow />
<TypeScript />
<OldAPIs />

<NextPage href="/docs/tooling" title="Tooling" />
