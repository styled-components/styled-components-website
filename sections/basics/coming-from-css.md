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
