import md from '../md'

const ServerSideRendering = () => md`
  ## Server Side Rendering | v2

  styled-components supports concurrent server side rendering, with stylesheet rehydration.
  The basic idea is that everytime you render your app on the server, you can create
  a \`ServerStyleSheet\` and add a provider to your React tree, that accepts styles
  via a context API.

  This doesn't interfere with global styles, such as \`keyframes\` or \`injectGlobal\` and
  allows you to use styled-components with React DOM's SSR, or even Rapscallion.

  The basic API goes as follows:

  \`\`\`jsx
  import { renderToString } from 'react-dom/server'
  import { ServerStyleSheet } from 'styled-components'

  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<YourApp />))
  const styleTags = sheet.getStyleTags() // or sheet.getStyleElement()
  \`\`\`

  The \`collectStyles\` method wraps your element in a provider. Optionally you can use
  the \`StyleSheetManager\` provider directly, instead of this method. Just make sure not to
  use it on the client-side.

  \`\`\`jsx
  import { renderToString } from 'react-dom/server'
  import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

  const sheet = new ServerStyleSheet()
  const html = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <YourApp />
    </StyleSheetManager>
  )

  const styleTags = sheet.getStyleTags() // or sheet.getStyleElement()
  \`\`\`

  The \`sheet.getStyleTags()\` returns a string of multiple \`&lt;style&gt;\` tags.
  You need to take this into account when adding the CSS string to your HTML output.

  Alternatively the \`ServerStyleSheet\` instance also has a \`getStyleElement()\` method
  that returns an array of React elements.

  ### Next.js

  In Next.js, you will need to structure your \`_document.js\` file differently, than
  the provided example in their repository for v1.

  \`\`\`jsx
  import Document, { Head, Main, NextScript } from 'next/document'
  import { ServerStyleSheet } from 'styled-components'

  export default class MyDocument extends Document {
    render() {
      const sheet = new ServerStyleSheet()
      const main = sheet.collectStyles(<Main />)
      const styleTags = sheet.getStyleElement()

      return (
        <html>
          <Head>
            {/* ... */}

            {styleTags}
          </Head>

          <body>
            <div className="root">
              {main}
            </div>

            <NextScript />
          </body>
        </html>
      )
    }
  }
  \`\`\`

  Here we're wrapping the \`Main\` component, which contains the Next.js app, and are using this
  to extract the styles on the server side.

  > This is unfortunately only a workaround! It will accumulate rules over time, so you will need
  > to cache the SSR response to mitigate this for now.
`

export default ServerSideRendering
