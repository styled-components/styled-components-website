## TypeScript

styled-components has community-organized [TypeScript definitions](https://www.npmjs.com/package/@types/styled-components) on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) which powers the editing experience in IDEs and can provide types for TypeScript projects. To install them, run:

```sh
# Web
npm install --save-dev @types/styled-components

# React Native
npm install --save-dev @types/styled-components @types/styled-components-react-native
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

That's it! We're able to use styled-components just by using any original import.

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

If you are [adapting the styles based on props](https://styled-components.com/docs/basics#adapting-based-on-props), and those props are not part of the base tag / component props, you can tell TypeScript what those extra custom props are, with type arguments like this ([TypeScript `v2.9+` is required](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#generic-type-arguments-in-generic-tagged-templates)):

```tsx
import styled from 'styled-components';
import Header from './Header';

interface TitleProps {
  readonly isActive: boolean;
}

const Title = styled.h1<TitleProps>`
  color: ${(props) => (props.isActive ? props.theme.colors.main : props.theme.colors.secondary)};
`;
```

Note: if you style a standard tag (like `<h1>` in above example), styled-components [will not pass the custom props](https://styled-components.com/docs/basics#passed-props) (to avoid the [Unknown Prop Warning](https://reactjs.org/warnings/unknown-prop.html)).

However, it will pass all of them to a custom React component:

```tsx
import styled from 'styled-components';
import Header from './Header';

const NewHeader = styled(Header)<{ customColor: string }>`
  color: ${(props) => props.customColor};
`;
// Header will also receive props.customColor
```

If the **customColor** property should not be transferred to the **Header** component, you can leverage [transient props](https://styled-components.com/docs/api#transient-props), by prefixing it with a dollar sign ($):

```tsx
import styled from 'styled-components';
import Header from './Header';

const NewHeader2 = styled(Header)<{ $customColor: string }>`
  color: ${(props) => props.$customColor};
`;
// Header does NOT receive props.$customColor
```

Depending on your use case, you can achieve a similar result by extracting the custom props yourself:

```tsx
import styled from 'styled-components';
import Header, { Props as HeaderProps } from './Header';

const NewHeader3 = styled(({ customColor, ...rest }: { customColor: string } & HeaderProps) => <Header {...rest} />)`
  color: ${(props) => props.customColor};
`;
```

Or using [shouldForwardProp](https://styled-components.com/docs/api#shouldforwardprop):

```tsx
import styled from 'styled-components';
import Header from './Header';

const NewHeader4 = styled(Header).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['customColor'].includes(prop),
})<{ customColor: string }>`
  color: ${(props) => props.customColor};
`;
```

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
