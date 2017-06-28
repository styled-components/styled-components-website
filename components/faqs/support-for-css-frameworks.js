import React from 'react'

import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'
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
    <p>Consider you have an existing app with some CSS that have the classes: <b>.small</b> and <b>.big</b>. Now try swapping the <b>small</b> class with <b>big</b>!</p>
    <LiveEdit code={sampleTachyonsExample} noInline />
  </SectionLayout>
)

export default CSSFrameworks
