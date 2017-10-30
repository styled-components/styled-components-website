import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../sections/faqs/nesting'
import ReverseSelectors from '../../sections/faqs/reverse-selectors'
import ExtendAndStyled from '../../sections/faqs/extend-and-styled-difference'
import CSSFrameworks from '../../sections/faqs/support-for-css-frameworks'

const FAQs = () => (
  <DocsLayout title="FAQs" description="Commonly asked questions about styled-components">
    <Nesting />
    <ReverseSelectors />
    <ExtendAndStyled />
    <CSSFrameworks />
  </DocsLayout>
)

export default FAQs
