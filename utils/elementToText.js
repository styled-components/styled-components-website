import { isValidElement } from 'react'

const elementToText = node => {
  if (Array.isArray(node)) {
    return node
      .map(elementToText)
      .join('')
  } else if (isValidElement(node)) {
    return elementToText(node.props.children).trim()
  } else if (typeof node === 'string') {
    return node.trim()
  }

  return ''
}

export default elementToText
