import React from 'react'
import DocsLayout from '../../components/DocsLayout'

import Primary from '../../sections/api/primary'
import Helpers from '../../sections/api/helpers'
import SupportedCSS from '../../sections/api/supported-css'
import Flow from '../../sections/api/flow'
import TypeScript from '../../sections/api/typescript'

const APIReference = () => (
  <DocsLayout title="API Reference">
    <Primary />
    <Helpers />
    <SupportedCSS />
    <Flow />
    <TypeScript />
  </DocsLayout>
)

export default APIReference
