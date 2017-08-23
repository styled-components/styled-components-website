import md from '../md'

const ReactNative = () => md`
  ## React Native

  styled-components can be used with React Native in the same way,
  except you import it from \`styled-components/native\` instead.

  \`\`\`jsx
  import styled from 'styled-components/native';

  const StyledView = styled.View\`
    background-color: papayawhip;
  \`;

  const StyledText = styled.Text\`
    color: palevioletred;
  \`;

  class MyReactNativeComponent extends React.Component {
    render() {
      return (
        <StyledView>
          <StyledText>Hello World!</StyledText>
        </StyledView>
      )
    }
  }
  \`\`\`

  We also support more complex styles (like \`transform\`), which would normally be an array,
  and shorthands (e.g. for \`margin\`) thanks to \`css-to-react-native\`!

  Imagine how you'd write the property in React Native, guess how you'd transfer
  it to CSS, and you're probably right:

  \`\`\`jsx
  const RotatedBox = styled.View\`
    transform: rotate(90deg);
    text-shadow-offset: 10px 5px;
    font-variant: small-caps;
    margin: 5px 7px 2px;
  \`;
  \`\`\`

  Some of the differences to the web-version are, that you cannot use
  the \`keyframes\` and \`injectGlobal\` helpers since React Native doesn't
  support keyframes or global styles. We will also warn you if you use media queries or nest your CSS.

  > In v2 we support percentages. To make this possible we need to enforce units for all shorthands.
  > If you're migrating to v2,
  > [a codemod is available](https://github.com/styled-components/styled-components-native-code-mod).
`

export default ReactNative
