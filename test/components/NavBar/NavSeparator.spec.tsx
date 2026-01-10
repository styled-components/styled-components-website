import React from 'react';
import { render } from '@testing-library/react';
import NavSeparator from '../../../components/Nav/NavSeparator';

test('NavSeparator renders correctly', () => {
  const { container } = render(<NavSeparator />);

  expect(container).toMatchSnapshot();
});
