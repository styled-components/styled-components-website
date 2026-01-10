import React from 'react';
import { render } from '@testing-library/react';
import MobileNavbar from '../../../components/Nav/MobileNavbar';

test('MobileNavbar renders correctly', () => {
  const { container } = render(<MobileNavbar />);

  expect(container).toMatchSnapshot();
});
