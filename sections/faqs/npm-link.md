## How can I fix issues when using `npm link` or `yarn link`?

Local linking can be a useful tool to co-develop projects simultaneously. However, it creates chaotic situations with libraries that are meant to be used as singletons like react and styled-components since each of your local projects likely has a full set of development dependencies downloaded (and bundlers prefer local versions of dependencies by default.)

The solution is to add aliasing. Here's an example config for webpack:

```js
// const path = require('path');

{
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('../node_modules/styled-components')
    }
  }
}
```

This ensures that for your build the same copy of the library will always be used, even across symlinked projects.
