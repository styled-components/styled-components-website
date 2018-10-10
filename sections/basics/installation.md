## Installation

Install styled-components from npm:

```
npm install --save styled-components
```

> Want to try out the new styled-components v4 beta? It's available now via:
>
> ```
> npm install --save styled-components@beta
> ```

It's highly recommended (but not required) to also use the [styled-components babel plugin](https://github.com/styled-components/babel-plugin-styled-components). It offers many benefits like more legible class names, server-side rendering compatibility, smaller bundles, and more.

```
npm install --save-dev babel-plugin-styled-components
```

Then make sure the "babel-plugin-styled-components" plugin is added to your `.babelrc`.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["babel-plugin-styled-components"]
}
```

> If you don't already have babel set up in your project, their website has an [installation instructions tool](https://babeljs.io/en/setup).

### Alternative Installation

If you're not using a module bundler or package manager we also have a global ("UMD") build hosted on the [unpkg](http://unpkg.com) CDN. Simply add the following `<script>` tag to the bottom of your HTML file:

```html
<script src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script>
```

Once you've added `styled-components` you will have access to the global `window.styled` variable.

```js
const Component = window.styled.div`
  color: red;
`
```

> This style of usage requires the [react CDN bundles](https://reactjs.org/docs/cdn-links.html) to be on the page as well (before the styled-components script.)
