import React from 'react';
import { mount } from 'enzyme';
import DocsLayout from '../../components/DocsLayout';

test('DocsLayout renders correctly', () => {
  const wrapper = mount(<DocsLayout />);

  expect(wrapper).toMatchSnapshot();
});
