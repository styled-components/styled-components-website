import md from 'components/md'

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

  Basically you need to add a custom \`pages/_document.js\` (if you don't have one). Then 
  [copy the logic](https://github.com/zeit/next.js/tree/master/examples/with-styled-components/pages/_document.js)
  for styled-components to inject the server side rendered styles into the \`<head>\`.
  
  You'll also need to customize the \`.babelrc\` and use \`babel-plugin-styled-components\`.

  Refer to [our example](https://github.com/zeit/next.js/tree/master/examples/with-styled-components) in the Next.js repo for an up-to-date usage example.
`

export default ServerSideRendering
