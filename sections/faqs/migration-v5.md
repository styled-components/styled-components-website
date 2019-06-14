## What do I need to do to migrate to v5?

Ready for this?

```sh
npm install styled-components@beta react@^16.8 react-dom@^16.8 react-is@^16.8
```

_That's it._ 💥

styled-components v5 does not introduce any breaking public API changes, and adds the following:

- Total rewrite of the core stylesheet engine, tuned for performance

- New hooks-based component model

- `StyleSheetManager` has new props:
  - `disableCSSOMInjection`
  - `stylisOptions`
  - `stylisPlugins`

> Note: The object-form `.attrs({})` syntax that was deprecated in v4 is removed in v5. Use function-form attrs instead `.attrs(props => ({}))` (you should have been seeing console warnings to make this update ahead of time.)
