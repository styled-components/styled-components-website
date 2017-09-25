import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Social from '../../../components/Nav/Social'

test('Social renders correctly', () => {
  const tree = renderer.create(<Social />).toJSON()

  expect(tree).toMatchSnapshot()
})
