import React from 'react'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'
import ShowcaseItems from '../../components/ShowcaseItems'

const Tooling = () =>
  <DocsLayout title="Showcase" description="Screenshots of websites that use styled-components">
    <ShowcaseItems />
    <NextPage href="/docs/faqs" title="FAQs" />
  </DocsLayout>

export default Tooling
