import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import CompatibilityMatrix from '../../components/CompatibilityMatrix';
import { loadCompatMatrix } from '../../utils/cssCompat.server';

const entries = loadCompatMatrix();

describe('<CompatibilityMatrix>', () => {
  it('renders every feature as a dense row by default', () => {
    render(<CompatibilityMatrix entries={entries} />);
    expect(screen.getByText('CSS Nesting')).toBeInTheDocument();
    expect(screen.getByText('Flexbox')).toBeInTheDocument();
  });

  it('renders one column for each of v6, v7, iOS stock, and Android stock', () => {
    render(<CompatibilityMatrix entries={entries} />);
    expect(screen.getByRole('columnheader', { name: 'v6' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'v7' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'iOS' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Android' })).toBeInTheDocument();
  });

  it('renders feature rows in alphabetical order', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const ids = Array.from(document.querySelectorAll('[id^="compat-"]:not([id^="compat-detail-"])')).map(el => el.id);
    const byTitle = new Map(entries.map(e => [`compat-${e.id}`, e.title]));
    const titles = ids.map(id => byTitle.get(id) ?? '');
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  });

  it('hides row details until the row is clicked', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const nestingEntry = entries.find(e => e.title === 'CSS Nesting')!;
    expect(screen.queryByText(nestingEntry.summary)).not.toBeInTheDocument();

    const row = document.getElementById('compat-nesting');
    expect(row).not.toBeNull();
    fireEvent.click(row as HTMLElement);

    expect(screen.getByText(nestingEntry.summary)).toBeInTheDocument();
  });

  it('toggles row expansion via keyboard (Enter / Space)', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const row = document.getElementById('compat-nesting') as HTMLElement;
    expect(row).toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(row, { key: 'Enter' });
    expect(row).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(row, { key: ' ' });
    expect(row).toHaveAttribute('aria-expanded', 'false');
  });

  it('filters rows by query', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const input = screen.getByPlaceholderText(/Filter features/i);
    fireEvent.change(input, { target: { value: 'container' } });

    expect(screen.getByText('@container size queries')).toBeInTheDocument();
    expect(screen.queryByText('CSS Nesting')).not.toBeInTheDocument();
  });

  it('filters rows by category', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const select = screen.getByLabelText(/Filter by category/i);
    fireEvent.change(select, { target: { value: 'colors' } });

    expect(screen.queryByText('CSS Nesting')).not.toBeInTheDocument();
    expect(screen.getByText('color-mix()')).toBeInTheDocument();
  });

  it('filters rows by platform', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const select = screen.getByLabelText(/Filter by platform/i);
    fireEvent.change(select, { target: { value: 'native' } });

    expect(screen.queryByText('position: fixed')).not.toBeInTheDocument();
    expect(screen.getByText('CSS Nesting')).toBeInTheDocument();
  });

  it('shows a helpful empty state when nothing matches', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const input = screen.getByPlaceholderText(/Filter features/i);
    fireEvent.change(input, { target: { value: 'zzzzznothingmatchesthis' } });
    expect(screen.getByText(/No features match/i)).toBeInTheDocument();
  });

  it('renders browser chips inside the expanded detail panel for entries with caniuse data', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const row = document.getElementById('compat-nesting') as HTMLElement;
    fireEvent.click(row);

    const detail = document.getElementById('compat-detail-nesting') as HTMLElement;
    expect(detail).not.toBeNull();
    expect(within(detail).getByText(/Chrome \d+/)).toBeInTheDocument();
  });

  it('updates the result count when filtering', () => {
    render(<CompatibilityMatrix entries={entries} />);
    const input = screen.getByPlaceholderText(/Filter features/i);
    fireEvent.change(input, { target: { value: 'container' } });
    expect(screen.getByText(/\d+ features?/)).toBeInTheDocument();
  });
});
