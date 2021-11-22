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

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WDWNSLK');`,
            }}
          />
        </Head>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </>
    );
  }
}
