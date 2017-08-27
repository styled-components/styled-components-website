import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../components/faqs/nesting'
import ReverseSelectors from '../../components/faqs/reverse-selectors'
import CSSFrameworks from '../../components/faqs/support-for-css-frameworks'
import CssTransitionGroup from '../../components/faqs/css-transition-group'

const FAQs = () => (
  <DocsLayout title="FAQs">
    <Nesting />
    <ReverseSelectors />
    <CSSFrameworks />
    <CssTransitionGroup />
  </DocsLayout>
)

export default FAQs
