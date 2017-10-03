import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import NavSeparator from '../../../components/Nav/NavSeparator'

test('NavSeparator renders correctly', () => {
  const tree = renderer.create(<NavSeparator />).toJSON()

  expect(tree).toMatchSnapshot()
})
