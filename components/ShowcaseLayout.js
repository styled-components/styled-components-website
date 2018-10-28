import React, { Component } from 'react';
import Head from './SeoHead';
import Nav from './Nav';

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

        <div style={{ paddingTop: 90 }}>{children}</div>
      </div>
    );
  }
}

export default ShowcaseLayout;
