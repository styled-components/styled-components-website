import React, { Component } from 'react';
import styled from 'styled-components';
import Head from './SeoHead';
import Nav from './Nav';

const Layout = styled.div`
  padding-top: 50px;

  @media screen and (max-width: 1100px) {
    padding-top: 90px;
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
