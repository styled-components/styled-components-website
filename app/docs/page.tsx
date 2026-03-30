import { Metadata } from 'next';
import styled, { css } from 'styled-components';

import { Header } from '@/components/Layout';
import { mobile, phone } from '@/utils/media';
import { theme, font } from '@/utils/theme';
import DocsLayout from '@/components/DocsLayout';
import json from '@/app/docs.json';
import Link from '@/components/Link';
import rem from '@/utils/rem';
import titleToDash from '@/utils/titleToDash';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to use styled-components',
};

const { pages } = json;

const faqCategories = [
  {
    label: 'Migration',
    items: ['What do I need to do to migrate to v6?', 'What do I need to do to migrate to v5?'],
  },
  {
    label: 'Styling Patterns',
    items: [
      'How should I handle dynamic styles?',
      'When to use attrs?',
      'Why should I avoid declaring styled components in the render method?',
      'Can I nest rules?',
      'How can I override styles with higher specificity?',
      'How can I override inline styles?',
      'Can I use css frameworks?',
    ],
  },
  {
    label: 'Troubleshooting',
    items: [
      'Why am I getting HTML attribute warnings?',
      'Why do my DOM nodes have two classes?',
      'Why am I getting a warning about several instances of module on the page?',
      'How do I fix flickering text after server side rendering?',
      'How can I fix issues when using npm link or yarn link?',
      'Missing Declarations for styled-components/native?',
    ],
  },
  {
    label: 'General',
    items: [
      'Which browsers are supported?',
      'I am a library author. Should I bundle styled-components with my library?',
    ],
  },
];

export default function Documentation() {
  return (
    <DocsLayout title="Documentation">
      <p>
        Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, styled-components
        allows you to write actual CSS code to style your components. It also removes the mapping between components and
        styles – using components as a low-level styling construct could not be easier!
      </p>

      <Row>
        {pages.map(({ title, pathname, sections }) => {
          if (pathname === 'faqs') {
            return (
              <FaqColumn key={title}>
                <Header>
                  <Link variant="heading" href={`/docs/${pathname}`}>
                    {title}
                  </Link>
                </Header>

                {faqCategories.map(cat => (
                  <FaqGroup key={cat.label}>
                    <CategoryLabel>{cat.label}</CategoryLabel>
                    {cat.items.map(item => (
                      <SubHeader key={item}>
                        <Link variant="heading" href={`/docs/${pathname}#${titleToDash(item)}`}>
                          {item}
                        </Link>
                      </SubHeader>
                    ))}
                  </FaqGroup>
                ))}
              </FaqColumn>
            );
          }

          return (
            <Column key={title}>
              <Header>
                <Link variant="heading" href={`/docs/${pathname}`}>
                  {title}
                </Link>
              </Header>

              {sections.map(({ title }) => (
                <SubHeader key={title}>
                  <Link variant="heading" href={`/docs/${pathname}#${titleToDash(title)}`}>
                    {title}
                  </Link>
                </SubHeader>
              ))}
            </Column>
          );
        })}
      </Row>
    </DocsLayout>
  );
}

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Column = styled.div<{ children?: React.ReactNode }>`
  width: 33%;
  max-width: 33%;
  flex-basis: 33%;
  padding-right: ${rem(15)};

  ${mobile(css`
    width: 50%;
    max-width: 50%;
    flex-basis: 50%;
  `)}

  ${phone(css`
    width: 100%;
    max-width: 100%;
    flex-basis: 100%;
  `)}
`;

const FaqColumn = styled(Column)`
  width: 100%;
  max-width: 100%;
  flex-basis: 100%;
`;

const FaqGroup = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
  padding-right: ${rem(15)};
  margin-bottom: ${theme.space[6]};

  ${phone(css`
    width: 100%;
  `)}
`;

const CategoryLabel = styled.h4`
  font-size: ${theme.text.xs};
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.color.textMuted};
  margin: 0 0 ${theme.space[2]};
  padding-bottom: ${theme.space[1]};
  border-bottom: 1px solid ${theme.color.border};
`;

const SubHeader = styled.h3<{ children?: React.ReactNode }>`
  display: block;
  margin: ${rem(8)} 0;
  font-size: ${rem(18)};
  font-weight: normal;
  font-family: ${font.sans};
`;
