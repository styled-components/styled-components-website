import { MDXProvider } from '@mdx-js/react';
import components from '../utils/mdx-components';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />

          <meta name="theme-color" content="#da936a" />
          <meta name="author" content="styled-components" />
        </Head>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </>
    );
  }
}
