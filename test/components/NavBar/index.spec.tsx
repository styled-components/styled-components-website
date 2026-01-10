import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../../../components/Nav';

test('Nav renders correctly', () => {
  const { container } = render(<Nav />);

  expect(container).toMatchSnapshot();
});
