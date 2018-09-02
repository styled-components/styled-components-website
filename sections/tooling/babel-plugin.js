import md from 'components/md'

const BabelPlugin = () => md`
  ## Babel Plugin | v2

  This plugin adds support for server-side rendering, for minification of
  styles and gives you a nicer debugging experience.

  ### Usage

  Install the babel-plugin first:

  \`\`\`
  npm install --save-dev babel-plugin-styled-components
  \`\`\`

  Then add it to your babel configuration like so:

  > ⚠️ The plugin call order in your \`\`\`.babelrc\`\`\` file matters. If you're using the env property in your babel configuration, then putting this plugin into the plugins array won't suffice. Instead it needs to be put into each env's plugins array to maintain it being executed first. See [this](https://github.com/styled-components/babel-plugin-styled-components/issues/78) for more information.

  \`\`\`js
  {
    "plugins": ["babel-plugin-styled-components"]
  }
  \`\`\`

  ### Server-side rendering

  > This option is turned off by default

  By adding a unique identifier to every styled component this plugin
  avoids checksum mismatches due to different class generation on the
  client and on the server. If you do not use this plugin and try to
  server-side render styled-components React will complain.

  You can enable it with the \`ssr\` option:

  \`\`\`js
  {
    "plugins": [
      ["babel-plugin-styled-components", {
        "ssr": true
      }]
    ]
  }
  \`\`\`

  ### Better debugging

  This options adds the components' name and displayName to the class name
  attached to the DOM node. In your browser's DevTools you'll see:
  \`<button class="Button-asdf123 asdf123" />\`
  instead of just \`<button class="asdf123" />\`.

  This also adds support for showing your components' real name in the
  React DevTools. Consider writing a styled component that renders a
  \`button\` element, called \`MyButton\`. It will
  normally show up as \`<styled.button>\` for all of your
  components, but with this plugin they show
  \`<MyButton />\`.

  This makes it easier to find your components and to figure out where
  they live in your app.

  If you don't need this feature, you can disable it with the
  \`displayName\` option:

  \`\`\`
  {
    "plugins": [
      ["babel-plugin-styled-components", {
        "displayName": false
      }]
    ]
  }
  \`\`\`

  #### Control the components \`displayName\`

  By default, the \`displayName\` of a component will be prefixed with the filename in order to make the component name as unique as possible.

  You can force the component \`displayName\` to be solely the component name by disabling the \`fileName\` option:

  \`\`\`
  {
    "plugins": [
      ["babel-plugin-styled-components", {
        "fileName": false
      }]
    ]
  }
  \`\`\`

  One example you might want to do this, is testing components with enzyme.
  While you can always use \`.find(ComponentName)\` it's definitly possible to search component by it's displayName with \`.find("ComponentName")\`.
  In the latter case you will need to disable the \`fileName\` option. If you do want this for testing only, make sure to add this only under your test environment.

  ### Preprocessing

  > This is experimental and we don't yet know of all limitations and bugs!
  > Consider this non-production ready for now. ⚠️

  This plugin preprocesses your styles with stylis and uses the
  \`no-parser.js\` entrypoint on styled-components.
  This effectively removes stylis from your runtime bundle and should
  slightly improve runtime performance and shrink your bundle size.

  It automatically disables the \`minify\` option, since stylis
  already does some minification on your CSS.

  You can enable preprocessing with the \`preprocess\` option:

  \`\`\`js
  {
    "plugins": [
      ["babel-plugin-styled-components", {
        "preprocess": true
      }]
    ]
  }
  \`\`\`

  ### Minification

  > This option is turned on by default. If you experience mangled CSS
  > results, turn it off and open an issue please.

  This plugin minifies your styles in the tagged template literals, giving
  you big bundle size savings.

  This operation may potentially break your styles in some rare cases, so
  we recommend to keep this option enabled in development if it's enabled
  in the production build.

  You can disable minification with the \`minify\` option:

  \`\`\`js
  {
    "plugins": [
      ["babel-plugin-styled-components", {
        "minify": false
      }]
    ]
  }
  \`\`\`

  ### Template String Transpilation

  We transpile \`styled-components\` tagged template literals down to a
  smaller representation than what Babel normally does,
  because \`styled-components\` template literals don't need to
  be 100% spec compliant.

  Read more about [Tagged Template Literals](/docs/advanced#tagged-template-literals) in
  our dedicated section explaining them.

  You can use the \`transpileTemplateLiterals\` option to turn this feature off.

  \`\`\`js
  {
    "plugins": [
      ["babel-plugin-styled-components", {
        "transpileTemplateLiterals": false
      }]
    ]
  }
  \`\`\`
`

export default BabelPlugin
