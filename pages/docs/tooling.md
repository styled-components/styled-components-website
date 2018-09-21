import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import BabelPlugin from '../../sections/tooling/babel-plugin.md'
import TypeScriptPlugin from '../../sections/tooling/typescript-plugin.md'
import TestUtilities from '../../sections/tooling/test-utilities.md'
import Stylelint from '../../sections/tooling/stylelint.md'
import StyledTheming from '../../sections/tooling/styled-theming.md'
import SyntaxHighlighting from '../../sections/tooling/syntax-highlighting.md'

export default ({ children }) => (
  <DocsLayout
    title="Tooling"
    description="Additional Tools for styled-components, babel and TypeScript plugins, testing"
  >
    {children}
  </DocsLayout>
)

<BabelPlugin />
<TypeScriptPlugin />
<TestUtilities />
<Stylelint />
<StyledTheming />
<SyntaxHighlighting />

<NextPage href="/docs/faqs" title="FAQs" />
