import md from '../md'

const Flow = () => md`
  ## Flow

  styled-components has first-class [Flow](https://flowtype.org) support to help
  you find typing errors while using our public API.

  To use Flow with the public api of styled-components we recommend that you use the library definition in \`flow-typed\`.
  To install it you can use the \`flow-typed\` cli or download it manually from the git repository and store it in
  a \`flow-typed/\` folder in the same directory with your \`flowconfig\`.

  ### Installing the definitions

  \`\`\`
  npm i -g flow-typed # if you do not already have flow-typed
  flow-typed install styled-components@<version>
  \`\`\`

  > If you are on npm >= 5.2 you could simply use [npx](https://github.com/zkat/npx)

  ### Ignore styled-components source

  You should add the following lines to your \`.flowconfig\`, if you run into Flow errors, coming from the styled-components
  package in your \`node_modules\` directory.

  \`\`\`
  [ignore]
  .*/node_modules/styled-components/.*
  \`\`\`
`

export default Flow
