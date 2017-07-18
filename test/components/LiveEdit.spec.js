import React from 'react'
import PropTypes from 'prop-types'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import 'jest-styled-components'
import LiveEdit, { StyledError } from '../../components/LiveEdit'

test('LiveEdit renders correctly', () => {
  const wrapper = mount(<LiveEdit />)

  expect(wrapper).toMatchSnapshot()
})

test('StyledError renders correctly', () => {
  const tree = mount(<StyledError />, {
    context: { live: {} },
    childContextTypes: { live: PropTypes.object }
  })

  expect(tree).toMatchSnapshot()
})
