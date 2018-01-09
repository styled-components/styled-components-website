import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../sections/faqs/nesting'
import ReverseSelectors from '../../sections/faqs/reverse-selectors'
import ExtendAndStyled from '../../sections/faqs/extend-and-styled-difference'
import CSSFrameworks from '../../sections/faqs/support-for-css-frameworks'
import OverrideStyles from '../../sections/faqs/override-styles-with-higher-specificity'
import OverrideInlineStyles from '../../sections/faqs/override-inline-styles'
import TwoDomClasses from '../../sections/faqs/dom-two-classes'
import BrowserSupport from '../../sections/faqs/browser-support'

const FAQs = () => (
  <DocsLayout title="FAQs" description="Commonly asked questions about styled-components">
    <Nesting />
    <ReverseSelectors />
    <ExtendAndStyled />
    <CSSFrameworks />
    <OverrideStyles />
    <OverrideInlineStyles />
    <TwoDomClasses />
    <BrowserSupport />
  </DocsLayout>
)

export default FAQs
