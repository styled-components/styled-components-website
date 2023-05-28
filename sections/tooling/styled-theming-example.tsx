import styled, { ThemeProvider } from 'styled-components';
import theme, { VariantSet } from 'styled-theming';
import React from 'react';

type StyledThemingExampleMode = 'dark' | 'light';
type StyledThemingExampleSize = 'large' | 'normal';

export default function StyledThemingExample() {
  const [mode, setMode] = React.useState<StyledThemingExampleMode>('light');
  const [size, setSize] = React.useState<StyledThemingExampleSize>('normal');

  const toggleMode = React.useCallback(() => {
    setMode(x => (x === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleSize = React.useCallback(() => {
    setSize(x => (x === 'normal' ? 'large' : 'normal'));
  }, []);

  return (
    <ThemeProvider theme={{ mode, size }}>
      <Box>
        <Button onClick={toggleMode}>Toggle Mode</Button>
        <Button $kind="primary" onClick={toggleSize}>
          Toggle Size
        </Button>
        <Button $kind="success" onClick={toggleMode}>
          Toggle Mode
        </Button>
        <Button $kind="warning" onClick={toggleSize}>
          Toggle Size
        </Button>
        <Button $kind="danger" onClick={toggleMode}>
          Toggle Mode
        </Button>
      </Box>
    </ThemeProvider>
  );
}

const fontSize = theme('size', {
  normal: '0.9em',
  large: '1.1em',
});

const boxBackgroundColor = theme('mode', {
  light: 'aliceblue',
  dark: '#222',
});

const boxColor = theme('mode', {
  light: 'rgb(46, 68, 78)',
  dark: '#C5C8C6',
});

const Box = styled.div`
  padding: 4em 2em;
  text-align: center;
  font-size: ${fontSize};
  background-color: ${boxBackgroundColor};
  color: ${boxColor};
`;

const buttonBackgroundColor = theme.variants('mode', '$kind', {
  default: { light: 'slategray', dark: 'slategray' },
  primary: { light: 'palevioletred', dark: 'hotpink' },
  success: { light: 'mediumseagreen', dark: 'seagreen' },
  warning: { light: 'sandybrown', dark: 'peru' },
  danger: { light: 'tomato', dark: 'brown' },
});

const buttonPadding = theme('size', {
  normal: '0.5em 1em',
  large: '0.4em 0.7em',
});

const buttonMargin = theme('size', {
  normal: '0.5em',
  large: '0.2em 0.2em',
});

type ExtractVariants<Type> = Type extends VariantSet<string, infer X> ? X : never;

const Button = styled.button<{ $kind?: ExtractVariants<typeof buttonBackgroundColor> }>`
  font: inherit;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  padding: ${buttonPadding};
  margin: ${buttonMargin};
  background-color: ${buttonBackgroundColor};
  color: white;
`;

Button.defaultProps = {
  $kind: 'default',
};
