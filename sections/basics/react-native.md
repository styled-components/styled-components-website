## React Native

styled-components can be used with React Native in the same way and with the
same import. Try this example with [Snack by Expo](https://snack.expo.io/@danielmschmidt/styled-components).

```jsx
import React from 'react'
import styled from 'styled-components/native'

const StyledView = styled.View`
  background-color: papayawhip;
`

const StyledText = styled.Text`
  color: palevioletred;
`

class MyReactNativeComponent extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledText>Hello World!</StyledText>
      </StyledView>
    )
  }
}
```

We also support more complex styles (like `transform`), which would normally
be an array, and shorthands (e.g. for `margin`) thanks to
[`css-to-react-native`](https://github.com/styled-components/css-to-react-native)!

> Note that the `flex` property works like CSS shorthand, and not the legacy
> `flex` property in React Native. Setting `flex: 1` sets `flexShrink`
> to `1` in addition to setting `flexGrow` to `1` and `flexBasis` to `0`.

Imagine how you'd write the property in React Native, guess how you'd transfer
it to CSS, and you're probably right:

```jsx
const RotatedBox = styled.View`
  transform: rotate(90deg);
  text-shadow-offset: 10px 5px;
  font-variant: small-caps;
  margin: 5px 7px 2px;
`
```

Some of the differences to the web-version are, that you cannot use the
`keyframes` and `createGlobalStyle` helpers since React Native doesn't support
keyframes or global styles. We will also warn you if you use media queries or
nest your CSS.

> In v2 we support percentages. To make this possible we need to enforce units
> for all shorthands. If you're migrating to v2,
> [a codemod is available](https://github.com/styled-components/styled-components-native-code-mod).

### Simpler usage with the metro bundler

If you'd prefer to just import `styled-components` instead of `styled-components/native`, you can add a [`resolverMainFields` configuration](https://facebook.github.io/metro/docs/configuration#resolvermainfields) that includes `"react-native"`. This used to be supported in metro by default (and currently does work in haul) but appears to have been removed at some point.
