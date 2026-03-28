'use client';

import React from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live-runner';
import styled, { css } from 'styled-components';
import Link from './Link';
import { StyledError, editorMixin } from './LiveEdit';
import { Github } from '@styled-icons/fa-brands';
import { MenuBook, LibraryBooks } from '@styled-icons/material';
import { color, radius, space } from '../utils/tokens';
import { monospace } from '../utils/fonts';
import { mobile } from '../utils/media';
import rem from '../utils/rem';
import baseScope from '../utils/scope';
import theme from './prismTheme';

const headerCode = `
/* Edit me! This renders the buttons on the left. */
const Button = styled.a\`
  --bg: transparent;
  --fg: var(--color-text);
  --border: var(--color-border-strong);
  --shadow: transparent;

  background: var(--bg);
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: 3px;
  display: inline-block;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  font-weight: 600;
  text-align: center;
  transition: all 200ms ease-in-out;

  &:hover {
    --border: var(--color-accent);
    --bg: var(--color-accent-subtle);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow);
  }

  &:active {
    transform: translateY(0) scale(0.97);
    box-shadow: none;
  }
\`;

const PrimaryButton = styled(Button)\`
  --bg: var(--color-accent);
  --fg: white;
  --border: var(--color-accent);
  --shadow: var(--color-shadow);

  &:hover {
    --bg: var(--color-accent-light);
    --border: var(--color-accent-light);
  }

  &:active {
    --bg: var(--color-accent-dark);
    --border: var(--color-accent-dark);
  }
\`
`.trim();

const transformHeaderCode = (code: string) => `
  ${code}

  render(
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'flex-start' }}>
      <PrimaryButton as={Link} href="/docs/basics">
        <MenuBook size={16} style={{ marginRight: '0.45rem', verticalAlign: -2 }} />
        Getting Started
      </PrimaryButton>

      <PrimaryButton as={Link} href="/docs/api">
        <LibraryBooks size={15} style={{ marginRight: '0.4rem', verticalAlign: -2 }} />
        API Docs
      </PrimaryButton>

      <Button
        href="https://github.com/styled-components/styled-components"
        target="_blank"
        rel="noopener"
      >
        <Github size={16} style={{ marginRight: '0.4rem', verticalAlign: -2 }} />
        GitHub
      </Button>
    </div>
  )
`;

export default function HomepageHeroEditor({ children }: { children?: React.ReactNode }) {
  const editorContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const textarea = editorContainerRef.current?.querySelector<HTMLTextAreaElement>(
      'textarea.npm__react-simple-code-editor__textarea'
    );
    if (!textarea) return;
    const hasName = textarea.hasAttribute('aria-label') || textarea.hasAttribute('aria-labelledby');
    if (!hasName) textarea.setAttribute('aria-label', 'Homepage live code editor');
  }, []);

  return (
    <LiveProvider
      code={headerCode}
      language="tsx"
      transformCode={transformHeaderCode}
      scope={{ ...baseScope, rem, Link, Github, MenuBook, LibraryBooks }}
      theme={theme}
    >
      <HeroGrid>
        <HeroLeft>
          {children}

          <Links>
            <LivePreview />
          </Links>
        </HeroLeft>

        <HeroRight ref={editorContainerRef}>
          <Editor theme={theme} />
          <StyledError />
        </HeroRight>
      </HeroGrid>
    </LiveProvider>
  );
}

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${space[8]};
  align-items: stretch;
  width: 100%;

  ${mobile(css`
    grid-template-columns: 1fr;
  `)}
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;

  ${mobile(css`
    align-items: center;
  `)}
`;

const HeroRight = styled.div`
  box-shadow: 1px 1px 20px ${color.shadow};
  text-align: left;
  width: 100%;
  position: relative;
  z-index: 20;
  border-radius: ${radius.lg};
  overflow: hidden;
  align-self: end;
`;

const Editor = styled(LiveEditor)`
  ${editorMixin};
  height: 24rem;
  white-space: pre-wrap;
  width: 100%;
  tab-size: 2;

  pre,
  textarea {
    font-family: ${monospace} !important;
    font-size: inherit !important;
    font-variant-ligatures: none !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
    padding: 1.5em !important;
    margin: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    tab-size: 2;
    box-sizing: border-box !important;
  }

  .token-line {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

const Links = styled.div`
  margin: ${space[8]} 0 0;
`;
