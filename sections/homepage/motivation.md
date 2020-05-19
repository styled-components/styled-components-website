import { Content } from 'components/Layout'
import { AlignCenter, Badge, ExampleButton, SecondButton } from './components'
import NextPage from '../../components/NextPage'

export default ({ children }) => (
  <Content data-e2e-id="content">
    <AlignCenter>
      <a href="https://github.com/styled-components/styled-components">
        <Badge src="/api/proxy/stars.svg" alt="Stars on GitHub" />
      </a>
      <a href="https://www.npmjs.com/package/styled-components">
        <Badge src="/api/proxy/npm-v.svg" alt="Current version" />
      </a>
      <Badge src="/api/proxy/downloads.svg" alt="Monthly downloads" />
      <Badge src="/api/proxy/size.svg" alt="Gzipped size" />
      <a href="https://spectrum.chat/styled-components">
        <Badge alt="Join the community on Spectrum" src="https://withspectrum.github.io/badge/badge.svg" />
      </a>
    </AlignCenter>
    {children}
  </Content>
)

# Motivation

**styled-components is the result of wondering how we could enhance CSS for styling React component systems.** By focusing on a single use case we managed to optimize the experience for developers as well as the output for end users.

Apart from the improved experience for developers, styled-components provides:

- **Automatic critical CSS**: styled-components keeps track of which components are rendered on a page and injects their styles and nothing else, fully automatically. Combined with code splitting, this means your users load the least amount of code necessary.
- **No class name bugs**: styled-components generates unique class names for your styles. You never have to worry about duplication, overlap or misspellings.
- **Easier deletion of CSS**: it can be hard to know whether a class name is used somewhere in your codebase. styled-components makes it obvious, as every bit of styling is tied to a specific component. If the component is unused (which tooling can detect) and gets deleted, all its styles get deleted with it.
- **Simple dynamic styling**: adapting the styling of a component based on its props or a global theme is simple and intuitive without having to manually manage dozens of classes.
- **Painless maintenance**: you never have to hunt across different files to find the styling affecting your component, so maintenance is a piece of cake no matter how big your codebase is.
- **Automatic vendor prefixing**: write your CSS to the current standard and let styled-components handle the rest.

You get all of these benefits while still writing the CSS you know and love, just bound to individual components.

## Your first styled component

Let's say you want to create a simple and reusable `<Button />` component that you can use throughout your application. There should be a normal version and a big and `primary` version for the important buttons. This is what it should look like when rendered: (this is a live example, click on them!)

<AlignCenter>
  <ExampleButton
    onClick={() => {
      alert('You clicked the normal button!')
    }}
  >
    Normal button
  </ExampleButton>
  <ExampleButton
    primary
    onClick={() => {
      alert('You clicked the primary button!')
    }}
  >
    Primary button
  </ExampleButton>
</AlignCenter>

First, let's import styled-components and create a `styled.button`:

```jsx
import styled from 'styled-components'

const Button = styled.button``
```

This `Button` variable here is now a React component that you can use like any other React component! This unusual backtick syntax is a new JavaScript feature called a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).

You know how you can call functions with parenthesis? (`myFunc()`) Well, now you can also call functions with backticks! ([learn more about tagged template literals](/docs/advanced#tagged-template-literals))

If you render our lovely component now (just like any other component: `<Button />`) this is what you get:

<AlignCenter>
  <button>I'm a &lt;Button /&gt;!</button>
</AlignCenter>

It renders a button! That's not a very nice button though 😕 we can do better than this,
let's give it a bit of styling and tickle out the hidden beauty within!

```jsx
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`
```

<AlignCenter>
  <SecondButton>I'm a styled &lt;Button /&gt;</SecondButton>
</AlignCenter>

As you can see, styled-components lets you write actual CSS in your JavaScript. This means you can use all the features of CSS you use and love, including (but by far not limited to) media queries, all pseudo-selectors, nesting, etc.

The last step is that we need to define what a primary button looks like. To do that we also import `{ css }` from `styled-components` and interpolate a function into our template literal, which gets passed the props of our component:

```jsx
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`
```

Here we're saying that when the `primary` property is set we want to add some more `css` to our component, in this case change the background and color.

That's all, we're done! Take a look at our finished component:

```react
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

const Container = styled.div`
  text-align: center;
`

render(
  <Container>
    <Button>Normal Button</Button>
    <Button primary>Primary Button</Button>
  </Container>
);
```

Nice 😍 That's a live updating editor too, so play around with it a bit to get a feel for what it's like to work with styled-components! Once you're ready, dive into the documentation to learn about all the cool things styled-components can do for you:

<NextPage title="Documentation" href="/docs" />
