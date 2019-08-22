import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import LiveEdit, { StyledError } from '../../components/LiveEdit';

test('LiveEdit renders correctly', () => {
  const wrapper = mount(<LiveEdit />);

  expect(wrapper).toMatchSnapshot();
});

test('StyledError renders correctly', () => {
  const tree = mount(<StyledError />, {
    context: { live: {} },
    childContextTypes: { live: PropTypes.object },
  });

  expect(tree).toMatchSnapshot();
});
