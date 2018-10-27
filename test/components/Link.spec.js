import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import 'jest-styled-components'
import Link, { StyledLink, InlineLink } from '../../components/Link'

test('Link renders correctly', () => {
  const tree = renderer.create(<Link href="/" />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('StyledLink renders correctly', () => {
  const tree = renderer.create(<StyledLink href="/" />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('InlineLink renders correctly', () => {
  const tree = renderer.create(<InlineLink href="/" />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Link is white', () => {
  const wrapper = mount(<Link href="/" inline white />)

  expect(wrapper).toHaveStyleRule('color', 'white')
})
