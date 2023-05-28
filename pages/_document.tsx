import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html data-theme="dark" lang="en">
        <Head>
          <link rel="stylesheet" type="text/css" href="/dmvendor.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Karla:wght@200;400;700&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <div className="root">
            <Main />
          </div>

          <NextScript />
        </body>
      </Html>
    );
  }
}
