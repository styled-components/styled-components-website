import DocsLayout from '@/components/DocsLayout';

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

export default function FAQsPage() {
  return (
    <DocsLayout title="FAQs" description="Commonly asked questions about styled-components">
      <MigrationV6 />
      <DynamicStylingPatterns />
      <WhenToUseAttrs />
      <DeclareComponentsInRenderMethod />
      <Nesting />
      <OverrideStyles />
      <OverrideInlineStyles />
      <HTMLAttributeWarnings />
      <BrowserSupport />
      <TwoDomClasses />
      <DuplicatedStyledComponents />
      <CSSFrameworks />
      <LibraryAuthors />
      <FlickeringText />
      <NPMLink />
      <MissingNativeImport />
      <MigrationV5 />
    </DocsLayout>
  );
}
