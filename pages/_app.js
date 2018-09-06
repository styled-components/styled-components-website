import App, {Container} from 'next/app'
import React from 'react'
import { MDXProvider } from '@mdx-js/tag'

import elementToText from '../utils/elementToText'
import titleToDash from '../utils/titleToDash'

// Components to be used as renderers
import Code from '../components/Code'
import LiveEdit from '../components/LiveEdit'
import CodeBlock from '../components/CodeBlock'
import Note from '../components/Note'
import Link from '../components/Link'
import { Title } from '../components/Layout'
import Anchor from '../components/Anchor'
import Label, { LabelGroup } from '../components/Label'

const Heading = ({ level, children }) => {
  if (level === 1) {
    return (
      <Title>
        {children}
      </Title>
    )
  }

  // The pipe indicates labels after the initial title
  const [_, ...labels] = elementToText(children).split('|')

  const title = React.Children.map(children, child => {
    if (typeof child === 'string') {
      const pipeIndex = child.indexOf('|')
      return pipeIndex > -1 ? child.slice(0, pipeIndex) : child
    }

    return child
  })

  const hash = titleToDash(title)

  return (
    <Anchor id={hash} level={level}>
      {title}
      {labels.length > 0 &&
        <LabelGroup>
          {labels.map((label, index) =>
            <Label key={index} isVersion={label.trim().startsWith('v')}>
              {label.trim()}
            </Label>,
          )}
        </LabelGroup>}
    </Anchor>
  )
}

Heading.displayName = 'Heading'

const components = {
  p({ children }) {
    return (
      <p>
        {children}
      </p>
    )
  },

  inlineCode({ children }) {
    return (
      <Code>
        {children}
      </Code>
    )
  },

  code({ children, className = '' }) {
    const language = className.replace(/language-/, '')
    if (language === 'react') {
      return <LiveEdit code={children} noInline />
    } else if (language === 'react-inline') {
      return <LiveEdit code={children} />
    } else if (language === 'sh') {
      return <CodeBlock code={children} language="bash" />
    }

    return <CodeBlock code={children} language={language} />
  },

  blockquote({ children }) {
    return (
      <Note>
        {children}
      </Note>
    )
  },

  a({ href, children }) {
    return (
      <Link href={href} inline>
        {children}
      </Link>
    )
  },
  h1(props) {
    return <Heading {...props} level={1} />
  },
  h2(props) {
    return <Heading {...props} level={2} />
  },
  h3(props) {
    return <Heading {...props} level={3} />
  },
}

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Container>
  }
}
