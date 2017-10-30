import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Search from '../../../components/Nav/Search'

test('Search renders correctly', () => {
  const tree = renderer.create(<Search />).toJSON()

  expect(tree).toMatchSnapshot()
})
