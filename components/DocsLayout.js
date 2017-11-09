import React, { Component } from 'react'
import Head from './SeoHead'
import Nav from './Nav'
import { Container, Content, Title } from './Layout'


class DocsLayout extends Component {
  state = {
    isSideFolded: true,
    isMobileNavFolded: true
  }

  static defaultProps = {
    title: '',
    description: '',
  }

  onSideToggle = () => {
    this.setState({
      isSideFolded: !this.state.isSideFolded,
      isMobileNavFolded: true,
    })
  }

  onMobileNavToggle = () => {
    this.setState({
      isMobileNavFolded: !this.state.isMobileNavFolded,
      isSideFolded: true,
    })
  }

  onRouteChange = () => {
    this.setState({ isSideFolded: true, isMobileNavFolded: true })
  }

  render() {
    const { children, title, description } = this.props
    const { isSideFolded, isMobileNavFolded } = this.state

    return (
      <Container>

        <Head
          title={`styled-components${title ? `: ${title}` : ''}`}
          description={description}>
            <meta name="robots" content="noodp" />
        </Head>

        <Nav
          isSideFolded={isSideFolded}
          isMobileNavFolded={isMobileNavFolded}
          onSideToggle={this.onSideToggle}
          onMobileNavToggle={this.onMobileNavToggle}
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
