import md from 'components/md'

const ExistingCSS = () => md`
  ## Existing CSS

  There are a couple of implementation details that you should be aware of, if you choose to use
  styled-components together with existing CSS.

  styled-components generates an actual stylesheet with classes, and attaches those classes to
  the DOM nodes of styled components via the \`className\` prop.
  It injects the generated stylesheet at the end of the head of the document during runtime.

  ### Styling normal React components

  If you use the \`styled(MyComponent)\` notation and \`MyComponent\` does not
  render the passed-in \`className\` prop, then no styles will be applied.
  To avoid this issue, make sure your component attaches the passed-in className to a DOM node:

  \`\`\`jsx
  class MyComponent extends React.Component {
    render() {
      // Attach the passed-in className to the DOM node
      return <div className={this.props.className} />;
    }
  }
  \`\`\`

  If you have pre-existing styles with a class, you can combine the global class with the
  passed-in one:

  \`\`\`jsx
  class MyComponent extends React.Component {
    render() {
      // Attach the passed-in className to the DOM node
      return <div className={\`some-global-class \${this.props.className}\`} />;
    }
  }
  \`\`\`

  ### Issues with Specificity

  If you apply a global class together with a styled component class, the result might not be
  what you're expecting. If a property is defined in both classes with the same specificty,
  the last one will win.

  \`\`\`jsx
  // MyComponent.js
  const MyComponent = styled.div\`background-color: green;\`;

  // my-component.css
  .red-bg {
    background-color: red;
  }

  // For some reason this component still has a green background,
  // even though you're trying to override it with the "red-bg" class!
  <MyComponent className="red-bg" />
  \`\`\`

  In the above example the styled component class takes precendence over the global class, since
  styled-components injects its styles during runtime into the DOM at the end of the head.
  Thus its styles win over the other ones.

  Since it's often hard to control where your global CSS is injected into the DOM with tools like
  Webpack, the easiest thing is to bump up the specificity of your global class by repeating the
  classname:

  \`\`\`css
  /* my-component.css */
  .red-bg.red-bg {
    background-color: red;
  }
  \`\`\`

`

export default ExistingCSS
