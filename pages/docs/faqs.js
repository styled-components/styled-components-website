import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../sections/faqs/nesting'
import CSSFrameworks from '../../sections/faqs/support-for-css-frameworks'
import OverrideStyles from '../../sections/faqs/override-styles-with-higher-specificity'
import OverrideInlineStyles from '../../sections/faqs/override-inline-styles'
import TwoDomClasses from '../../sections/faqs/dom-two-classes'
import WhenToUseAttrs from '../../sections/faqs/when-to-use-attrs'
import LibraryAuthors from '../../sections/faqs/library-authors'
import DuplicatedStyledComponents from '../../sections/faqs/duplicated-styled-components'
import HTMLAttributeWarnings from '../../sections/faqs/html-attribute-warnings'
import BrowserSupport from '../../sections/faqs/browser-support'
import MigrationV4 from '../../sections/faqs/migration-v4'

const FAQs = () => (
  <DocsLayout
    title="FAQs"
    description="Commonly asked questions about styled-components"
  >
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
  </DocsLayout>
)

export default FAQs
