## TypeScript

styled-components has community-organized [TypeScript definitions](https://www.npmjs.com/package/@types/styled-components) on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) which powers the editing experience in IDEs and can provide types for TypeScript projects. To install them, run:

```sh
# Web
npm install @types/styled-components

# React Native
npm install @types/styled-components @types/styled-components-react-native
```

React Native only: If your `tsconfig` assigns `types` then you will need to add "styled-components-react-native" there.  For example:

```json
"types": ["jest", "styled-components-react-native"],
```

> Now that Babel 7 is out and the [TypeScript preset](https://babeljs.io/docs/en/babel-preset-typescript) is available, it's now possible to use the [styled-components babel plugin](/docs/tooling#babel-plugin) in conjunction with TypeScript.

Before you can effectively start to use TypeScript you will have to do a little bit of configuration.

### Create a declarations file

TypeScript definitions for styled-components can be extended by using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) since version `v4.1.4` of the definitions.

So the first step is creating a declarations file. Let's name it `styled.d.ts` for example.

```ts
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
```

`DefaultTheme` is being used as an interface of `props.theme` out of the box. By default the interface `DefaultTheme` is empty so that's why we need to extend it.

### Create a theme

Now we can create a theme just by using the `DefaultTheme` declared at the step above.

```ts
// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
};

export { myTheme };
```

React-Native:

```jsx
// styled-components.ts
import * as styledComponents from "styled-components/native";

import ThemeInterface from "./theme";

const {
  default: styled,
  css,
  ThemeProvider
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeInterface>;

export { css, ThemeProvider };
export default styled;
```

### Styling components

That's it! We're able to use styled-components as it just by using any original import.

```jsx
import styled, { createGlobalStyle, css } from 'styled-components';

// theme is now fully typed
export const MyComponent = styled.div`
  color: ${props => props.theme.colors.main};
`;

// theme is also fully typed
export MyGlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

// and this theme is fully typed as well
export cssHelper = css`
  border: 1px solid ${props => props.theme.borderRadius};
`;
```

### Using custom props

If you are passing custom properties to your styled component it's a good idea to pass type arguments to tagged template like this ([TypeScript `v2.9+` is required](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#generic-type-arguments-in-generic-tagged-templates)):

```jsx
import styled from 'styled-components';
import Header from './Header';

interface TitleProps {
  readonly isActive: boolean;
};

const Title = styled.h1<TitleProps>`
  color: ${props => props.isActive ? props.theme.colors.main : props.theme.colors.secondary};
`

const NewHeader = styled(Header)<{ customColor: string }>`
  color: ${props => props.customColor};
`
```

You will need to define both the custom props and the type of tag which will be used. When you pass a custom component,
the type of tag is not required.

```jsx
import styled from 'styled-components';
import Header from './Header';

const Title =
  styled <
  { isActive: boolean } >
  Header`
  color: ${(props) => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
`;
```

If the **isActive** property should not be passed into the **Header** component you will have to extract it using the
following convention:

```jsx
import styled from 'styled-components';
import Header, { Props as HeaderProps } from './Header';

const Title =
  styled <
  { isActive: boolean } >
  (({ isActive, ...rest }) => <Header {...rest} />)`
  color: ${(props) => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
`;
```

But it might be the opposite. Maybe your styled component needs to proxy props required by the **Header**. Then
you follow this convention:

```jsx
import styled from 'styled-components';
import Header, { Props as HeaderProps } from './Header';

const Title =
  (styled < { isActive: boolean }) &
  (HeaderProps >
    (({ isActive, ...rest }) => <Header {...rest} />)`
  color: ${(props) => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
`);
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

### Caveat with Function Components

To use function components and have typechecking for the props you'll need to define
the component alongside with its type. This is not special to styled-components, this is just
how React works:

```jsx
interface BoxProps {
  theme?: ThemeInterface;
  borders?: boolean;
  className?: string;
}

const Box: React.FunctionComponent<BoxProps> = (props) => <div className={props.className}>{props.children}</div>;

const StyledBox = styled(Box)`
  padding: ${(props) => props.theme.lateralPadding};
`;
```
