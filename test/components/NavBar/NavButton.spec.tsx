import React from 'react';
import { render } from '@testing-library/react';
import NavButton from '../../../components/Nav/NavButton';

test('NavButton renders correctly', () => {
  const { container } = render(<NavButton />);

  expect(container).toMatchSnapshot();
});
