import md from 'components/md'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import React from 'react'

const fontSize = theme('size', {
  normal: '0.9em',
  large: '1.1em',
})

const boxBackgroundColor = theme('mode', {
  light: 'aliceblue',
  dark: '#222',
})

const boxColor = theme('mode', {
  light: 'rgb(46, 68, 78)',
  dark: '#C5C8C6',
})

const Box = styled.div`
  padding: 4em 2em;
  text-align: center;
  font-size: ${fontSize};
  background-color: ${boxBackgroundColor};
  color: ${boxColor};
`

const buttonBackgroundColor = theme.variants('mode', 'kind', {
  default: { light: 'slategray', dark: 'slategray' },
  primary: { light: 'palevioletred', dark: 'hotpink' },
  success: { light: 'mediumseagreen', dark: 'seagreen', },
  warning: { light: 'sandybrown', dark: 'peru', },
  danger: { light: 'tomato', dark: 'brown', },
})

const buttonPadding = theme('size', {
  normal: '0.5em 1em',
  large: '0.4em 0.7em',
})

const buttonMargin = theme('size', {
  normal: '0.5em',
  large: '0.2em 0.2em',
})

const Button = styled.button`
  font: inherit;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  padding: ${buttonPadding};
  margin: ${buttonMargin};
  background-color: ${buttonBackgroundColor};
  color: white;
`

Button.defaultProps = {
  kind: 'default'
}

class StyledThemingExample extends React.Component {
  state = {
    mode: 'light',
    size: 'normal',
  };

  handleToggleMode = () => {
    this.setState({ mode: this.state.mode === 'light' ? 'dark' : 'light' })
  };

  handleToggleSize = () => {
    this.setState({ size: this.state.size === 'normal' ? 'large' : 'normal' })
  };

  render() {
    return (
      <ThemeProvider theme={{ mode: this.state.mode, size: this.state.size }}>
        <Box>
          <Button onClick={this.handleToggleMode}>Toggle Mode</Button>
          <Button kind="primary" onClick={this.handleToggleSize}>Toggle Size</Button>
          <Button kind="success" onClick={this.handleToggleMode}>Toggle Mode</Button>
          <Button kind="warning" onClick={this.handleToggleSize}>Toggle Size</Button>
          <Button kind="danger" onClick={this.handleToggleMode}>Toggle Mode</Button>
        </Box>
      </ThemeProvider>
    )
  }
}

const StyledTheming = () => md`
  ## Styled Theming

  Create themes for your styled components using
  [styled-theming](https://github.com/styled-components/styled-theming)

  ${<StyledThemingExample/>}

  Read the [introductory blog post](http://thejameskyle.com/styled-theming.html)

  ### Install

  Install the babel-plugin first:

  \`\`\`
  npm install --save styled-theming
  \`\`\`

  ### Example

  \`\`\`jsx
  import React from 'react';
  import styled, {ThemeProvider} from 'styled-components';
  import theme from 'styled-theming';

  const boxBackgroundColor = theme('mode', {
    light: '#fff',
    dark: '#000',
  });

  const Box = styled.div\`
    background-color: \${boxBackgroundColor};
  \`;

  export default function App() {
    return (
      <ThemeProvider theme={{ mode: 'light' }}>
        <Box>
          Hello World
        </Box>
      </ThemeProvider>
    );
  }
  \`\`\`

  ### API

  #### \`<ThemeProvider>\`

  See [styled-components docs](https://www.styled-components.com/docs/advanced#theming)

  \`<ThemeProvider>\` is part of styled-components, but is required for
  styled-theming.

  \`\`\`js
  import {ThemeProvider} from 'styled-components';
  \`\`\`

  \`<ThemeProvider>\` accepts a single prop \`theme\` which you should pass an
  object with either strings or getter functions. For example:

  \`\`\`jsx
  <ThemeProvider theme={{ mode: 'dark', size: 'large' }}>
  <ThemeProvider theme={{ mode: modes => modes.dark, size: sizes => sizes.large }}>
  \`\`\`

  You should generally set up a \`<ThemeProvider>\` at the root of your app:

  \`\`\`jsx
  function App() {
    return (
      <ThemeProvider theme={...}>
        {/* rest of your app */}
      </ThemeProvider>
    );
  }
  \`\`\`

  #### \`theme(name, values)\`

  Most of your theming will be done with this function.

  \`name\` should match one of the keys in your \`<ThemeProvider>\` theme.

  \`\`\`jsx
  <ThemeProvider theme={{ whatever: '...' }}/>
  \`\`\`

  \`\`\`js
  theme('whatever', {...});
  \`\`\`

  \`values\` should be an object where one of the keys will be selected by the
  value provided to \`<ThemeProvider>\` theme.

  \`\`\`jsx
  <ThemeProvider theme={{ mode: 'light' }}/>
  <ThemeProvider theme={{ mode: 'dark' }}/>

  theme('mode', {
    light: '...',
    dark: '...',
  });
  \`\`\`

  The values of this object can be any CSS value.

  \`\`\`jsx
  theme('mode', {
    light: '#fff',
    dark: '#000',
  });

  theme('font', {
    sansSerif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    serif: 'Georgia, Times, "Times New Roman", serif',
    monoSpaced: 'Consolas, monaco, monospace',
  });
  \`\`\`

  These values can also be functions that return CSS values.

  \`\`\`jsx
  theme('mode', {
    light: props => props.theme.userProfileAccentColor.light,
    dark: props => props.theme.userProfileAccentColor.dark,
  });
  \`\`\`

  \`theme\` will create a function that you can use as a value in
  styled-component's \`styled\` function.

  \`\`\`jsx
  import styled from 'styled-components';
  import theme from 'styled-theming';

  const backgroundColor = theme('mode', {
    light: '#fff',
    dark: '#000',
  });

  const Box = styled.div\`
    background-color: \${backgroundColor}
  \`;
  \`\`\`


  #### \`theme.variants(name, prop, themes)\`

  It's often useful to create variants of the same component that are selected
  via an additional prop.

  To make this easier with theming, styled-theming provides a
  \`theme.variants\` function.

  \`\`\`jsx
  import styled from 'styled-components';
  import theme from 'styled-theming';

  const backgroundColor = theme.variants('variant', 'mode', {
    default: { light: 'gray', dark: 'darkgray' },
    primary: { light: 'blue', dark: 'darkblue' },
    success: { light: 'green', dark: 'darkgreen' },
    warning: { light: 'orange', dark: 'darkorange' },
  });

  const Button = styled.button\`
    background-color: \${backgroundColor};
  \`;

  Button.propTypes = {
    variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning'])
  };

  Button.defaultProps = {
    variant: 'default',
  };

  <Button/>
  <Button variant="primary"/>
  <Button variant="success"/>
  <Button variant="warning"/>
  \`\`\`
`

export default StyledTheming
