import { render } from '@testing-library/react';
import Link, { InlineLink, StyledLink } from '../../components/Link';

test('Link renders correctly', () => {
  const { container } = render(<Link href="/" target="_blank" />);

  expect(container).toMatchSnapshot();
});

test('StyledLink renders correctly', () => {
  const { container } = render(<StyledLink href="/" />);

  expect(container).toMatchSnapshot();
});

test('InlineLink renders correctly', () => {
  const { container } = render(<InlineLink href="/" />);

  expect(container).toMatchSnapshot();
});
