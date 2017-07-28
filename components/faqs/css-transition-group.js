import React from 'react'

import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'
import Code from '../Code'
import Note from '../Note';
import { InlineLink } from '../Link'

const sampleCssTransitionGroup = (`
import {CSSTransitionGroup} from 'react-transition-group'

// Define constants for all our class names and timeouts.
// This is optional, but recommended.
const enter = 'example-enter'
const enterActive = 'example-enter-active'
const leave = 'example-leave'
const leaveActive = 'example-leave-active'
const enterTimeout = 500
const leaveTimeout = 500

// Set the props that CSSTransitionGroup expects, including mapping its
// desired class names to the ones we've defined.
const ExampleTransitionGroup = styled(CSSTransitionGroup).attrs({
  transitionName: { enter, enterActive, leave, leaveActive },
  transitionEnterTimeout: enterTimeout,
  transitionLeaveTimeout: leaveTimeout,
})\`
  .\${enter} {
    transform: translateY(100%);
  }

  .\${enterActive} {
    transform: translateY(0);
    transition: transform \${enterTimeout}ms ease-in;
  }

  .\${leave} {
    transform: translateY(0);
  }

  .\${leaveActive} {
    transform: translateY(100%);
    transition: transform \${leaveTimeout}ms ease-in;
  }
\`

render(
  <ExampleTransitionGroup>
    <div key={1}>Thing 1</div>
    <div key={2}>Thing 2</div>
    <div key={3}>Thing 3</div>
  </ExampleTransitionGroup>
)
`).trim()

const Nesting = () => (
  <SectionLayout title="Can I use CSSTransitionGroup?">
    <p><InlineLink href="https://github.com/reactjs/react-transition-group"><Code>react-transition-group</Code></InlineLink> is a popular React package for animating components as they enter or leave.</p>
    <p><Code>CSSTransitionGroup</Code>, the high-level animation component exported by <Code>react-transition-group</Code>, works by applying class names to the components when they're transitioning; they leave the exact animation implementation up to you.</p>
    <p>We can use it with styled-components by using <Code>attrs</Code> to map the class names it expects to ones we define, and then defining styles for those class names:</p>
    <Note>These instructions use v1 of <Code>react-transition-group</Code></Note>
    <CodeBlock code={sampleCssTransitionGroup} language="jsx" />
  </SectionLayout>
)

export default Nesting
