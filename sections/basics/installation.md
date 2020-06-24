## Installation

Installing styled-components only takes a single command and you're ready to roll:

```
npm install --save styled-components
```

If you use a package manager like [yarn](https://yarnpkg.com/) that supports the "resolutions" package.json field, we also highly recommend you add an entry to it as well corresponding to the major version range. This helps avoid an entire class of problems that arise from multiple versions of styled-components being installed in your project.

In `package.json`:

```json
{
  "resolutions": {
    "styled-components": "^5"
  }
}
```

> It's highly recommended (but not required) to also use the [Babel plugin](/docs/tooling#babel-plugin). It offers many benefits like more legible class names, server-side rendering compatibility, smaller bundles, and more.

<details>
  <summary>Click here to see alternative CDN installation instructions</summary>

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

> This style of usage requires the [react CDN bundles](https://reactjs.org/docs/cdn-links.html) and the [`react-is` CDN bundle](https://unpkg.com/react-is/umd/react-is.production.min.js) to be on the page as well (before the styled-components script.)

</details>
