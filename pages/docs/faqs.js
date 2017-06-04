import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../components/faqs/nesting'
import ReverseSelectors from '../../components/faqs/reverse-selectors'

const FAQs = () => (
  <DocsLayout title="FAQs">
    <Nesting />
    <ReverseSelectors />
  </DocsLayout>
)

export default FAQs