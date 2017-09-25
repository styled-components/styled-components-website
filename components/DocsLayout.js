import React, { Component } from 'react'
import Head from './SeoHead'
import Nav from './Nav'
import { Container, Content, Title } from './Layout'


class DocsLayout extends Component {
  state = {
    isSideFolded: true
  }

  static defaultProps = {
    title: '',
    description: '',
  }

  onSideFold = () => {
    this.setState({ isSideFolded: !this.state.isSideFolded })
  }

  onRouteChange = () => {
    this.setState({ isSideFolded: true })
  }

  render() {
    const { children, title, description } = this.props
    const { isSideFolded } = this.state

    return (
      <Container>

        <Head
          title={`styled-components${title ? `: ${title}` : ''}`}
          description={description}>
            <meta name="robots" content="noodp" />
        </Head>

        <Nav
          isSideFolded={isSideFolded}
          onSideFold={this.onSideFold}
          onRouteChange={this.onRouteChange}
        />

        <Content moveRight={!isSideFolded}>
          <Title>
            {title}
          </Title>

          {children}
        </Content>
      </Container>
    )
  }
}


export default DocsLayout
