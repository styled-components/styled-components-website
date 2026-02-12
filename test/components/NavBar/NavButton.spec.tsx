import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavButton from '../../../components/Nav/NavButton';

test('NavButton is a button with an accessible name', () => {
  render(<NavButton aria-label="Navigation" />);

  const button = screen.getByRole('button', { name: /navigation/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
});

it('renders', () => {
  const { container } = render(<NavButton aria-label="Navigation" />);
  expect(container.firstChild).toBeTruthy();
});
