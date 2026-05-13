'use client';

import React from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live-runner';
import styled, { css } from 'styled-components';
import Link from './Link';
import { StyledError } from './LiveEdit';
import { editorMixin } from './codeMixins';
import { useCodeEditorAriaLabel } from '../utils/useCodeEditorAriaLabel';
import { Github } from '@styled-icons/fa-brands';
import { MenuBook, LibraryBooks } from '@styled-icons/material';
import { theme, font } from '../utils/theme';
import { mobile } from '../utils/media';
import rem from '../utils/rem';
import { createScope } from '../utils/scope';
import prismTheme from './prismTheme';
import { highlightTSXWithTagDepth } from './liveHighlight';

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
    --fg: \${theme.color.accent};
    --border: \${theme.color.accent};
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

export default function HomepageHeroEditor({
  children,
  latestPost,
}: {
  children?: React.ReactNode;
  latestPost?: React.ReactNode;
}) {
  const id = React.useId();
  const liveScope = React.useMemo(() => createScope(id), [id]);
  const editorContainerRef = React.useRef<HTMLDivElement>(null);
  useCodeEditorAriaLabel(editorContainerRef, 'Homepage live code editor');

  return (
    <LiveProvider
      code={headerCode}
      language="tsx"
      transformCode={transformHeaderCode}
      scope={{ ...liveScope, rem, Link, Github, MenuBook, LibraryBooks, theme }}
      theme={prismTheme}
    >
      <HeroGrid>
        {latestPost && <MobileLatestPost>{latestPost}</MobileLatestPost>}

        <HeroLeft>
          {children}

          <Links>
            <LivePreview />
          </Links>
        </HeroLeft>

        <EditorColumn>
          {latestPost && <DesktopLatestPost>{latestPost}</DesktopLatestPost>}
          <HeroRight ref={editorContainerRef}>
            <Editor theme={prismTheme} highlight={highlightTSXWithTagDepth} />
            <StyledError />
          </HeroRight>
        </EditorColumn>
      </HeroGrid>
    </LiveProvider>
  );
}

export const HeroContent = styled.div`
  box-sizing: border-box;
  font-family: ${font.sans};
  margin: 0 auto;
  max-width: ${theme.layout.contentWidth};
  padding: ${theme.space[16]} ${theme.layout.gutterFluid} 0;
  width: 100%;

  ${mobile(css`
    padding: ${theme.space[20]} ${theme.layout.gutterFluid} 0;
  `)}
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${theme.space[12]};
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

const EditorColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${theme.space[4]};
`;

const HeroRight = styled.div`
  border: 1px solid ${theme.color.border};
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
  width: 100%;
`;

const MobileLatestPost = styled.div`
  display: none;
  justify-content: center;
  order: -1;
  width: 100%;

  ${mobile(css`
    display: flex;
  `)}
`;

const DesktopLatestPost = styled.div`
  display: flex;
  width: 100%;
  align-self: stretch;

  ${mobile(css`
    display: none;
  `)}
`;

const Links = styled.div`
  margin: ${theme.space[8]} 0 0;
`;
