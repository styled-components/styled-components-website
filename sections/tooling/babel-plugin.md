## Babel Plugin

This plugin adds support for server-side rendering, minification of styles, and a nicer debugging experience.

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

By adding a unique identifier to every styled component, this plugin avoids checksum mismatches due to different class generation on the client and on the server. If you do not use this plugin and try to server-side render styled-components React will complain with an HTML attribute mismatch warning during rehydration.

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

This option enhances the attached CSS class name on each component with richer output to help identify your components in the DOM without React DevTools. In your page source you'll see: `<button class="Button-asdf123 asdf123" />` instead of just `<button class="asdf123" />`.

It also allows you to see the component's `displayName` in React DevTools. For example, consider writing a styled component that renders a `button` element, called `MyButton`. It will normally show up in DevTools as `styled.button`, but with the `displayName` option enabled, it has the name you gave it: `MyButton`.

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

One example you might want to do this, is testing components with enzyme. While you can always use `.find(ComponentName)` it's definitely possible to search component by its displayName with `.find("ComponentName")`. In the latter case you will need to disable the `fileName` option. If you do want this for testing only, make sure to add this only under your test environment.

### Minification

Two types of minifications are performed by this plugin: one removes all whitespace & comments from your CSS and the other [transpiles tagged template literals](#template-string-transpilation), keeping valuable bytes out of your bundles.

If desired, you can disable this behavior via babel configuration:

```js
{
  "plugins": [
    ["babel-plugin-styled-components", {
      "minify": false,
      "transpileTemplateLiterals": false
    }]
  ]
}
```

### Dead Code Elimination

Due to how styled components are transpiled and constructed, by default minifiers cannot properly perform dead code elimination on them because they are assumed to have side effects. However, there is a feature that can be enabled to aid this process called "pure annotation".

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

This plugin transpiles `styled-components` tagged template literals down to a smaller representation than what Babel normally creates.

_Wait, transpiling tagged template literals? Doesn't Babel do this natively?_ 🤔
With Babel, you're likely transpiling ES2015+ JavaScript to ES5-compliant code for older browser support. The most popularly recommended base Babel presets (`es2015` / `env` / `latest`) include the `babel-plugin-transform-es2015-template-literals` transform to make tagged template literals work in older browsers, but there is a caveat: output of that transform is quite verbose. It's done this way to meet specification requirements.

Here's an example of the transpiled code processed with `babel-preset-latest`:

```js
var _templateObject = _taggedTemplateLiteral(['width: 100%;'], ['width: 100%;'])
function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }))
}
var Simple = _styledComponents2.default.div(_templateObject)
```

`styled-components` does not require full spec compatibility. Our Babel plugin will transpile template literals attached to styled components to a slightly different, smaller form which still works in older browsers but has a much smaller footprint.

Here's the previous example with the styled-components babel plugin on and the `{ transpileTemplateLiterals: true }` option:

```js
var Simple = _styledComponents2.default.div(['width: 100%;'])
```

The plugin is also smart enough to not modify tagged template literals belonging to other libraries and use cases:

````js
// Following will be converted:
styled.div``
keyframe``
css```some text` // But this will not be converted:

// Here the outer template literal will be converted
// because it's attached to the component factory,
// but the inner template literals will not be touched:
styled.div`
  color: ${light ? `white` : `black`};
`
````

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

### Namespace

The namespace will ensure that your class names will be unique; this setting is handy when you are working with micro frontends where class name collision can occur.

If desired, you can enable this behavior via babel configuration:

```js
{
  "plugins": [
    ["babel-plugin-styled-components", {
      "namespace": "my-app"
    }]
  ]
}
```

Here's an example of the transpiled code processed with `namespace` enabled:

```js
_styledComponents2.default.div.withConfig({
  displayName: 'code__before',
  componentId: 'my-app__sc-3rfj0a-1',
})(['color:blue;'])
```

> ⚠️ This feature is available from version **_1.11_**.
