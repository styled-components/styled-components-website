import React, { Component } from 'react';
import styled from 'styled-components';
import { RssFeed as FeedIcon } from '@styled-icons/material';
import Head from './SeoHead';
import Link from './Link';
import Nav from './Nav';
import { Container, Content, Title } from './Layout';

class DocsLayout extends Component {
  state = {
    isSideFolded: true,
    isMobileNavFolded: true,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  onSideToggle = () => {
    this.setState({
      isSideFolded: !this.state.isSideFolded,
      isMobileNavFolded: true,
    });
  };

  onMobileNavToggle = () => {
    this.setState({
      isMobileNavFolded: !this.state.isMobileNavFolded,
      isSideFolded: true,
    });
  };

  onRouteChange = () => {
    this.setState({ isSideFolded: true, isMobileNavFolded: true });
  };

  render() {
    const { children, title, description, useDocsSidebarMenu = true, pages, feedLink } = this.props;
    const { isSideFolded, isMobileNavFolded } = this.state;
    const prefixedTitle = `styled-components${title ? `: ${title}` : ''}`;

    return (
      <Container>
        <Head title={prefixedTitle} description={description}>
          <meta name="robots" content="noodp" />
          {feedLink && <link rel="alternate" type="application/atom+xml" title={prefixedTitle} href={feedLink} />}
        </Head>

        <Nav
          useDocsSidebarMenu={useDocsSidebarMenu}
          isSideFolded={isSideFolded}
          isMobileNavFolded={isMobileNavFolded}
          pages={pages}
          onSideToggle={this.onSideToggle}
          onMobileNavToggle={this.onMobileNavToggle}
          onRouteChange={this.onRouteChange}
        />

        <Content moveRight={!isSideFolded} data-e2e-id="content">
          <TitleRow>
            <Title>{title}</Title>
            {feedLink && (
              <FeedLink inline target="__blank" href={feedLink}>
                <FeedIcon />
              </FeedLink>
            )}
          </TitleRow>

          {children}
        </Content>
      </Container>
    );
  }
}

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  ${() => FeedLink} {
    flex-shrink: 0;
  }
`;

const FeedLink = styled(Link)`
  width: 1.5em;
`;

export default DocsLayout;
