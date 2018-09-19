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
  success: { light: 'mediumseagreen', dark: 'seagreen' },
  warning: { light: 'sandybrown', dark: 'peru' },
  danger: { light: 'tomato', dark: 'brown' },
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
  kind: 'default',
}

class StyledThemingExample extends React.Component {
  state = {
    mode: 'light',
    size: 'normal',
  }

  handleToggleMode = () => {
    this.setState({ mode: this.state.mode === 'light' ? 'dark' : 'light' })
  }

  handleToggleSize = () => {
    this.setState({ size: this.state.size === 'normal' ? 'large' : 'normal' })
  }

  render() {
    return (
      <ThemeProvider theme={{ mode: this.state.mode, size: this.state.size }}>
        <Box>
          <Button onClick={this.handleToggleMode}>Toggle Mode</Button>
          <Button kind="primary" onClick={this.handleToggleSize}>
            Toggle Size
          </Button>
          <Button kind="success" onClick={this.handleToggleMode}>
            Toggle Mode
          </Button>
          <Button kind="warning" onClick={this.handleToggleSize}>
            Toggle Size
          </Button>
          <Button kind="danger" onClick={this.handleToggleMode}>
            Toggle Mode
          </Button>
        </Box>
      </ThemeProvider>
    )
  }
}

export default StyledThemingExample
