## Why am I getting HTML attribute warnings?

The warning message below indicates that non-standard attributes are being attached to
HTML DOM elements such as `<div>` or `<a>`. If you are seeing this warning message, it is likely that you or a library you are using is attaching props as attributes to HTML DOM elements.

```
Warning: Received "true" for a non-boolean attribute
```

If you're seeing this warning you are probably passing `true` where `"true"` would be appropriate. It's likely that this comes from a `.attrs` property, or from a completely unrelated prop that you're passing to a `styled(Component)` component.

To learn more about how props are passed, see [this section](/docs/basics#passed-props 'Passing Props to styled-components').

For example:

```jsx
const Link = props => (
  <a {...props} className={props.className}>
    {props.text}
  </a>
)

const StyledComp = styled(Link)`
  color: ${props => (props.red ? 'red' : 'blue')};
`

<StyledComp text="Click" href="https://www.styled-components.com/" red />
```

This will render:

```html
<a text="Click" href="https://www.styled-components.com/" red="true" class="[generated class]">Click</a>
```

React will warn on non-standard attributes being attached such as "red" and "text", which are not valid HTML attributes for the `<a>` element.

To fix this, you can use transient props or destructure props:

### transient props (since 5.1)

You can use [transient props](https://styled-components.com/docs/api#transient-props) to fix this:

```jsx
const Link = ({ className, text, ...props }) => (
  <a {...props} className={className}>
    {text}
  </a>
)

const StyledComp = styled(Link)`
  color: ${props => (props.$red ? 'red' : 'blue')};
`

<StyledComp text="Click" href="https://www.styled-components.com/" $red />
```

### destructure props

If you use a version < 5.1 or if you can't use transient props, you can use argument destructuring to pull out those known styling props:

```jsx
const Link = ({ className, red, text, ...props }) => (
  <a {...props} className={className}>
    {text}
  </a>
)

const StyledComp = styled(Link)`
  color: ${props => (props.red ? 'red' : 'blue')};
`

<StyledComp text="Click" href="https://www.styled-components.com/" red />
```

This will render:

```html
<a href="https://www.styled-components.com/" class="[generated class]">Click</a>
```

When you use argument destructuring, any variables pulled out of the props object will not be included when spread-applying the remaining props (`...props`);
