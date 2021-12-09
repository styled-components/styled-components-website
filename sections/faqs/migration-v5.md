## What do I need to do to migrate to v5?

Ready for this?

```sh
npm install styled-components@^5.0.0 react@^16.8 react-dom@^16.8 react-is@^16.8
```

If you're using React Native, you'll need at least v0.59 (the first version to support hooks.)

_That's it._ 💥

---

styled-components v5 does not introduce any breaking public API changes, and adds the following:

- Total rewrite of the core stylesheet engine, tuned for performance

- New hooks-based component model

- `StyleSheetManager` has new props:
  - `disableCSSOMInjection`
  - `disableVendorPrefixes`
  - `stylisPlugins`
    - try it with [`stylis-plugin-rtl`](https://www.npmjs.com/package/stylis-plugin-rtl) for your bidi needs!

> Note: The subfunction object-form `.attrs({ prop: props => {} })` syntax that was deprecated in v4 is removed in v5. Use function-form attrs instead `.attrs(props => ({}))` (you should have been seeing console warnings to make this update ahead of time.)

Check out the [official announcement post](https://medium.com/styled-components/389747abd987) for more information and to learn about what went into v5!

### For jest users

Update to jest-styled-components v7:

```sh
npm install jest-styled-components@^7.0.0
```

### Note regarding css `@import` and `createGlobalStyle`

At this time we do not recommend using `@import` within cGS due to some issues with how browsers process `@import` via the CSSOM APIs. Instead it's best to place these in your core `index.html` file (generated or static) within a typical `<style>` tag.
