import DocsLayout from '@/components/DocsLayout';

import Vite from '@/sections/tooling/vite.mdx';
import SWCPlugin from '@/sections/tooling/swc-plugin.mdx';
import BabelPlugin from '@/sections/tooling/babel-plugin.mdx';
import Testing from '@/sections/tooling/jest.mdx';
import Stylelint from '@/sections/tooling/stylelint.mdx';
import TypeScriptPlugin from '@/sections/tooling/typescript-plugin.mdx';
import SyntaxHighlighting from '@/sections/tooling/syntax-highlighting.mdx';
import StyledTheming from '@/sections/tooling/styled-theming.mdx';

export default function ToolingPage() {
  return (
    <DocsLayout title="Tooling" description="Working with styled-components in your development environment">
      <Vite />
      <SWCPlugin />
      <BabelPlugin />
      <Testing />
      <Stylelint />
      <TypeScriptPlugin />
      <SyntaxHighlighting />
      <StyledTheming />
    </DocsLayout>
  );
}
