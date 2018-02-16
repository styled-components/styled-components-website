import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../sections/faqs/nesting'
import ExtendAndStyled from '../../sections/faqs/extend-and-styled-difference'
import CSSFrameworks from '../../sections/faqs/support-for-css-frameworks'
import OverrideStyles from '../../sections/faqs/override-styles-with-higher-specificity'
import OverrideInlineStyles from '../../sections/faqs/override-inline-styles'
import TwoDomClasses from '../../sections/faqs/dom-two-classes'
import WhenToUseAttrs from '../../sections/faqs/when-to-use-attrs'
import LibraryAuthors from '../../sections/faqs/library-authors'
import DuplicatedStyledComponents from '../../sections/faqs/duplicated-styled-components'
import BrowserSupport from '../../sections/faqs/browser-support'

const FAQs = () => (
  <DocsLayout title="FAQs" description="Commonly asked questions about styled-components">
    <Nesting />
    <ExtendAndStyled />
    <CSSFrameworks />
    <OverrideStyles />
    <OverrideInlineStyles />
    <TwoDomClasses />
    <WhenToUseAttrs />
    <LibraryAuthors />
    <DuplicatedStyledComponents />
    <BrowserSupport />
  </DocsLayout>
)

export default FAQs
