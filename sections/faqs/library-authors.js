import md from 'components/md'

const LibraryAuthors = () => md`
  ## I am a library author. Should I bundle \`styled-components\` with my library?

  If you are a library author, we recommend that you should not bundle and ship \`styled-components\`
  module with your library. There are two steps that you need to do to achieve this:

  - Marking \`styled-components\` as external in your package dependencies
  - Removing \`styled-components\` from your library bundle

  ### Marking \`styled-components\` as external in your package dependencies

  To do this, you will need to move it from \`dependencies\` to [\`devDependencies\`](https://docs.npmjs.com/files/package.json#devdependencies)
  and include it in the [\`peerDependencies\`](https://docs.npmjs.com/files/package.json#peerdependencies)
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

  Moving \`styled-components\` to \`devDependencies\` will guarantee that it wouldn't be installed along with your
  library (\`npm install\` or \`yarn add\` will ignore \`devDependencies\` when a library is installed).

  Adding \`styled-components\` to \`peerDependencies\` will signal your library consumers that \`styled-components\`
  is not included with the library and they need to install it themselves.

  ### Removing \`styled-components\` from your library bundle

  If you are bundling your library before shipping it, make sure that you are not bundling \`styled-components\` along with
  it. Here are some examples of how to do this with some popular module bundling tools:

  #### With Microbundle

  If you are using [Microbundle](https://github.com/developit/microbundle), it will handle this step automatically.
  Microbundle treats every dependency in the \`peerDependencies\` list as external and excludes it from the build for you.

  #### With Rollup.js

  If you are using [Rollup.js](https://rollupjs.org), you should provide an [\`external\`](https://rollupjs.org/guide/en#big-list-of-options)
  option in your config:

  \`\`\`diff
    export default {
      entry: "my-awesome-library.js",
  +   external: [
  +     "styled-components"
  +   ]
    }
  \`\`\`

  #### With Webpack

  If you are using [Webpack](https://webpack.js.org), you should provide an [\`externals\`](https://webpack.js.org/configuration/externals/)
  option in your config:

  \`\`\`diff
    modules.export = {
      entry: "my-awesome-library.js",
  +   externals: {
  +     "styled-components": {
  +       commonjs: "styled-components",
  +       commonjs2: "styled-components",
  +       amd: "styled-components",
  +     },
  +   },
    }
  \`\`\`

  > You can find more useful information on how to bundle a library with Webpack at
  > ["Authoring Libraries"](https://webpack.js.org/guides/author-libraries/) section of Webpack documentation.
`

export default LibraryAuthors
