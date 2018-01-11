import { isValidElement } from 'react'

const whitespacesRe = /\s+/g
const _format = (str = '') => str.trim().replace(whitespacesRe, ' ')

const elementToTextRec = x => {
  if (Array.isArray(x)) {
    return x.map(elementToTextRec).join('')
  } else if (isValidElement(x)) {
    return elementToTextRec(x.children || x.props.children)
  } else if (typeof x === 'string') {
    return x || ''
  }

  return ''
}

const elementToText = node => _format(elementToTextRec(node))

export default elementToText
