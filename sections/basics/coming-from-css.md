## Coming from CSS

### How do Styled Components work within a component?

If you're familiar with importing CSS into your components (e.g. like CSSModules)
you'll be used to doing something like this:

```jsx
import styles from './styles.css'

class Counter extends React.Component {
  state = {
    /* ... */
  }
  increment = () => {
    /* ... */
  }
  decrement = () => {
    /* ... */
  }
  render() {
    return (
      <div className={styles.counter}>
        <p className={styles.paragraph}>{this.state.count}</p>
        <button className={styles.button} onClick={this.increment}>
          +
        </button>
        <button className={styles.button} onClick={this.decrement}>
          -
        </button>
      </div>
    )
  }
}

export default Counter
```

Because a Styled Component is the _combination_ of the element and the rules
that style it, we'd write `Counter` like this:

```jsx
const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  /* ... */
`
const Button = styled.button`
  /* ... */
`

class Counter extends React.Component {
  state = {
    /* ... */
  }
  increment = () => {
    /* ... */
  }
  decrement = () => {
    /* ... */
  }
  render() {
    return (
      <StyledCounter>
        <Paragraph>{this.state.count}</Paragraph>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </StyledCounter>
    )
  }
}

export default Counter
```

Note that we added a "Styled" prefix to `StyledCounter` so that the React
component `Counter` and the Styled Component `StyledCounter`
don't clash names but remain easily identifiable in the React Developer
Tools and Web Inspector.

### Define Styled Components outside of the render method

It is important to define your styled components outside of the render method,
otherwise it will be recreated on every single render pass.
Defining a styled component within the render method will thwart caching and
drastically slow down rendering speed, and should be avoided.

Write your styled components the recommended way:

```jsx
const StyledWrapper = styled.div`
  /* ... */
`

const Wrapper = ({ message }) => {
  return <StyledWrapper>{message}</StyledWrapper>
}
```

Instead of:

```jsx
const Wrapper = ({ message }) => {
  // WARNING: THIS IS VERY VERY BAD AND SLOW, DO NOT DO THIS!!!
  const StyledWrapper = styled.div`
    /* ... */
  `

  return <StyledWrapper>{message}</StyledWrapper>
}
```

**Recommended reading**: [Talia Marcassa](https://twitter.com/talialongname)
wrote a great review of real-world usage, featuring lots of solid practical insights
and comparisons with alternatives, in [Styled Components: To Use or Not to Use?](https://medium.com/building-crowdriff/styled-components-to-use-or-not-to-use-a6bb4a7ffc21)

### Psuedoelements, psuedoselectors, and nesting

The preprocessor we use, [stylis](https://github.com/thysultan/stylis.js), supports scss-like syntax for automatically nesting styles. Using an example component:

```jsx
const Thing = styled.div`
  color: blue;
`
```

Psuedoselectors and psuedoelements without further refinement automatically are attached to the component:

```react
const Thing = styled.button`
  color: blue;

  ::before {
    content: '🚀';
  }

  :hover {
    color: red;
  }
`

render(
  <Thing>Hello world!</Thing>
)
```

For more complex selector patterns, the amperstand (`&`) can be used to refer back to the main component. Here are some more examples of its potential usage:

```react
const Thing = styled.div.attrs({ tabIndex: 0 })`
  color: blue;

  &:hover {
    color: red; // <Thing> when hovered
  }

  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`

render(
  <React.Fragment>
    <Thing>Hello world!</Thing>
    <Thing>How ya doing?</Thing>
    <Thing className="something">The sun is shining...</Thing>
    <div>Pretty nice day today.</div>
    <Thing>Don't you think?</Thing>
    <div className="something-else">
      <Thing>Splendid.</Thing>
    </div>
  </React.Fragment>
)
```

If you put selectors in without the amperstand, they will refer to children of the component.

```react
const Thing = styled.div`
  color: blue;

  .something {
    border: 1px solid; // an element labeled ".something" inside <Thing>
    display: block;
  }
`

render(
  <Thing>
    <label for="foo-button" className="something">Mystery button</label>
    <button id="foo-button">What do I do?</button>
  </Thing>
)
```

Finally, the amperstand can be used to increase the specificity of rules on the component; this can be useful if you are dealing with a mixed styled-components and vanilla CSS environment where there might be conflicting styles:

```react
const Thing = styled.div`
  && {
    color: blue;
  }
`

const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`

render(
  <React.Fragment>
    <GlobalStyle />
    <Thing>
      I'm blue, da ba dee da ba daa
    </Thing>
  </React.Fragment>
)
```
