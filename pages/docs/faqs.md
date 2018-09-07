import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../sections/faqs/nesting.md'
import CSSFrameworks from '../../sections/faqs/support-for-css-frameworks.md'
import OverrideStyles from '../../sections/faqs/override-styles-with-higher-specificity.md'
import OverrideInlineStyles from '../../sections/faqs/override-inline-styles.md'
import TwoDomClasses from '../../sections/faqs/dom-two-classes.md'
import WhenToUseAttrs from '../../sections/faqs/when-to-use-attrs.md'
import LibraryAuthors from '../../sections/faqs/library-authors.md'
import DuplicatedStyledComponents from '../../sections/faqs/duplicated-styled-components.md'
import HTMLAttributeWarnings from '../../sections/faqs/html-attribute-warnings.md'
import BrowserSupport from '../../sections/faqs/browser-support.md'
import MigrationV4 from '../../sections/faqs/migration-v4.md'

export default ({ children }) => (
  <DocsLayout
    title="FAQs"
    description="Commonly asked questions about styled-components"
  >
    {children}
  </DocsLayout>
)

<MigrationV4 />
<Nesting />
<CSSFrameworks />
<OverrideStyles />
<OverrideInlineStyles />
<TwoDomClasses />
<WhenToUseAttrs />
<LibraryAuthors />
<DuplicatedStyledComponents />
<HTMLAttributeWarnings />
<BrowserSupport />

