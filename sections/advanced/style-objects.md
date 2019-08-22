## Style Objects

styled-components optionally supports writing CSS as JavaScript objects instead of strings. This is particularly useful when you have existing style objects and want to gradually move to styled-components.

```react
// Static object
const Box = styled.div({
  background: 'palevioletred',
  height: '50px',
  width: '50px'
});

// Adapting based on props
const PropsBox = styled.div(props => ({
  background: props.background,
  height: '50px',
  width: '50px'
}));

render(
  <div>
    <Box />
    <PropsBox background="blue" />
  </div>
);
```

### Destructuring props

a style object supports destructuring of props.

```react

// Destructure afer initial styles
const PropsBox = styled.div({
    height: '50px',
    width: '50px',
    borderStyle: 'solid',
    borderWidth: '4px',
    backgroundColor: 'blue'
  }, ({borderColor}) => ({
    borderColor: borderColor
  })
)

render(
  <div>
    <PropsBox borderColor='darkblue'/>
  </div>
);
```

### Decendent/Sibling selectors

a style object can reference its decendent by component

```react

// Decendent selector by component
const DecendentBox = styled.div({
  backgroundColor: 'blue',
  height: '50px',
  width: '50px',
  borderStyle: 'solid',
  borderWidth: '4px',
  }
)

const Box = styled.div({
    display: 'inline-block',
    padding: '10px',
    background: 'palevioletred',
    [`> ${DecendentBox}`] : {
      borderColor: 'darkblue'
    }
  }
)

render(
  <div>
    <Box>
      <DecendentBox/>
    </Box>
  </div>
);
```

a style object can reference its decendent by a `className`

```react

// Decendent selector by class
const DecendentBox = styled.div({
  backgroundColor: 'blue',
  height: '50px',
  width: '50px',
  borderStyle: 'solid',
  borderWidth: '4px',
  }
)

const Box = styled.div({
    display: 'inline-block',
    padding: '10px',
    background: 'palevioletred',
    '> .decendent-box' : {
      borderColor: 'darkblue'
    }
  }
)

render(
  <div>
    <Box>
      <DecendentBox className='decendent-box'/>
    </Box>
  </div>
);
```

a styled object can reference its sibling(s) by a `className`.

_child selector (>), adjacent sibling selector (+) and general sibling selector (~) work in the same way_

```react

// Adjacent Sibling selector by class
const SiblingBox = styled.div({
  backgroundColor: 'blue',
  height: '50px',
  width: '50px',
  borderStyle: 'solid',
  borderWidth: '4px',
  borderColor: 'darkblue'
  }
)

const Box = styled.div({
    height: '50px',
    width: '50px',
    background: 'palevioletred',
    '+ .sibling-box' : {
      borderColor: 'dodgerblue'
    }
  }
)

render(
  <div>
    <Box />
    <SiblingBox className='sibling-box'/>
    <SiblingBox className='sibling-box'/>
  </div>
);
```

a style object can reference its sibling(s) by component.

_child selector (>), adjacent sibling selector (+) and general sibling selector (~) work in the same way_

```react

// Adjacent sibling selector by component
const SiblingBox = styled.div({
  backgroundColor: 'blue',
  height: '50px',
  width: '50px',
  borderStyle: 'solid',
  borderWidth: '4px',
  borderColor: 'darkblue'
  }
)

const Box = styled.div({
    height: '50px',
    width: '50px',
    background: 'palevioletred',
    [`+ ${SiblingBox}`] : {
      borderColor: 'dodgerblue'
    }
  }
)

render(
  <div>
    <Box/>
    <SiblingBox/>
    <SiblingBox/>
  </div>
);
```

### Pseudo-classes

a style object can reference pseudo-classes and decendents with pseudo selectors

```react
const Label = styled.label({
  position: 'relative',
  cursor: 'pointer'
})

// Pseudo selector
const Check = styled.span({
  position: 'absolute',
  top: '0px',
  left: '0px',
  height: '25px',
  width: '25px',
  borderWidth: '4px',
  borderStyle: 'solid',
  borderColor: 'dodgerblue',
  background: 'white',
  ':hover': {
    borderColor: 'lightskyblue'
  }
})

// Pseudo selector by component
const Input = styled.input({
    position: 'absolute',
    opacity: 0,
    height: '0px',
    width: '0px',
    [`:checked + ${Check}`] : {
      background: 'blue'
    }
  }
)

render(
  <div>
  <Label>
    <Input type='checkbox' />
    <Check />
  </Label>
  </div>
);
```

### Spread operator

With style objects you can take advantage of JavaScript's spread syntax

```react
// JavaScript object for common styles
const fontStyles = {
  fontFamily: 'monospace',
  fontSize: '1rem',
  lineHeight: '1rem',
  color: 'palevioletred',
  margin: '0px',
}

// Spread common styles across components
const H1 = styled.h1({
  ...fontStyles,
  fontSize: '2.5rem',
  lineHeight: '2.5rem'
})

const P = styled.p({
  ...fontStyles,
  color: 'rgb(243, 182, 97)'
})

render(
  <div>
    <H1>h1. heading</H1>
    <P>p. paragraph</P>
  </div>
);
```

### Unitless CSS values

Style objects work with both numbers and string values. Just like styled tagged template literals, number values are assumed as px unless used where unitless values are typically accepted such as lineHeight and flexGrow.

```react
// height and width as number
const NumberBox = styled.div({
  background: 'palevioletred',
  height: 50,
  width: 50
});

// height and width as string
const StringBox = styled.div({
  background: 'blue',
  height: '50px',
  width: '50px'
});

render(
  <div>
    <NumberBox />
    <StringBox />
  </div>
);
```

### With TypeScript

Style objects can work with TypeScript interfaces.

<!-- prettier-ignore-start -->
```jsx
interface IPropsBox {
  backgroundColor: string;
}

const PropsBox = styled.div<IPropsBox>({
    height: '50px',
    width: '50px',
    borderStyle: 'solid',
    borderWidth: '4px',
    backgroundColor: 'blue',
  },
  ({ borderColor }) => ({
    borderColor: borderColor,
  }));

render(
  <div>
    <PropsBox borderColor="darkblue" />
  </div>
);
```
<!-- prettier-ignore-end -->
