import { Metadata } from 'next';
import styled from 'styled-components';
import DocsLayout from '@/components/DocsLayout';
import DocsPageNav from '@/components/DocsPageNav';
import { theme, font } from '@/utils/theme';

import MigrationV6 from '@/sections/faqs/migration-v6.mdx';
import DynamicStylingPatterns from '@/sections/faqs/dynamic-styling-patterns.mdx';
import WhenToUseAttrs from '@/sections/faqs/when-to-use-attrs.mdx';
import DeclareComponentsInRenderMethod from '@/sections/faqs/declare-components-in-render-method.mdx';
import Nesting from '@/sections/faqs/nesting.mdx';
import OverrideStyles from '@/sections/faqs/override-styles-with-higher-specificity.mdx';
import OverrideInlineStyles from '@/sections/faqs/override-inline-styles.mdx';
import HTMLAttributeWarnings from '@/sections/faqs/html-attribute-warnings.mdx';
import BrowserSupport from '@/sections/faqs/browser-support.mdx';
import TwoDomClasses from '@/sections/faqs/dom-two-classes.mdx';
import DuplicatedStyledComponents from '@/sections/faqs/duplicated-styled-components.mdx';
import CSSFrameworks from '@/sections/faqs/support-for-css-frameworks.mdx';
import LibraryAuthors from '@/sections/faqs/library-authors.mdx';
import FlickeringText from '@/sections/faqs/flickering-text.mdx';
import NPMLink from '@/sections/faqs/npm-link.mdx';
import MissingNativeImport from '@/sections/faqs/missing-native-import.mdx';
import MigrationV5 from '@/sections/faqs/migration-v5.mdx';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Commonly asked questions about styled-components',
};

export default function FAQsPage() {
  return (
    <DocsLayout title="FAQs">
      <Category>Migration</Category>
      <MigrationV6 />
      <MigrationV5 />

      <Category>Styling Patterns</Category>
      <DynamicStylingPatterns />
      <WhenToUseAttrs />
      <DeclareComponentsInRenderMethod />
      <Nesting />
      <OverrideStyles />
      <OverrideInlineStyles />
      <CSSFrameworks />

      <Category>Troubleshooting</Category>
      <HTMLAttributeWarnings />
      <TwoDomClasses />
      <DuplicatedStyledComponents />
      <FlickeringText />
      <NPMLink />
      <MissingNativeImport />

      <Category>General</Category>
      <BrowserSupport />
      <LibraryAuthors />
      <DocsPageNav current="faqs" />
    </DocsLayout>
  );
}

const Category = styled.h2`
  font-family: ${font.sans};
  font-size: ${theme.text.xl};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.color.text};
  margin: ${theme.space[10]} 0 ${theme.space[2]};
  padding-bottom: ${theme.space[2]};
  border-bottom: 1px solid ${theme.color.border};

  &:first-of-type {
    margin-top: ${theme.space[6]};
  }
`;
