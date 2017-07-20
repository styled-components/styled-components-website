import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import SectionLayout from '../../components/SectionLayout'

test('SectionLayout renders correctly', () => {
  const tree = renderer.create(<SectionLayout />).toJSON()

  expect(tree).toMatchSnapshot()
})
