import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '../../../components/Nav/Sidebar';

test('Sidebar renders correctly', () => {
  const { container } = render(<Sidebar />);

  expect(container).toMatchSnapshot();
});
