import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../components/Nav/Sidebar';

test('Sidebar renders correctly', () => {
  const wrapper = mount(<Sidebar />);

  expect(wrapper).toMatchSnapshot();
});
