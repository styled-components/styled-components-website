import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../components/faqs/nesting'
import ReverseSelectors from '../../components/faqs/reverse-selectors'
import CSSFrameworks from '../../components/faqs/support-for-css-frameworks'

const FAQs = () => (
  <DocsLayout title="FAQs">
    <Nesting />
    <ReverseSelectors />
    <CSSFrameworks />
  </DocsLayout>
)

export default FAQs
