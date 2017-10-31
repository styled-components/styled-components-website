import { isValidElement } from 'react'

const whitespacesRe = /\s+/g
const _format = str => str.replace(whitespacesRe, ' ')

const elementToText = node => {
  const rec = x => {
    if (Array.isArray(x)) {
      return node.map(rec).join('')
    } else if (isValidElement(x)) {
      return elementToText(x.props.children)
    } else if (typeof x === 'string') {
      return x
    }
  }

  return _format(rec(node))
}

export default elementToText
