import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Head from '../../../components/NavBar/Head'

test('Head renders correctly', () => {
  const tree = renderer.create(<Head />).toJSON()

  expect(tree).toMatchSnapshot()
})
