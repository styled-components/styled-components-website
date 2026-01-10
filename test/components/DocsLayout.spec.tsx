import React from 'react';
import { render } from '@testing-library/react';
import DocsLayout from '../../components/DocsLayout';

jest.mock('next/navigation', () => ({
  usePathname: () => '/docs/test',
}));

test('DocsLayout renders correctly', () => {
  const { container } = render(<DocsLayout title="Test" />);

  expect(container).toMatchSnapshot();
});
