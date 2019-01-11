## TypeScript

styled-components has community-organized [TypeScript definitions](https://www.npmjs.com/package/@types/styled-components) from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) to allow the library to be used in any TypeScript project. To install them, run:

```
npm install @types/styled-components
```

A basic example of usage can be found [here](https://github.com/patrick91/Styled-Components-Typescript-Example).

> Now that Babel 7 is out and the [TypeScript preset](https://babeljs.io/docs/en/babel-preset-typescript) is available, it's now possible to use the [styled-components babel plugin](/docs/tooling#babel-plugin) in conjunction with TypeScript.

Before you can effectively start to use TypeScript you will have to do a little bit of configuration.

### Define a theme interface

By default every styled component will have the `theme` prop set to `any`. When building complex apps it would be better to have autocomplete and error checks everywhere.

To have autocomplete and checks around the `theme` prop we should first define the theme
interface we would like to use throughout our app:

```jsx
// theme.ts
export default interface ThemeInterface {
  primaryColor: string;
  primaryColorInverted: string;
}
```

Then we can re-export the `styled` function with our custom theme interface:

```jsx
// styled-components.ts
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import ThemeInterface from "./theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
```

### Styling components

Finally, instead of importing the styled functions from the styled-components module,
we import it from our above, custom module.

```jsx
import styled from 'app/styled-components';

// theme is now fully typed
const Title = styled.h1`
  color: ${props => props.theme.primaryColor};
`;
```

If you are passing custom properties to your styled component it is a good idea to follow this convention:

```jsx
import styled from "app/styled-components"

// theme is now fully typed
const Title = styled("h1")<{ isActive: boolean }>`
  color: ${props => props.isActive ? props.theme.primaryColor : props.theme.secondaryColor}
`
```

You will need to define both the custom props and the type of tag which will be used. When you pass a custom component,
the type of tag is not required.

```jsx
import styled from 'app/styled-components';
import Header from './Header';

const Title =
  styled <{ isActive: boolean }>(Header)`
  color: ${props => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
`;
```

If the **isActive** property should not be passed into the **Header** component you will have to extract it using the
following convention:

```jsx
import styled from 'app/styled-components';
import Header, { Props as HeaderProps } from './Header';

const Title =
  styled<{ isActive: boolean }>(({ isActive, ...rest }) => <Header {...rest} />)`
  color: ${props => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
`;
```

But it might be the opposite. Maybe your styled component needs to proxy props required by the **Header**. Then
you follow this convention:

```jsx
import styled from 'app/styled-components';
import Header, { Props as HeaderProps } from './Header';

const Title =
  styled <{ isActive: boolean } & HeaderProps>(({ isActive, ...rest }) => <Header {...rest} />)`
  color: ${props => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
`
```

This is the most complex example where we have specific properties for the styling of the component and pass
the rest of the required properties by the **Header** through. That means when you use **Title** it will have
the combined typing of both the styled requirements and the actual component requirements.

### Caveat with `className`

When defining a component you will need to mark `className` as optional
in your Props interface:

```jsx
interface LogoProps {
  /* This prop is optional, since TypeScript won't know that it's passed by the wrapper */
  className?: string;
}

class Logo extends React.Component<LogoProps, {}> {
  render() {
    return <div className={this.props.className}>Logo</div>;
  }
}

const LogoStyled = styled(Logo)`
  font-family: 'Helvetica';
  font-weight: bold;
  font-size: 1.8rem;
`;
```

### Caveat with Stateless Components

To use stateless components and have typechecking for the props you'll need to define
the component alongside with its type. This is not special to styled-components, this is just
how React works:

```jsx
interface BoxProps {
  theme?: ThemeInterface;
  borders?: boolean;
  className?: string;
}

const Box: React.SFC<BoxProps> = props => <div className={props.className}>{props.children}</div>;

const StyledBox = styled(Box)`
  padding: ${props => props.theme.lateralPadding};
`;
```
