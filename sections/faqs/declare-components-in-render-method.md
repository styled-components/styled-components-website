## Why should I avoid declaring styled components in the render method?

By declaring a styled component inside the render method of a react component, you are dynamically creating a new component on every render.
This means that React will have to discard and re-calculate that part of the DOM subtree on each subsequent render, instead of just calculating the difference of what changed between them. This leads to performance bottlenecks and unpredictable behavior.

🚫

```jsx
const Header = () => {
  const Title = styled.h1`
    font-size: 10px;
  `

  return (
    <div>
      <Title />
    </div>
  )
}
```

✅

```jsx
const Title = styled.h1`
  font-size: 10px;
`

const Header = () => {
  return (
    <div>
      <Title />
    </div>
  )
}
```
