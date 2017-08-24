import md from 'components/md'

const TypeScript = () => md`
  ## TypeScript

  styled-components has TypeScript definitions to allow the library to be used in any TypeScript project.
  A basic example can be found [here](https://github.com/patrick91/Styled-Components-Typescript-Example).

  ### Define a theme interface

  By default every styled component will have the \`theme\` prop set to \`any\`.
  When building complex apps it would be better to have autocomplete and error checks everywhere.

  To have autocomplete and checks around the \`theme\` prop we should first define the theme
  interface we would like to use throughout our app:

  \`\`\`jsx
  // theme.ts
  export default interface ThemeInterface {
    primaryColor: string;
    primaryColorInverted: string;
  }
  \`\`\`

  Then we can re-export the \`styled\` function with our custom theme interface:

  \`\`\`jsx
  // styled-components.ts
  import * as styledComponents from 'styled-components';
  import { ThemedStyledComponentsModule } from 'styled-components';

  import ThemeInterface from './theme';

  const {
    default: styled,
    css,
    injectGlobal,
    keyframes,
    ThemeProvider
  } = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

  export { css, injectGlobal, keyframes, ThemeProvider };
  export default styled;
  \`\`\`

  Finally, instead of importing the styled functions from the styled-components module,
  we import it from our above, custom module.

  ### Caveat with \`className\`

  When defining a component you will need to mark \`className\` as optional
  in your Props interface:

  \`\`\`jsx
  interface LogoProps {
    /* This prop is optional, since TypeScript won't know that it's passed by the wrapper */
    className?: string;
  }

  class Logo extends React.Component<LogoProps, {}> {
    render() {
      return (
        <div className={this.props.className}>
          Logo
        </div>
      );
    }
  }

  const LogoStyled = styled(Logo)\`
    font-family: 'Helvetica';
    font-weight: bold;
    font-size: 1.8rem;
  \`;
  \`\`\`

  ### Caveat with Stateless Components

  To use stateless components and have typechecking for the props you'll need to define
  the component alongside with its type, like this:

  \`\`\`jsx
  interface BoxProps {
    theme?: ThemeInterface;
    borders?: boolean;
    className?: string;
  }

  const Box: React.StatelessComponent<BoxProps> = props => (
    <div className={props.className}>
      {props.children}
    </div>
  );

  const StyledBox = styled(Box)\`
    padding: \${props => props.theme.lateralPadding};
  \`;
  \`\`\`
`

export default TypeScript
