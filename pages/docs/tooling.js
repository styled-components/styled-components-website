import React from 'react'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import BabelPlugin from '../../sections/tooling/babel-plugin'
import TestUtilities from '../../sections/tooling/test-utilities'
import StylelintProcessor from '../../sections/tooling/stylelint-processor'
import StylelintConfig from '../../sections/tooling/stylelint-config'

const Tooling = () =>
  <DocsLayout title="Tooling">
    <BabelPlugin />
    <TestUtilities />
    <StylelintProcessor />
    <StylelintConfig />

    <NextPage href="/docs/faqs" title="FAQs" />
  </DocsLayout>

export default Tooling
