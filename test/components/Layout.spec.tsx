import React from 'react';
import { render } from '@testing-library/react';
import { Container, Content, Title, Header, SubHeader } from '../../components/Layout';

test('Container renders correctly', () => {
  const { container } = render(<Container />);

  expect(container).toMatchSnapshot();
});

test('Content renders correctly', () => {
  const { container } = render(<Content />);

  expect(container).toMatchSnapshot();
});

test('Title renders correctly', () => {
  const { container } = render(<Title />);

  expect(container).toMatchSnapshot();
});

test('Header renders correctly', () => {
  const { container } = render(<Header />);

  expect(container).toMatchSnapshot();
});

test('SubHeader renders correctly', () => {
  const { container } = render(<SubHeader />);

  expect(container).toMatchSnapshot();
});
