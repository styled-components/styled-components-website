'use client';

import styled, { keyframes } from 'styled-components';
import Link from '@/components/Link';
import docsJson from './docs.json';
import { theme, font } from '@/utils/theme';
import titleToDash from '@/utils/titleToDash';

const faqPage = docsJson.pages.find(p => p.pathname === 'faqs');
const faqs = faqPage?.sections ?? [];

export default function NotFound() {
  return (
    <Wrapper>
      <CodeBlock>
        <Comment>{"// This component doesn't exist yet"}</Comment>
        <Line>
          <Keyword>const</Keyword> <ComponentName>MissingPage</ComponentName> = <FnName>styled</FnName>
          <Punct>.</Punct>
          <FnName>div</FnName>
          <Tick>`</Tick>
        </Line>
        <CSSLine>
          <Prop>status</Prop>
          <Punct>:</Punct> <Value>404</Value>
          <Punct>;</Punct>
        </CSSLine>
        <CSSLine>
          <Prop>display</Prop>
          <Punct>:</Punct> <Value>none</Value>
          <Punct>;</Punct>
        </CSSLine>
        <Line>
          <Tick>`</Tick>
          <Punct>;</Punct>
        </Line>
      </CodeBlock>

      <Message>
        This page doesn't exist.{' '}
        <Link href="/" variant="inline">
          Go home
        </Link>{' '}
        or{' '}
        <Link href="/docs" variant="inline">
          browse the docs
        </Link>
        .
      </Message>

      <FAQSection>
        <FAQHeading>Frequently Asked Questions</FAQHeading>
        <FAQGrid>
          {faqs.map(faq => (
            <FAQLink key={faq.title} href={`/docs/faqs#${titleToDash(faq.title)}`} variant="inline">
              {faq.title}
            </FAQLink>
          ))}
        </FAQGrid>
      </FAQSection>
    </Wrapper>
  );
}

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 96px ${theme.space[8]};
  font-family: ${font.sans};
  color: ${theme.color.text};
`;

const CodeBlock = styled.pre`
  font-family: ${font.mono};
  font-size: clamp(${theme.text.sm}, 2.5vw, ${theme.text.lg});
  line-height: 1.7;
  margin: 0 0 ${theme.space[6]};
  padding: ${theme.space[6]} ${theme.space[8]};
  background: ${theme.color.codeBg};
  color: ${theme.color.codeText};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.color.border};
  box-shadow: 0 1px 3px ${theme.color.shadow};
  max-width: 100%;
  overflow-x: auto;

  &::after {
    content: '|';
    animation: ${blink} 1s step-end infinite;
    color: ${theme.color.accent};
    font-weight: ${theme.fontWeight.bold};
  }
`;

const Line = styled.span`
  display: block;
`;

const CSSLine = styled(Line)`
  padding-left: 2ch;
`;

const Comment = styled(Line)`
  color: ${theme.color.codeComment};
  font-style: italic;
`;

const Keyword = styled.span`
  color: ${theme.color.codeComment};
`;

const ComponentName = styled.span`
  color: ${theme.color.codeText};
`;

const FnName = styled.span`
  color: ${theme.color.codeFunction};
`;

const Punct = styled.span`
  color: ${theme.color.codeComment};
`;

const Tick = styled.span`
  color: ${theme.color.codeString};
`;

const Prop = styled.span`
  color: ${theme.color.codeDeclaration};
`;

const Value = styled.span`
  color: ${theme.color.codeText};
`;

const Message = styled.p`
  font-size: ${theme.text.base};
  color: ${theme.color.textSecondary};
  margin: 0 0 ${theme.space[10]};
  text-align: center;
`;

const FAQSection = styled.section`
  width: 100%;
  max-width: 64ch;
`;

const FAQHeading = styled.h2`
  font-size: ${theme.text.sm};
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.color.textMuted};
  margin: 0 0 ${theme.space[4]};
  text-align: center;
`;

const FAQGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]};
  justify-content: center;
`;

const FAQLink = styled(Link)`
  font-size: ${theme.text.xs};
  padding: ${theme.space[1]} ${theme.space[3]};
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.color.border};
  background: ${theme.color.surface};
  transition:
    background ${theme.duration.normal},
    border-color ${theme.duration.normal};

  &:hover {
    background: ${theme.color.accentSubtle};
    border-color: ${theme.color.accent};
  }
`;
