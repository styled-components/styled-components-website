## How do I fix flickering text after server side rendering?

When using global styling APIs like [`createGlobalStyle`](/docs/api#createglobalstyle) or the former [`injectGlobal`](/docs/api#injectglobal), adding and removing certain styles from the DOM like `@font-face` definitions can cause momentary flickering of text on the page. This typically happens during the rehydration phase of server-side rendering. We're still tweaking how these behaviors work to avoid the issue long-term.

However, there is a CSS solution to the problem in the [`font-display` CSS rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display). By setting the rule to "fallback" mode, once a font has been loaded it will not be reloaded. This eliminates the flicker.

```css
@font-face {
  font-family: 'Foo';
  src: url('/path/to/foo.woff') format('woff');
  font-style: normal;
  font-weight: 400;
  font-display: fallback; /* <- this can be added to each @font-face definition */
}
```
