import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Nesting from '../../components/faqs/nesting'
import ReverseSelectors from '../../components/faqs/reverse-selectors'

const APIReference = () => (
  <DocsLayout title="FAQ's and Tips & Tricks">
    <Nesting />
    <ReverseSelectors />
  </DocsLayout>
)

export default APIReference
