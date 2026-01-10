import React from 'react';
import { render } from '@testing-library/react';
import LiveEdit, { StyledError } from '../../components/LiveEdit';

test('LiveEdit renders correctly', () => {
  const { container } = render(<LiveEdit code="const test = 'hello';" />);

  expect(container).toMatchSnapshot();
});

test('StyledError renders correctly', () => {
  const { container } = render(<StyledError />);

  expect(container).toMatchSnapshot();
});
