import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import ShowcaseTile from '../../components/ShowcaseTile';
import { SortedProject } from '../../companies-manifest';

const baseProject: SortedProject = {
  title: 'Acme',
  owner: 'Acme',
  link: 'https://acme.example',
  src: '/screenshots/thumbnails/acme.jpg',
  width: 1280,
  height: 720,
  internalUrl: 'acme',
};

describe('<ShowcaseTile>', () => {
  it('renders the primary site link with descriptive aria-label', () => {
    render(<ShowcaseTile project={baseProject} />);

    const link = screen.getByRole('link', {
      name: /Acme by Acme — open site in a new tab/i,
    });
    expect(link).toHaveAttribute('href', 'https://acme.example');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('omits the meta line when the title matches the owner', () => {
    render(<ShowcaseTile project={baseProject} />);
    expect(screen.queryByText('Acme', { selector: 'div' })).not.toBeInTheDocument();
  });

  it('surfaces the project title alongside the brand logo when they differ', () => {
    const Logo = () => <svg data-testid="logo" />;
    render(
      <ShowcaseTile project={{ ...baseProject, title: 'The Internet Movie Database', owner: 'IMDb' }} Logo={Logo} />
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('The Internet Movie Database')).toBeInTheDocument();
  });

  it('falls back to a "By owner" line when there is no logo and title differs from owner', () => {
    render(<ShowcaseTile project={{ ...baseProject, title: 'Welcome UI', owner: 'Welcome to the jungle' }} />);
    expect(screen.getByText('Welcome UI')).toBeInTheDocument();
    expect(screen.getByText(/By Welcome to the jungle/)).toBeInTheDocument();
  });

  it('renders a secondary repository link when a repo URL is provided', () => {
    render(<ShowcaseTile project={{ ...baseProject, repo: 'https://github.com/acme/acme' }} />);

    const repoLink = screen.getByRole('link', { name: /Acme repository on GitHub/i });
    expect(repoLink).toHaveAttribute('href', 'https://github.com/acme/acme');
  });

  it('omits the repository link when no repo URL is provided', () => {
    render(<ShowcaseTile project={baseProject} />);
    expect(screen.queryByRole('link', { name: /repository/i })).not.toBeInTheDocument();
  });

  it('uses the brand logo when available and hides it from assistive tech', () => {
    const Logo = () => <svg data-testid="logo" />;
    render(<ShowcaseTile project={baseProject} Logo={Logo} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
