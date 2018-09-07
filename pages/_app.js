import App, {Container} from 'next/app'
import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import components from '../utils/mdx-components'


export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Container>
  }
}
