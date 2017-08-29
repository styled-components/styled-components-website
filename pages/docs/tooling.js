import React from 'react'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import BabelPlugin from '../../sections/tooling/babel-plugin'
import TestUtilities from '../../sections/tooling/test-utilities'

const Tooling = () =>
  <DocsLayout title="Tooling" description="Additional Tools for styled-components, babel plugin, testing">
    <BabelPlugin />
    <TestUtilities />

    <NextPage href="/docs/faqs" title="FAQs" />
  </DocsLayout>

export default Tooling
