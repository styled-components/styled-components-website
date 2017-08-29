import React from 'react'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Primary from '../../sections/api/primary'
import Helpers from '../../sections/api/helpers'
import SupportedCSS from '../../sections/api/supported-css'
import Flow from '../../sections/api/flow'
import TypeScript from '../../sections/api/typescript'

const APIReference = () => (
  <DocsLayout title="API Reference" description="API Reference of styled components">
    <Primary />
    <Helpers />
    <SupportedCSS />
    <Flow />
    <TypeScript />

    <NextPage href="/docs/tooling" title="Tooling" />
  </DocsLayout>
)

export default APIReference
