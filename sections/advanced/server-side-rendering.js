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

  The \`sheet.getStyleTags()\` returns a string of multiple \`<style>\` tags.
  You need to take this into account when adding the CSS string to your HTML output.

  Alternatively the \`ServerStyleSheet\` instance also has a \`getStyleElement()\` method
  that returns an array of React elements.

  > \`sheet.getStyleTags()\` and \`sheet.getStyleElement()\` can only be called after your element is rendered. As a result, components from \`sheet.getStyleElement()\` cannot be combined with \`<YourApp />\` into a larger component.

  ### Next.js

  Basically you need to add a custom \`pages/_document.js\` (if you don't have one). Then
  [copy the logic](https://github.com/zeit/next.js/tree/master/examples/with-styled-components/pages/_document.js)
  for styled-components to inject the server side rendered styles into the \`<head>\`.

  You'll also need to customize the \`.babelrc\` and use \`babel-plugin-styled-components\`.

  Refer to [our example](https://github.com/zeit/next.js/tree/master/examples/with-styled-components) in the Next.js repo for an up-to-date usage example.

  ### Streaming Rendering

  styled-components offers a streaming API for use with [ReactDOMServer.renderToNodeStream()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream). There are two parts to a streaming implementation:

  _On the server:_

  \`ReactDOMServer.renderToNodeStream\` emits a "readable" stream that styled-components wraps. As whole chunks of HTML are pushed onto the stream, if any corresponding styles are ready to be rendered, a style block is prepended to React's HTML and forwarded on to the client browser.

  \`\`\`js
  import { renderToNodeStream } from 'react-dom/server'
  import styled, { ServerStyleSheet } from 'styled-components'

  // if you're using express.js, you'd have access to the response object "res"

  // typically you'd want to write some preliminary HTML, since React doesn't handle this
  res.write('<html><head><title>Test</title></head><body>')

  const Heading = styled.h1\`
    color: red;
  \`

  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<Heading>Hello SSR!</Heading>)
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))

  // you'd then pipe the stream into the response object until it's done
  stream.pipe(res, { end: false })

  // and finalize the response with closing HTML
  stream.on('end', () => res.end('</body></html>'))
  \`\`\`

  _On the client:_

  \`\`\`js
  import { hydrate } from 'react-dom'

  hydrate(
    // your client-side react implementation
  )
  \`\`\`

  After client-side rehydration is complete, styled-components will take over as usual and inject any further dynamic styles after the relocated streaming ones.
`

export default ServerSideRendering
