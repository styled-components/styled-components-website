'use client';

import styled from 'styled-components';
import rem from '../utils/rem';
import { theme } from '../utils/theme';
import { Note } from './Note';
import { HighlightedCode } from './liveHighlight';
import { codeTextMixin } from './codeMixins';

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

/**
 * Static (read-only) code block for docs fenced code, shell snippets,
 * and similar. Shares `codeTextMixin` with the interactive editors so
 * font weight, token colors, and family stay in lockstep across both
 * renderers, and delegates to `HighlightedCode` so the tag-depth,
 * optional-chain, and property-access-depth annotators apply here too.
 */
const CodeBlock = styled(({ code, language = 'clike', className }: CodeBlockProps) => {
  return (
    <pre className={className}>
      <HighlightedCode code={code} language={language.toLowerCase().trim()} />
    </pre>
  );
})`
  ${codeTextMixin}

  background-color: ${theme.color.codeBg};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.color.border};
  box-shadow: 0 1px 3px ${theme.color.shadow};
  position: relative;
  z-index: 10;
  margin: ${theme.space[8]} 0;
  padding: 1.5em;
  overflow-x: auto;
  white-space: pre-wrap;
  width: 100%;

  ${Note} & {
    margin: ${rem(20)} 0;
  }
`;

export default CodeBlock;
