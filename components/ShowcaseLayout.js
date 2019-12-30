import React, { Component } from 'react';
import styled from 'styled-components';
import Head from './SeoHead';
import Nav from './Nav';

const Layout = styled.div`
  padding-top: 50px;
  min-height: calc(100vh - 50px);

  @media screen and (max-width: 1000px) {
    padding-top: 90px;
    min-height: calc(100vh - 44px);
  }
`;

class ShowcaseLayout extends Component {
  state = {
    isSideFolded: true,
    isMobileNavFolded: true,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    const { children, title, description } = this.props;

    return (
      <div>
        <Head title={`styled-components${title ? `: ${title}` : ''}`} description={description}>
          <meta name="robots" content="noodp" />
        </Head>

        <Nav showSideNav={false} />

        <Layout>{children}</Layout>
      </div>
    );
  }
}

export default ShowcaseLayout;
