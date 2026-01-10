import DocsLayout from '@/components/DocsLayout';

import BabelPlugin from '@/sections/tooling/babel-plugin.mdx';
import SWCPlugin from '@/sections/tooling/swc-plugin.mdx';
import TypeScriptPlugin from '@/sections/tooling/typescript-plugin.mdx';
import Jest from '@/sections/tooling/jest.mdx';
import Stylelint from '@/sections/tooling/stylelint.mdx';
import StyledTheming from '@/sections/tooling/styled-theming.mdx';
import SyntaxHighlighting from '@/sections/tooling/syntax-highlighting.mdx';

export default function ToolingPage() {
  return (
    <DocsLayout title="Tooling" description="Working with styled-components in your development environment">
      <BabelPlugin />
      <SWCPlugin />
      <TypeScriptPlugin />
      <Jest />
      <Stylelint />
      <StyledTheming />
      <SyntaxHighlighting />
    </DocsLayout>
  );
}
