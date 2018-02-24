import md from 'components/md'

const SyntaxHighlighting = () => md`
  ## Syntax Highlighting

  The one thing you used to lose when writing CSS in template literals is syntax highlighting. We're working hard on making proper syntax highlighting happening in all editors. We currently have support for Atom, Visual Studio Code, WebStorm, and soon Sublime Text.

This is what it looks like when properly highlighted:

<img alt="Syntax highlighted styled component" src="https://imgur.com/k7h45c3.jpg" height="250px" />

### Atom

[**@gandm**](https://github.com/gandm), the creator of \`language-babel\`, has added support for \`styled-components\` in Atom!

To get proper syntax highlighting, all you have to do is install and use the \`language-babel\` package for your JavaScript files!

### Sublime Text

There is an [open PR](https://github.com/babel/babel-sublime/pull/289) by [@garetmckinley](https://github.com/garetmckinley) to add support for \`styled-components\` to \`babel-sublime\`! (if you want the PR to land, feel free to 👍 the initial comment to let the maintainers know there's a need for this!)

As soon as that PR is merged and a new version released, all you'll have to do is install and use \`babel-sublime\` to highlight your JavaScript files!

### Visual Studio Code

[**@gandm**](https://github.com/gandm)'s language-babel has been ported to VSCode under the name [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) by [Michael McDermott](https://twitter.com/michaelgmcd). It provides the same all-in-one solution for Babel syntax highlighting with styled-components included.

If you would like to keep your current JavaScript syntax highlighting, you can use the [vscode-styled-components](https://github.com/styled-components/vscode-styled-components) extension to provide styled-components syntax highlighting inside your Javascript files. You can install it as usual from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components).

### VIM / NeoVim

The [\`vim-styled-components\`](https://github.com/fleischie/vim-styled-components) plugin gives you syntax highlighting inside your Javascript files. Install it with your usual plugin manager like [Plug](https://github.com/junegunn/vim-plug), [Vundle](https://github.com/VundleVim/Vundle.vim), [Pathogen](https://github.com/tpope/vim-pathogen), etc.

Also if you're looking for an awesome javascript syntax package you can never go wrong with [YAJS.vim](https://github.com/othree/yajs.vim).

### WebStorm, IntelliJ IDEA, PhpStorm, PyCharm, and RubyMine

The [\`webstorm-styled-components\`](https://github.com/styled-components/webstorm-styled-components) plugin adds code completion and highlighting for CSS properties and values in the template strings. And it also provides code completion and navigation for JavaScript symbols in the interpolations. You can install it from the IDE: go to \`Preferences | Plugins\` and search for \`Styled Components\`.

### Other Editors

We could use your help to get syntax highlighting support to other editors! All these syntax highlighting were built by the Styled Components community so if you want to start working on syntax highlighting for your editor, we would love to see it.
`

export default SyntaxHighlighting
