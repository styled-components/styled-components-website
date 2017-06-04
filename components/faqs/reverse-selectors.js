import React from 'react'

import SectionLayout from '../SectionLayout'
import LiveEdit from '../LiveEdit'

const sample = (`
const Link = styled.a\`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
\`;

const Icon = styled.svg\`
  transition: fill 0.25s;
  width: 48px;
  height: 48px;

  \${Link}:hover & {
    fill: rebeccapurple;
  }
\`;

const Label = styled.span\`
  display: flex;
  align-items: center;
  line-height: 1.2;

  &::before {
    content: '◀';
    margin: 0 10px;
  }
\`;

render(
  <Link href="#">
    <Icon viewBox="0 0 20 20">
      <path d="M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z"/>
    </Icon>
    <Label>Hovering my parent changes my\u00A0style!</Label>
  </Link>
)
`).trim()

const ReverseSelectors = () => (
  <SectionLayout title="Can I refer to other components?">
    <p>Yes! This lets you adopt the Reverse Selector pattern, which lets components encapsulate the entirety of their styling: as with media queries, it lets components describe how they will behave when affected by external changes, without needing to refer to other parts of your codebase.</p>
    <p>Here, our Icon component defines its response to its parent Link being hovered:</p>
    <LiveEdit code={sample} noInline />
    <p>We could have nested the color-changing rule within our Link component, but then we'd have to consider both sets of rules to understand why Icon behaves as it does.</p>
  </SectionLayout>
)

export default ReverseSelectors
