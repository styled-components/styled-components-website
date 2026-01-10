import React from 'react';
import { render } from '@testing-library/react';
import { DocsSidebarMenu, SimpleSidebarMenu } from '../../../components/Nav/SidebarMenus';

test('DocsSidebarMenu renders correctly', () => {
  const { container } = render(<DocsSidebarMenu />);

  expect(container).toMatchSnapshot();
});

test('SimpleSidebarMenu renders correctly', () => {
  const { container } = render(<SimpleSidebarMenu />);

  expect(container).toMatchSnapshot();
});
