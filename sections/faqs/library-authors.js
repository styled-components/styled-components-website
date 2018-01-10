import md from 'components/md'

const LibraryAuthors = () => md`
  ## I am a library author. Should I bundle \`styled-components\` with my library?

  If you are a library author we recommend that you should not bundle \`styled-components\` 
  module with your library. Instead, mark it as external dependency during your library build, 
  move it from \`dependencies\` to \`devDependencies\` and include it to your \`peerDependencies\` 
  list in your \`package.json\` file:

  \`\`\`diff
    {
  -   "dependencies" : {
  +   "devDependencies" : {
        "styled-components": "^2.4.0"
      },
  +   "peerDependencies" : {
  +     "styled-components": "^2.4.0"
  +   }
    }
  \`\`\`
`

export default LibraryAuthors
