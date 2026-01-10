import React from 'react';
import { render } from '@testing-library/react';
import Text from '../../../components/Nav/Text';

test('Text renders correctly', () => {
  const { container } = render(<Text />);

  expect(container).toMatchSnapshot();
});
