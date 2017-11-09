import React from 'react'
import elementToText from '../../utils/elementToText'

describe('elementToText', () => {
  it('stringifies undefined', () => {
    expect(elementToText()).toBe('')
  })

  it('stringifies a string', () => {
    expect(elementToText('a  b')).toBe('a b')
  })

  it('trims a string', () => {
    expect(elementToText('a ')).toBe('a')
  })

  it('stringifies an array of strings', () => {
    expect(elementToText(['a ', ' b'])).toBe('a b')
  })

  it('stringifies an element', () => {
    expect(elementToText(<span>test</span>)).toBe('test')
    expect(elementToText(<span />)).toBe('')
  })

  it('stringifies an array of elements', () => {
    expect(elementToText([ <span>test</span>, <div>test</div> ])).toBe('testtest')
    expect(elementToText(<ul><li>a</li><li>b</li></ul>)).toBe('ab')
  })
})
