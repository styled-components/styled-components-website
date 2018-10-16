## Installation

Installing styled-components only takes a single command and you're ready to roll:

```
npm install --save styled-components
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

> This style of usage requires the [react CDN bundles](https://reactjs.org/docs/cdn-links.html) to be on the page as well (before the styled-components script.)

</details>
