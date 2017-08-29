import React from 'react'
import Head from './SeoHead'
import Navbar from './Navbar'
import { Container, Content, Title } from './Layout'

const DocsLayout = ({ children, title="", description="" }) => (
  <Container>

    <Head
      title={`styled-components ${title}`}
      description={description}>
        <meta name="robots" content="noodp" />
    </Head>

    <Navbar />

    <Content>
      <Title>
        {title}
      </Title>

      {children}
    </Content>
  </Container>
)

export default DocsLayout
