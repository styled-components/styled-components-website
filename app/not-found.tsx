'use client';

import styled, { keyframes } from 'styled-components';
import Link from '@/components/Link';
import docsJson from './docs.json';
import { color, font, text, fontWeight, space, radius, duration } from '@/utils/tokens';

const faqPage = docsJson.pages.find(p => p.pathname === 'faqs');
const faqs = faqPage?.sections ?? [];

function titleToDash(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\d\s.-]/g, '')
    .replace(/\s+/g, '-');
}

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
        <Link href="/" inline>
          Go home
        </Link>{' '}
        or{' '}
        <Link href="/docs" inline>
          browse the docs
        </Link>
        .
      </Message>

      <FAQSection>
        <FAQHeading>Frequently Asked Questions</FAQHeading>
        <FAQGrid>
          {faqs.map(faq => (
            <FAQLink key={faq.title} href={`/docs/faqs#${titleToDash(faq.title)}`} inline>
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
  padding: 96px ${space[8]};
  font-family: ${font.sans};
  color: ${color.text};
`;

const CodeBlock = styled.pre`
  font-family: ${font.mono};
  font-size: clamp(${text.sm}, 2.5vw, ${text.lg});
  line-height: 1.7;
  margin: 0 0 ${space[6]};
  padding: ${space[6]} ${space[8]};
  background: oklch(0.18 0.02 290);
  color: oklch(0.9 0 0);
  border-radius: ${radius.lg};
  box-shadow: 1px 1px 20px ${color.shadow};
  max-width: 100%;
  overflow-x: auto;

  &::after {
    content: '|';
    animation: ${blink} 1s step-end infinite;
    color: oklch(0.75 0.15 290);
    font-weight: ${fontWeight.bold};
  }
`;

const Line = styled.span`
  display: block;
`;

const CSSLine = styled(Line)`
  padding-left: 2ch;
`;

const Comment = styled(Line)`
  color: oklch(0.55 0.02 290);
  font-style: italic;
`;

const Keyword = styled.span`
  color: oklch(0.7 0.15 290);
`;

const ComponentName = styled.span`
  color: oklch(0.75 0.12 30);
`;

const FnName = styled.span`
  color: oklch(0.72 0.14 200);
`;

const Punct = styled.span`
  color: oklch(0.6 0 0);
`;

const Tick = styled.span`
  color: oklch(0.72 0.12 150);
`;

const Prop = styled.span`
  color: oklch(0.72 0.14 200);
`;

const Value = styled.span`
  color: oklch(0.75 0.12 60);
`;

const Message = styled.p`
  font-size: ${text.base};
  color: ${color.textSecondary};
  margin: 0 0 ${space[10]};
  text-align: center;
`;

const FAQSection = styled.section`
  width: 100%;
  max-width: 64ch;
`;

const FAQHeading = styled.h2`
  font-size: ${text.sm};
  font-weight: ${fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${color.textMuted};
  margin: 0 0 ${space[4]};
  text-align: center;
`;

const FAQGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space[2]};
  justify-content: center;
`;

const FAQLink = styled(Link)`
  font-size: ${text.xs};
  padding: ${space[1]} ${space[3]};
  border-radius: ${radius.md};
  border: 1px solid ${color.border};
  background: ${color.surface};
  transition: background ${duration.normal}, border-color ${duration.normal};

  &:hover {
    background: ${color.accentSubtle};
    border-color: ${color.accent};
  }
`;
