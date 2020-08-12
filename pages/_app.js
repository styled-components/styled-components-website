import { MDXProvider } from '@mdx-js/react';
import components from '../utils/mdx-components';
import App from 'next/app';
import React from 'react';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    );
  }
}
