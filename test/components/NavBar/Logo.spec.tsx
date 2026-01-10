import React from 'react';
import { render } from '@testing-library/react';
import Logo from '../../../components/Nav/Logo';

test('Logo renders correctly', () => {
  const { container } = render(<Logo />);

  expect(container).toMatchSnapshot();
});
