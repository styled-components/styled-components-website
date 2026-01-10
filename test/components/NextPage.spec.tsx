import React from 'react';
import { render } from '@testing-library/react';
import NextPage from '../../components/NextPage';

test('NextPage renders correctly', () => {
  const { container } = render(<NextPage href="" title="" />);

  expect(container).toMatchSnapshot();
});
