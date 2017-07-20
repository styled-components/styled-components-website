import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import 'jest-styled-components'
import Link, { StyledLink, InlineLink } from '../../components/Link'

test('Link renders correctly', () => {
  const tree = renderer.create(<Link />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('StyledLink renders correctly', () => {
  const tree = renderer.create(<StyledLink />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('InlineLink renders correctly', () => {
  const tree = renderer.create(<InlineLink />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Link is white', () => {
  const wrapper = mount(<Link inline white />)

  expect(wrapper).toHaveStyleRule('color', 'white')
})
