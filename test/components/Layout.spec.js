import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import {
  Container,
  Content,
  Title,
  Header,
  SubHeader,
} from '../../components/Layout'

test('Container renders correctly', () => {
  const tree = renderer.create(<Container />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Content renders correctly', () => {
  const tree = renderer.create(<Content />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Title renders correctly', () => {
  const tree = renderer.create(<Title />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('Header renders correctly', () => {
  const tree = renderer.create(<Header />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('SubHeader renders correctly', () => {
  const tree = renderer.create(<SubHeader />).toJSON()

  expect(tree).toMatchSnapshot()
})

