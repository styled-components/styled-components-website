import md from 'components/md'

const DuplicatedStyledComponents = () => md`
  ## Why am I getting a warning about several instances of 'styled-components' on the page?

  If you are seeing a warning message in the console as the one below, you probably
  have several instances of \`styled-components\` module initialized on the page.
  
  \`\`\`sh
  It looks like there are several instances of 'styled-components' initialized in this application. 
  This may cause dynamic styles not rendering properly, errors happening during rehydration process 
  and makes you application bigger without a good reason.

  If you are using a building tool like webpack, consider checking your bundle for duplication 
  of 'styled-components' module.
  \`\`\`

  This may cause dynamic styles not working properly or even errors during rehydration if 
  you are using server side rendering. 

  There are several common reasons for this to happen:

  - You have another \`styled-components\` library somewhere in your dependencies
  - You have a monorepo (or monorepo-like) structure in your project and \`styled-components\` module
    is a dependency in more than one package
  - You have several applications running on the same page (e.g., several entry points in webpack are 
    loaded on the same page)
`

export default DuplicatedStyledComponents