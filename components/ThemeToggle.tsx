'use client';

import React from 'react';
import styled from 'styled-components';
import { LightMode, DarkMode, BrightnessAuto } from '@styled-icons/material';
import { theme } from '../utils/theme';

type Theme = 'light' | 'dark' | 'auto';

const NEXT_THEME: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};

const THEME_ICON: Record<Theme, React.ComponentType<{ size?: number }>> = {
  light: LightMode,
  dark: DarkMode,
  auto: BrightnessAuto,
};

function getTheme(): Theme {
  if (typeof window === 'undefined') return 'auto';
  // Read localStorage rather than the DOM class — the inline themeScript adds
  // a `dark` class for both "explicit dark" and "auto + system is dark", so
  // the class alone can't distinguish the two and the toggle would never
  // reach `auto` for users on system-dark.
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}
  return 'auto';
}

function applyTheme(next: Theme) {
  const el = document.documentElement;
  el.classList.remove('light', 'dark');
  if (next !== 'auto') {
    el.classList.add(next);
  }

  // Sync data-theme for DocSearch dark mode
  if (resolvedIsDark(next)) {
    el.dataset.theme = 'dark';
  } else {
    delete el.dataset.theme;
  }

  try {
    if (next === 'auto') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', next);
    }
  } catch {}
}

function resolvedIsDark(next: Theme): boolean {
  if (next === 'dark') return true;
  if (next === 'light') return false;
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
      <Icon size={18} />
    </Button>
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
  transition:
    opacity ${theme.duration.normal},
    background ${theme.duration.normal};

  &:hover {
    background: ${theme.color.accentSubtle};
  }

  &:active {
    transform: scale(0.95);
  }
`;
