## How can I override styles with higher specificity?

The way to override styles with a high specificity is to simply increase the specificity of your own styles. This could be done using `!important`, but that's error prone and generally not a good idea.

We recommend the following technique:

```js
const MyStyledComponent = styled(AlreadyStyledComponent)`
  &&& {
    color: palevioletred;
    font-weight: bold;
  }
`;
```

Each `&` gets replaced with the generated class, so the injected CSS then looks like this:

```css
.MyStyledComponent-asdf123.MyStyledComponent-asdf123.MyStyledComponent-asdf123 {
  color: palevioletred;
  font-weight: bold;
}
```

The repeated class bumps the specificity high enough to override the source order without being very tedious to write!
