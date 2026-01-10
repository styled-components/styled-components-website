import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../../../components/Nav/Navbar';

test('Navbar renders correctly', () => {
  const { container } = render(<Navbar />);

  expect(container).toMatchSnapshot();
});
