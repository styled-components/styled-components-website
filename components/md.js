/*
 * This is totally an adapted version of react-markings, but we need to be able
 * to render custom elements for each markdown feature to make contributions reasonably easy
 * See: https://github.com/Thinkmill/react-markings
 */

import React, { Children } from 'react'
import { Parser } from 'commonmark'
import Renderer from 'commonmark-react-renderer'
import stripIndent from '../utils/stripIndent'

import elementToText from '../utils/elementToText'
import titleToDash from '../utils/titleToDash'

// Components to be used as renderers
import Code from './Code'
import LiveEdit from './LiveEdit'
import CodeBlock from './CodeBlock'
import Note from './Note'
import Link from './Link'
import { Title } from './Layout'
import Anchor from './Anchor'
import Label, { LabelGroup } from './Label'

const PLACEHOLDER = 'THIS_IS_A_BUG_PLEASE_OPEN_AN_ISSUE_IN_OUR_WEBSITE_REPO'

const isValid = node => {
  const walker = node.walker()
  let event

  while (event = walker.next()) {
    const { node, entering } = event

    if (
      !entering ||
      !node.literal ||
      node.literal.indexOf(PLACEHOLDER) === -1 ||
      (
        node.type === 'text' &&
        node.parent.type === 'paragraph' &&
        node.literal === PLACEHOLDER
      )
    ) {
      continue
    }

    return false
  }

  return true
}

const md = (strings, ...values) => {
  // Check if it's called as a normal function or as a tagged function
  const input = typeof strings === 'string' ?
    stripIndent(strings) :
    stripIndent(strings.join(PLACEHOLDER))

  const idPrefix = typeof strings === 'string' && typeof values[0] === 'string' ?
    values[0] + '_'  : ''

  const startingLevel = typeof strings === 'string' ?
    values[1] : null

  const parser = new Parser()
  const ast = parser.parse(input)

  if (!isValid(ast)) {
    throw new Error('Cannot interpolate React elements non-block positions')
  }

  let topLevelHeading

  const renderer = new Renderer({
    renderers: {
      Paragraph({ children }) {
        if (
          (Array.isArray(children) && children.length === 1 && children[0] === PLACEHOLDER) ||
          children === PLACEHOLDER
        ) {
          return values.shift()
        }

        return <p>{children}</p>
      },

      Code({ literal }) {
        return <Code>{literal}</Code>
      },

      CodeBlock({ language, literal }) {
        if (language === 'react') {
          return <LiveEdit code={literal} noInline />
        } else if (language === 'react-inline') {
          return <LiveEdit code={literal} />
        } else if (language === 'sh') {
          return <CodeBlock code={literal} language="bash" />
        }

        return <CodeBlock code={literal} language={language} />
      },

      BlockQuote({ children }) {
        return <Note>{children}</Note>
      },

      Link({ href, children }) {
        return <Link href={href} inline>{children}</Link>
      },

      Heading({ level, children }) {
        if (startingLevel) {
          topLevelHeading = topLevelHeading || Math.max(level, 1)
          level+= startingLevel - topLevelHeading
        }

        if (level === 1) {
          return <Title>{children}</Title>
        }

        // The pipe indicates labels after the initial title
        const [_, ...labels] = elementToText(children).split('|')

        const title = Children.map(children, child => {
          if (typeof child === 'string') {
            const pipeIndex = child.indexOf('|')
            return pipeIndex > -1 ? child.slice(0, pipeIndex) : child
          }

          return child
        })

        const hash = `${idPrefix}${titleToDash(title)}`

        return (
          <Anchor id={hash} sub={level > 2}>
            {title}
            {labels.length > 0 && (
              <LabelGroup>
                {
                  labels.map((label, index) =>
                    <Label key={index}>
                      {label.trim()}
                    </Label>
                  )
                }
              </LabelGroup>
            )}
          </Anchor>
        )
      }
    }
  })

  return (
    <div>
      {renderer.render(ast)}
    </div>
  )
}

export default md
