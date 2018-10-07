## Alternative Installation

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
