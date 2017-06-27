import React from 'react'

import SectionLayout from '../SectionLayout'
import CodeBlock from '../CodeBlock'

const sampleTachyonsExample = (`
const Button = styled.button.attrs({
  className: 'pa4 ba b--black-80',
})\`
	background: red;
	color: white;

	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
\`;

/* And use in render as: */

render(
	<div>
		<Button>Hello from Tachyons</Button>
	</div>
);
`).trim()

const CSSFrameworks = () => (
  <SectionLayout title="Support for CSS Frameworks">
    <p>Class names defined from a referenced CSS file can be used <b>along</b> with the style definitions! This will let styles to be separated from the markup making it very clean & readable.</p>
    <p>Consider we are using the <b><a href="http://tachyons.io/">Tachyons</a></b> library. The classes <b>pa4</b>, <b>ba</b>, <b>bg--black-80</b> from the library can be provided along with the style definition so that the markup will be clean without any style related noise.</p>
    <p>Same can be done with Bootstrap, Foundation or any similar CSS frameworks.</p>
    <CodeBlock code={sampleTachyonsExample} language="jsx" />
  </SectionLayout>
)

export default CSSFrameworks
