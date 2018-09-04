import md from 'components/md'

const Installation = () => md`
  ## Installation

  Install styled-components from npm:

  \`\`\`bash
  npm install --save styled-components
  \`\`\`

  > Want to try out the new styled-components v4 beta? It's available now via:
  > \`\`\`bash
  > npm install --save styled-components@beta
  > \`\`\`

  It's highly recommended (but not required) to also use the [styled-components babel plugin](https://github.com/styled-components/babel-plugin-styled-components). It offers many benefits like more legible class names, server-side rendering compatibility, smaller bundles, and more.

  \`\`\`bash
  npm install --save --dev babel-plugin-styled-components
  \`\`\`

  Then make sure the "styled-components" plugin is added to your \`.babelrc\`.

  \`\`\`json
  {
    "presets": ["env", "react"],
    "plugins": ["styled-components"]
  }
  \`\`\`

  > If you don't already have babel set up in your project, their website has an [installation instructions tool](https://babeljs.io/en/setup).
`

export default Installation
