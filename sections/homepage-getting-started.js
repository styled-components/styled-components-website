import React from 'react'
import styled, { css } from 'styled-components'

import md from 'components/md'
import { Content } from 'components/Layout'

const AlignCenter = styled.div`
  text-align: center;
`

const Badge = styled.img`
  margin: 0 0.5em 3em;
  height: 1.5em;
`

const ExampleButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${p => p.primary && css`
    background: palevioletred;
    color: white;
  `}
`

const SecondButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

const HomepageGettingStarted = () => (
  <Content>
    <AlignCenter>
      <a href="https://github.com/styled-components/styled-components">
        <Badge src="https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star&maxAge=3600" alt="Stars on GitHub" />
      </a>
      <a href="https://www.npmjs.com/package/styled-components">
        <Badge src="https://img.shields.io/npm/v/styled-components.svg" alt="Current version" />
      </a>
      <Badge src="https://img.shields.io/npm/dm/styled-components.svg?maxAge=3600" alt="Monthly downloads" />
      <Badge src="http://img.badgesize.io/https://unpkg.com/styled-components/dist/styled-components.min.js?compression=gzip&label=gzip%20size" alt="Gzipped size" />
      <a href="https://spectrum.chat/styled-components">
        <Badge alt="Join the community on Spectrum" src="https://withspectrum.github.io/badge/badge.svg" />
      </a>
    </AlignCenter>

    {md`
      # Getting started
      ## Installation

      To download styled-components run \`npm install --save styled-components\`.
      That's all you need to do, you are now ready to use it in your app! (yep, no build step needed 👌)

      ## Your first styled component

      Let's say you want to create a simple and reusable \`<Button />\` component that you can use throughout your application.
      There should be a normal version and a big and \`primary\` version for the important buttons.
      This is what it should look like when rendered: (this is a live example, click on them!)

      ${
      <AlignCenter>
        <ExampleButton onClick={() => { alert('You clicked the normal button!') }}>Normal button</ExampleButton>
        <ExampleButton primary onClick={() => { alert('You clicked the primary button!') }}>Primary button</ExampleButton>
      </AlignCenter>
      }

      First, let's import styled-components and create a \`styled.button\`:

      \`\`\`jsx
      import styled from 'styled-components';

      const Button = styled.button\`\`;
      \`\`\`

      This \`Button\` variable here is now a React component that you can use like any other React component!
      This unusual backtick syntax is a new JavaScript feature called a tagged template literal.
      You know how you can call functions with parenthesis? (\`myFunc()\`) Well, now you can also call functions with backticks!
      [here is an explanation](/docs/advanced#tagged-template-literals) of how that works exactly.

      If you render our lovely component now (just like any other component: \`<Button />\`) this is what you get:

      ${
      <AlignCenter>
        <button>I'm a &lt;Button /&gt;!</button>
      </AlignCenter>
      }

      It renders a button! That's not a very nice button though 😕 we can do better than this,
      let's give it a bit of styling and tickle out the hidden beauty within!

      \`\`\`jsx
      const Button = styled.button\`
        border-radius: 3px;
        padding: 0.25em 1em;
        margin: 0 1em;
        background: transparent;
        color: palevioletred;
        border: 2px solid palevioletred;
      \`;
      \`\`\`

      ${
      <AlignCenter>
        <SecondButton>I'm a styled &lt;Button /&gt;</SecondButton>
      </AlignCenter>
      }

      As you can see, styled-components lets you write actual CSS in your JavaScript. This means you can use all
      the features of CSS you use and love, including (but by far not limited to) media queries, all
      pseudo-selectors, nesting, etc. It also binds styles to components, which has some interesting properties.
      (learn more about [the ideas behind styled-components here](/docs/basics#motivation))

      The last step is that we need to define what a primary button looks like.
      To do that we also import \`{ css }\` from \`styled-components\` and interpolate a function into our template literal, which gets passed the props of our component:

      \`\`\`jsx
      import styled, { css } from styled-components

      const Button = styled.button\`
        border-radius: 3px;
        padding: 0.25em 1em;
        margin: 0 1em;
        background: transparent;
        color: palevioletred;
        border: 2px solid palevioletred;

        \${props => props.primary && css\`
          background: palevioletred;
          color: white;
        \`\}
      \`;
      \`\`\`

      All we're saying here is that when the \`primary\` property is set we want to add some more \`css\` to our component,
      in this case change the background and color.

      That's all, we're done! Take a look at our finished component:

      \`\`\`react
      const Button = styled.button\`
        border-radius: 3px;
        padding: 0.25em 1em;
        margin: 0 1em;
        background: transparent;
        color: palevioletred;
        border: 2px solid palevioletred;

        \${props => props.primary && css\`
          background: palevioletred;
          color: white;
        \`\}
      \`;

      render(
        <div>
          <Button>Normal Button</Button>
          <Button primary>Primary Button</Button>
        </div>
      );
      \`\`\`

      Nice 😍 That's a live updating editor too, so play around with it a bit to get a feel for what it's like to work with styled-components!<

      Once you're done take a look at the [documentation](/docs), specifically the [Getting started](/docs/basics#getting-started) section! Enjoy ✨
    `}
  </Content>
)

export default HomepageGettingStarted
