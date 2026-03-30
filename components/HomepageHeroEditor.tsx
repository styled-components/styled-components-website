'use client';

import React from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live-runner';
import styled, { css } from 'styled-components';
import Link from './Link';
import { StyledError, editorMixin } from './LiveEdit';
import { Github } from '@styled-icons/fa-brands';
import { MenuBook, LibraryBooks } from '@styled-icons/material';
import { theme, font } from '../utils/theme';
import { mobile } from '../utils/media';
import rem from '../utils/rem';
import { createScope } from '../utils/scope';
import prismTheme from './prismTheme';

const headerCode = `
/* Edit me! This renders the buttons on the left. */
const Button = styled.a\`
  --bg: transparent;
  --fg: \${theme.color.text};
  --border: \${theme.color.borderStrong};
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
    --border: \${theme.color.accent};
    color: \${theme.color.accent};
    box-shadow: 0 4px 12px var(--shadow);
  }

  &:active {
    scale: 0.97;
    box-shadow: none;
  }
\`;

const PrimaryButton = styled(Button)\`
  --bg: \${theme.color.accent};
  --fg: white;
  --border: \${theme.color.accent};
  --shadow: \${theme.color.shadow};

  &:hover {
    --bg: \${theme.color.accentDark};
    --border: \${theme.color.accentDark};
    --fg: white;
  }

  &:active {
    --bg: \${theme.color.accent};
    --border: \${theme.color.accent};
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
  const id = React.useId();
  const liveScope = React.useMemo(() => createScope(id), [id]);
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
      scope={{ ...liveScope, rem, Link, Github, MenuBook, LibraryBooks, theme }}
      theme={prismTheme}
    >
      <HeroGrid>
        <HeroLeft>
          {children}

          <Links>
            <LivePreview />
          </Links>
        </HeroLeft>

        <HeroRight ref={editorContainerRef}>
          <Editor theme={prismTheme} />
          <StyledError />
        </HeroRight>
      </HeroGrid>
    </LiveProvider>
  );
}

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${theme.space[8]};
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
  border: 1px solid ${theme.color.border};
  box-shadow: 0 1px 3px ${theme.color.shadow};
  text-align: left;
  width: 100%;
  position: relative;
  z-index: 20;
  border-radius: ${theme.radius.lg};
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
    font-variant-ligatures: none !important;
    line-height: inherit !important;
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

  .token-line,
  .token {
    font-family: ${font.mono};
    font-size: 1em;
    font-weight: 300;
    letter-spacing: -0.025em;
  }
`;

const Links = styled.div`
  margin: ${theme.space[8]} 0 0;
`;
