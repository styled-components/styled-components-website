## Tagged Template Literals

Tagged Template Literals are a new feature in ES6. They let you define custom string interpolation rules,
which is how we're able to create styled components.

If you pass no interpolations, the first argument your function receives is an array with a string in it.

```jsx
// These are equivalent:
fn`some string here`
fn(['some string here'])
```

Once you pass interpolations, the array contains the passed string, split at the positions of the interpolations.
The rest of the arguments will be the interpolations, in order.

```jsx
const aVar = 'good'

// These are equivalent:
fn`this is a ${aVar} day`
fn(['this is a ', ' day'], aVar)
```

This is a bit cumbersome to work with, but it means that we can receive variables, functions, or mixins
(`css` helper) in styled components and can flatten that into pure CSS.

If you want to learn more about tagged template literals, check out Max Stoiber's article:
[The magic behind 💅🏾 styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/)
