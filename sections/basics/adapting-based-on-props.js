import md from 'components/md'

const AdaptingBasedOnProps = () => md`
  ## Adapting based on props

  You can pass a function ("interpolations") to a styled component's template literal
  to adapt it based on its props.

  This button component has a primary state that changes its colour.
  When setting the <Code>primary</Code> prop to true, we are swapping out its background and text colour.

  \`\`\`react
  const Button = styled.button\`
    /* Adapt the colours based on primary prop */
    background: \${props => props.primary ? 'palevioletred' : 'white'};
    color: \${props => props.primary ? 'white' : 'palevioletred'};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  \`;

  render(
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  );
  \`\`\`
`

export default AdaptingBasedOnProps
