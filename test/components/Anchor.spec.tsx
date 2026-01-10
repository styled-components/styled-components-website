import React from 'react';
import { render } from '@testing-library/react';
import Anchor from '../../components/Anchor';

test('Anchor renders correctly', () => {
  const { container } = render(<Anchor />);

  expect(container).toMatchSnapshot();
});
