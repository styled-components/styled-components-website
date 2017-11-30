import md from 'components/md'

const TargetedStyles = () => md`
  ## Targeted Styles | v2

  styled-components generates and injects a stylesheet at the end of the \`document.head\` during runtime.
  For the most part, this approach should be fine. However, there are scenarios where multiple instances of styled-components could conflict with stylesheet rehydration. 

  In these cases, appending stylesheets onto a specific DOM target may be necessary to avoid these problems. 
  This is useful for applications with iframes, shadow DOMs, or pages with 1st or 3rd party applications running their own instance of styled-components.
  
  We expose this through the \`StyleSheetManager\`:
  
  \`\`\`jsx
  import ReactDOM from 'react-dom'
  import { StyleSheetManager } from 'styled-components'

  const target = document.getElementById('app')
  ReactDOM.render(
    <StyleSheetManager target={target}>
      <YourApp />
    </StyleSheetManager>,
    target
  )
  \`\`\`

  The \`StyleSheetManager\` wraps your application with a provided DOM target on the client-side.
  A style tag is generated and injected at the bottom of your target with the classes from your \`StyledComponents\` within your application.  
  
  ### Server side rendering targeted styles

  In order to append your styles on a target through server side rendering, first follow the [Server Side Rendering](/docs/advanced#server-side-rendering) section.
  Once you have your generated styles from \`sheet.getStyleTags()\` or \`sheet.getStyleElement\`, embed your markup with the styles to the appropriate DOM \`target\`.

  \`\`\`html
  <!doctype html>
  <html>
    <head>
    </head>
    <body>
      <div id="app">
        <!- inject styles here ->
      </div>
    </body>
  </html>
  \`\`\`
`

export default TargetedStyles
