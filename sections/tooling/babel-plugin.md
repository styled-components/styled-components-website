## Babel Plugin

This plugin adds support for server-side rendering, for minification of styles and gives you a nicer debugging experience.

### Usage

Install the babel-plugin first:

```
npm install --save-dev babel-plugin-styled-components
```

Then add it to your babel configuration like so:

> ⚠️ The plugin call order in your `.babelrc` file matters. If you're using the env property in your babel configuration, then putting this plugin into the plugins array won't suffice. Instead it needs to be put into each env's plugins array to maintain it being executed first. See [this](https://github.com/styled-components/babel-plugin-styled-components/issues/78) for more information.

```js
{
  "plugins": ["babel-plugin-styled-components"]
}
```

### Server-side rendering

> This option is turned on by default as of v1.6.

By adding a unique identifier to every styled component this plugin avoids checksum mismatches due to different class generation on the client and on the server. If you do not use this plugin and try to server-side render styled-components React will complain.

You can disable it if necessary with the `ssr` option:

```json
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": false
      }
    ]
  ]
}
```

### Better debugging

This options adds the components' name and displayName to the class name attached to the DOM node. In your browser's DevTools you'll see: `<button class="Button-asdf123 asdf123" />` instead of just `<button class="asdf123" />`.

This also adds support for showing your components' real name in the React DevTools. Consider writing a styled component that renders a `button` element, called `MyButton`. It will normally show up as `<styled.button>` for all of your components, but with this plugin they show `<MyButton />`.

This makes it easier to find your components and to figure out where they live in your app.

If you don't need this feature, you can disable it with the `displayName` option:

```json
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "displayName": false
      }
    ]
  ]
}
```

#### Control the components `displayName`

By default, the `displayName` of a component will be prefixed with the filename in order to make the component name as unique as possible.

You can force the component `displayName` to be solely the component name by disabling the `fileName` option:

```json
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "fileName": false
      }
    ]
  ]
}
```

One example you might want to do this, is testing components with enzyme. While you can always use `.find(ComponentName)` it's definitly possible to search component by it's displayName with `.find("ComponentName")`. In the latter case you will need to disable the `fileName` option. If you do want this for testing only, make sure to add this only under your test environment.

### Minification

> This option is turned on by default. If you experience mangled CSS
> results, turn it off and open an issue please.

This plugin does two _minifications_, one is taking all the whitespace & comments out of your CSS, and the other is [transpiling tagged template literals](#template-string-transpilation) - giving you big bundle size savings.

This operation may potentially break your styles in some rare cases, so we recommend to keep this option enabled in development if it's enabled in the production build.

You can disable the CSS minification with the `minify` option:

```js
{
  "plugins": [
    ["babel-plugin-styled-components", {
      "minify": false
    }]
  ]
}
```

### Dead Code Elimination | v1.7

Due to how styled components are transpiled and constructed, by default minifiers cannot properly perform dead code elimination on them. However, there is a feature that can be enabled to aid this process called "pure annotation".

```js
{
  "plugins": [
    ["babel-plugin-styled-components", {
      "pure": true
    }]
  ]
}
```

It utilizes a babel helper to tag each styled component and library helper with the `#__PURE__` JS comment that some minifiers use to overcome the aforementioned issue.

### Template String Transpilation

This plugin transpiles `styled-components` tagged template literals down to a smaller representation than what Babel normally does.

Wait, transpiling tagged template literals? Doesn't Babel do this natively? 🤔

You're currently using Babel to transpile your ES2015 JavaScript to ES5-compliant code. One of your presets (`es2015`/`env`/`latest`) includes the `babel-plugin-transform-es2015-template-literals` transform to make tagged template literals work in older browsers, but there is a caveat. Output of that plugin is quite wordy. It's done this way to meet specification requirements.

Here's an example of the transpiled code processed with `babel-preset-latest`:

```js
var _templateObject = _taggedTemplateLiteral(['width: 100%;'], ['width: 100%;'])
function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }))
}
var Simple = _styledComponents2.default.div(_templateObject)
```

`styled-components` styling code does not require full spec compatibility. This plugin will transpile template literals attached to styled-component to a slightly different form which still works in older browsers but has a much smaller footprint.

Now here's an example of the code including `babel-plugin-styled-components` with the `{ transpileTemplateLiterals: true }` option:

```js
var Simple = _styledComponents2.default.div(['width: 100%;'])
```

Take a note that it will keep other template literals not related to styled-components as is:

```js
// Following will be converted:
styled.div``
keyframe``
css``// But this will not be converted:
`some text`

// Here the outer template literal will be converted
// because it's attached to the component factory,
// but the inner template literals will not be touched:
styled.div`
  color: ${light ? `white` : `black`};
`
```

You can disable this feature with the `transpileTemplateLiterals` option:

```json
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "transpileTemplateLiterals": false
      }
    ]
  ]
}
```

Read more about [Tagged Template Literals](/docs/advanced#tagged-template-literals) in
our dedicated section explaining them.
