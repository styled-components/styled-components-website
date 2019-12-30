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

## Linking in an SSR SCENARIO.

If you are using the `collectStyles` function on a project with linked components you will end up in a complex scenario. Basically what's happening is that because of v4 new static context API different styled-component modules are now managing their own list of styled-components to render, from the host app it appears as though there's nothing to extract because no styled components have been created in that scope they were created from the linked package scope.

### How do I solve it?

One solution is to add an alias to the `styled-components` module path resolution to always point to the 'host' application. Hopefully there are a bunch of libraries to do that we will use for this example `module-alias`. At the very top of your SSR index file add:

```javascript
const path = require('path');
const moduleAlias = require('module-alias');

moduleAlias.addAlias('styled-components', path.join(__dirname, '../node_modules/styled-components'));
```

This will tell node to resolve all import/require's of styled-components to `__dirname, '../node_modules/styled-components'`
