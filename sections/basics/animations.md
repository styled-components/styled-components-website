## Animations

CSS animations with `@keyframes` aren't scoped to a single component but you still don't want them to be global to avoid name collisions. This is why we export a `keyframes` helper which will generate a unique instance that you can use throughout your app:

```react
// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>&lt; 💅🏾 &gt;</Rotate>
);
```

> Keyframes are not supported by `react-native`. Instead, use the [`ReactNative.Animated` API](https://stackoverflow.com/questions/50891046/rotate-an-svg-in-react-native/50891225#50891225).

Keyframes are lazily injected when they're used, which is how they can be code-splitted, so you have to use [the `css` helper](/docs/api#css) for shared style fragments:

```javascript
const rotate = keyframes``

// ❌ This will throw an error!
const styles = `
  animation: ${rotate} 2s linear infinite;
`

// ✅ This will work as intended
const styles = css`
  animation: ${rotate} 2s linear infinite;
`
```

> This used to work in v3 and below where we didn't code-split keyframes. If you're upgrading from v3, make sure that all your shared style fragments are using the `css` helper!
