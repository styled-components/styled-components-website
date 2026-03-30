'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

type Theme = 'light' | 'dark' | 'auto';

const NEXT_THEME: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};

const THEME_ICON: Record<Theme, () => React.JSX.Element> = {
  light: SunIcon,
  dark: MoonIcon,
  auto: SystemIcon,
};

function getTheme(): Theme {
  if (typeof window === 'undefined') return 'auto';
  if (document.documentElement.classList.contains('dark')) return 'dark';
  if (document.documentElement.classList.contains('light')) return 'light';
  return 'auto';
}

function applyTheme(theme: Theme) {
  const el = document.documentElement;
  el.classList.remove('light', 'dark');
  if (theme !== 'auto') {
    el.classList.add(theme);
  }

  // Sync data-theme for DocSearch dark mode
  if (resolvedIsDark(theme)) {
    el.dataset.theme = 'dark';
  } else {
    delete el.dataset.theme;
  }

  try {
    if (theme === 'auto') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  } catch {}
}

function resolvedIsDark(theme: Theme): boolean {
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  if (typeof window === 'undefined' || typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle(props: React.ComponentPropsWithoutRef<'button'>) {
  const [currentTheme, setThemeState] = React.useState<Theme>('auto');

  React.useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const toggle = () => {
    const next = NEXT_THEME[currentTheme];
    applyTheme(next);
    setThemeState(next);
  };

  const nextTheme = NEXT_THEME[currentTheme];
  const Icon = THEME_ICON[currentTheme];

  return (
    <Button
      {...props}
      onClick={toggle}
      suppressHydrationWarning
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <Icon />
    </Button>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${theme.color.navText};
  cursor: pointer;
  transition: opacity ${theme.duration.normal}, background ${theme.duration.normal};

  &:hover {
    background: ${theme.color.accentSubtle};
  }

  &:active {
    transform: scale(0.95);
  }
`;
