import React from 'react'

import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'
import Code from '../Code'
import LiveEdit from '../LiveEdit'

const sampleTachyonsExample = (`
const Button = styled.button.attrs({
  className: 'small',
})\`
	background: black;
  color: white;
  cursor: pointer;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid black;
	border-radius: 3px;
\`;

render(
	<div>
<Button>Styled Components</Button>
		<Button>The new way to style components!</Button>
	</div>
);
`).trim()

const CSSFrameworks = () => (
  <SectionLayout title="Can I use CSS frameworks?">
    <p>Integrating an existing CSS framework with styled-components is really easy! You can use its existing class names alongside your components.</p>
    <p>Consider you have an existing app with some CSS that have the classes: <Code>.small</Code> and <Code>.big</Code>. Now try swapping the <Code>.small</Code> class with <Code>.big</Code>!</p>
    <LiveEdit code={sampleTachyonsExample} noInline />
    <p>Do read about <Link inline href="/docs/api#attrs">attrs</Link> to know how arbitary attributes can be passed to a styled component.</p>
  </SectionLayout>
)

export default CSSFrameworks
