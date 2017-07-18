import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Note from '../../components/Note'

test('Note renders correctly', () => {
  const tree = renderer.create(<Note />).toJSON()

  expect(tree).toMatchSnapshot()
})
