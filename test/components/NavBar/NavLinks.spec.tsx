import React from 'react';
import { render } from '@testing-library/react';
import NavLinks from '../../../components/Nav/NavLinks';

test('NavLinks renders correctly', () => {
  const { container } = render(<NavLinks />);

  expect(container).toMatchSnapshot();
});
