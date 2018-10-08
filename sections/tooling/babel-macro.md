## Babel Macro | v4

[Babel macros](https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros) are quickly gaining steam as a full-featured option to allow advanced code transpilation for zero-config projects like [create-react-app](https://github.com/facebook/create-react-app).

If your scaffold is set up with [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros), then simply use the new `styled-components/macro` import instead of `styled-components`:

```js
import styled from 'styled-components/macro'

const Thing = styled.div`
  color: red;
`
```

The macro incorporates all the functionality of [our babel plugin](/docs/tooling#babel-plugin) while allowing the unejected tooling to handle the Babel part of the build process.
