import { Content } from 'components/Layout'
import { AlignCenter, Badge, ExampleButton, SecondButton } from './components'
import NextPage from '../../components/NextPage'

export default ({ children }) => (
  <Content data-e2e-id="content">
    <AlignCenter>
      <a href="https://github.com/styled-components/styled-components">
        <Badge src="/proxy/stars.svg" alt="Stars on GitHub" />
      </a>
      <a href="https://www.npmjs.com/package/styled-components">
        <Badge src="/proxy/npm-v.svg" alt="Current version" />
      </a>
      <Badge src="/proxy/downloads.svg" alt="Monthly downloads" />
      <Badge src="/proxy/size.svg" alt="Gzipped size" />
      <a href="https://spectrum.chat/styled-components">
        <Badge alt="Join the community on Spectrum" src="https://withspectrum.github.io/badge/badge.svg" />
      </a>
    </AlignCenter>
    {children}
  </Content>
)

# Getting started

## Installation

To download styled-components run:

```
npm install --save styled-components
```

That's all you need to do, you are now ready to use it in your app! (yep, no build step needed 👌)

> Try out the v4 beta! Run `npm install --save styled-components@beta` instead. You can find [migration instructions in the FAQ](/docs/faqs#what-do-i-need-to-do-to-migrate-to-v4) if you're not a new user.

> It's recommended (but not required) to also use the [styled-components Babel plugin](https://github.com/styled-components/babel-plugin-styled-components) if you can. It offers many benefits like more legible class names, server-side rendering compatibility, smaller bundles, and more.

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
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

render(
  <div>
    <Button>Normal Button</Button>
    <Button primary>Primary Button</Button>
  </div>
);
```

Nice 😍 That's a live updating editor too, so play around with it a bit to get a feel for what it's like to work with styled-components! Once you're ready, dive into the documentation to learn about all the cool things styled-components can do for you:

<NextPage title="Documentation" href="/docs" />
