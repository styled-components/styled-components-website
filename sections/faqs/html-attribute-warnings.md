## Why am I getting HTML attribute warnings?

The warning message below indicates that non-standard attributes are being attached to
HTML DOM elements such as `div` or `a`. If you are seeing this warning message, it is likely that
you or a library you are using is attaching props as attributes to HTML DOM elements.

```jsx
Warning: Received "true" for a non-boolean attribute
```

If you're seeing this warning you are probably passing `true` where `"true"` would be appropriate.
It's likely that this comes from a `.attrs({})` property, or from a completely unrelated prop that you're
passing to a `styled(Component)` component.

We pass all props through, so check that you are not attaching unexpected props to the DOM element. And if
you're meaning to pass this prop to the DOM element, make sure to follow the warning and adapt the value.

```jsx
const Link = (props) => {
  return (
    <a {...props} className={props.className}>{props.text}</a>
  )
}

const StyledComp = styled(Link)`
  color: ${props.red ? "red" : "blue"};
`

<StyledComp text="Click" href="https://www.styled-components.com/" red />
```

This will render:
```jsx
<a text="Click" href="https://www.styled-components.com/" red=true class="[generated class]">Click</a>
```

React will then warn on non-standard attributes being attached such as the boolean for the red attribute in this example.
`
