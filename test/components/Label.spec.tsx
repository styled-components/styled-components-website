import React from 'react';
import { render } from '@testing-library/react';
import Label, { LabelGroup } from '../../components/Label';

test('Label renders correctly', () => {
  const { container } = render(<Label />);

  expect(container).toMatchSnapshot();
});

test('LabelGroup renders correctly', () => {
  const { container } = render(<LabelGroup />);

  expect(container).toMatchSnapshot();
});
