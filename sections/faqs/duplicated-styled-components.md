## Why am I getting a warning about several instances of module on the page?

If you are seeing a warning message in the console as the one below, you probably
have several instances of `styled-components` module initialized on the page.

```sh
It looks like there are several instances of "styled-components" initialized in this application.
This may cause dynamic styles not rendering properly, errors happening during rehydration process
and makes you application bigger without a good reason.

If you are using a building tool like Webpack, consider checking your bundle for duplication
of "styled-components" module.
```

This may cause dynamic styles not working properly or even errors during rehydration if
you are using server-side rendering.

### Possible reasons

There are several common reasons for this to happen:

- You have several applications that are using `styled-components` running on the same page
  (e.g., several entry points in Webpack are loaded on the same page)
- You have another `styled-components` library somewhere in your dependencies
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `styled-components`
  module is a dependency in more than one package (this one is more or less the same as the previous one)

### Running multiple applications on one page

If you have several applications running on one page, consider using one `styled-components` module
for all of them. If you are using Webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)
to create an [explicit vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk),
that will contain `styled-components` module:

```diff
  module.exports = {
    entry: {
+     vendor: ["styled-components"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

### Duplicated module in `node_modules`

If you think that the issue is in duplicated `styled-components` module somewhere in your dependencies,
there are several ways to check this. You can use `npm ls styled-components`, `yarn list styled-components`
or `find -L ./node_modules | grep /styled-components/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of
`styled-components`. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer)
or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you
can try to solve it:

If you are using `npm` you can try running `npm dedupe`. This command searches the local dependencies and
tries to simplify the structure by moving common dependencies further up the tree.

> Be aware that `npm dedupe` doesn't work well with symlinked folders (i.e., when you use `npm link`)

If you are using Webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules)
`styled-components` module. You can overwrite the default order in which Webpack will look for your dependencies
and make your application `node_modules` more prioritized than default node module resolution order:

```diff
  resolve: {
+   modules: [path.resolve(appFolder, "node_modules"), "node_modules"],
  }
```

Or you can [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) `styled-components` specifically
to make Webpack always resolve `styled-components` in one place:

```diff
  resolve: {
+   alias: {
+     "styled-components": path.resolve(appFolder, "node_modules", "styled-components"),
+   }
  }
```
