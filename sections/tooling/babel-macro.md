## Babel Macro | v4

[Babel macros](https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros) are quickly gaining steam as a full-featured option to allow advanced code transpilation for zero-config projects like [create-react-app](https://github.com/facebook/create-react-app).

If your scaffold is set up with [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros), then simply use the new `styled-components/macro` import instead of `styled-components`:

```js
import styled from 'styled-components/macro'

const Thing = styled.div`
  color: red;
`
```

The macro incorporates all the functionality of [our babel plugin](/docs/tooling#babel-plugin) while allowing the unejected tooling to handle the Babel part of the build process. Special thanks to [Luc Leray (@lucleray)](https://github.com/lucleray) for making this happen!

### EXPERIMENTAL Config

[`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) uses [`cosmiconfig`](https://www.npmjs.com/package/cosmiconfig) to read a `babel-plugin-macros` configuration which
can be located in any of the following files up the directories from the
importing file:

* `.babel-plugin-macrosrc`
* `.babel-plugin-macrosrc.json`
* `.babel-plugin-macrosrc.yaml`
* `.babel-plugin-macrosrc.yml`
* `.babel-plugin-macrosrc.js`
* `babel-plugin-macros.config.js`
* `babelMacros` in `package.json`

You can then specify the same options as [our babel plugin](/docs/tooling#babel-plugin) in `styledComponents` entry:

```js
// babel-plugin-macros.config.js
module.exports = {
  // ...
  // Other macros config
  styledComponents: {
    pure: true,
  },
}
```

For more information, see [EXPERIMENTAL config for babel-plugin-macros ](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/author.md#config-experimental).
