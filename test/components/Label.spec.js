import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Label, { LabelGroup } from '../../components/Label'

test('Label renders correctly', () => {
  const tree = renderer.create(<Label />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('LabelGroup renders correctly', () => {
  const tree = renderer.create(<LabelGroup />).toJSON()

  expect(tree).toMatchSnapshot()
})
