## Animations

CSS animations with `@keyframes` aren't scoped to a single component but you still don't want them to be global. This is why we export a `keyframes` helper which will generate a unique name for your keyframes. You can then use that unique name throughout your app.

This way, you get all the benefits of using JavaScript, are avoiding name clashes and get your keyframes like always:

```react
// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
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
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>&lt; 💅 &gt;</Rotate>
);
```

> Keyframes are not supported by `react-native`. Instead, use the [`ReactNative.Animated` API](https://stackoverflow.com/questions/50891046/rotate-an-svg-in-react-native/50891225#50891225).
