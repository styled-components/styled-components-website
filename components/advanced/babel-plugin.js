import React from 'react';
import SectionLayout from '../SectionLayout';
import CodeBlock from '../CodeBlock';
import Code from '../Code';
import Note from '../Note';
import Link from '../Link'

const installNPM = `
npm install --save-dev babel-plugin-styled-components
`.trim();

const usage = `
{
  "plugins": ["styled-components"]
}
`.trim();

const ssr = `
{
  "plugins": [
    ["styled-components", {
      "ssr": true
    }]
  ]
}
`.trim();

const displayName = `
{
  "plugins": [
    ["styled-components", {
      "displayName": false
    }]
  ]
}
`.trim();

const preprocess = `
{
  "plugins": [
    ["styled-components", {
      "preprocess": true
    }]
  ]
}
`.trim();

const minify = `
{
  "plugins": [
    ["styled-components", {
      "minify": false
    }]
  ]
}
`.trim();

const transpilation = `
{
  "plugins": [
    ["styled-components", {
      "transpileTemplateLiterals": false
    }]
  ]
}
`.trim();

const BabelPlugin = () =>
  <SectionLayout title="Babel Plugin" labels={['v2']}>
    <p>
      This plugin adds support for server-side rendering, for minification of
      styles and gives you a nicer debugging experience.
    </p>
    <SectionLayout sub title="Usage">
      <p>Install the babel-plugin first:</p>
      <CodeBlock code={installNPM} language="node" />
      <p>Then add it to your babel configuration like so:</p>
      <CodeBlock code={usage} language="node" />
    </SectionLayout>
    <SectionLayout sub title="Server-side rendering">
      <Note>This option is turned off by default</Note>
      <p>
        By adding a unique identifier to every styled component this plugin
        avoids checksum mismatches due to different class generation on the
        client and on the server. If you do not use this plugin and try to
        server-side render styled-components React will complain.
      </p>
      <p>
        You can enable it with the <Code>ssr</Code> option:
      </p>
      <CodeBlock code={ssr} language="node" />
    </SectionLayout>
    <SectionLayout sub title="Better debugging">
      <p>
        This options adds the components' name and displayName to the class name
        attached to the DOM node. In your browser's DevTools you'll see:{' '}
        <Code>
          &lt;button class=&quot;sc-Button-asdf123 asdf123&quot; /&gt;
        </Code>{' '}
        instead of just <Code>&lt;button class=&quot;asdf123&quot; /&gt;</Code>.
      </p>
      <p>
        This also adds support for showing your components' real name in the
        React DevTools. Consider writing a styled component that renders a{' '}
        <Code>button</Code> element, called <Code>MyButton</Code>. It will
        normally show up as <Code>&lt;styled.button&gt;</Code> for all of your
        components, but with this plugin they show{' '}
        <Code>&lt;MyButton /&gt;</Code>.
      </p>
      <p>
        This makes it easier to find your components and to figure out where
        they live in your app.
      </p>
      <p>
        If you don't need this feature, you can disable it with the{' '}
        <Code>displayName</Code> option:
      </p>
      <CodeBlock code={displayName} language="node" />
    </SectionLayout>
    <SectionLayout sub title="Preprocessing">
      <Note>
        This is experimental and we don't yet know of all limitations and bugs!
        Consider this non-production ready for now. ⚠️
      </Note>
      <p>
        This plugin preprocesses your styles with stylis and uses the{' '}
        <Code>no-parser.js</Code> entrypoint on styled-components.
      </p>
      <p>
        This effectively removes stylis from your runtime bundle and should
        slightly improve runtime performance and shrink your bundle size.
      </p>
      <p>
        It automatically disables the <Code>minify</Code> option, since stylis
        already does some minification on your CSS.
      </p>
      <p>
        You can enable preprocessing with the <Code>preprocess</Code> option:
      </p>
      <CodeBlock code={preprocess} language="node" />
    </SectionLayout>
    <SectionLayout sub title="Minification">
      <Note>
        This option is turned on by default. If you experience mangled CSS
        results, turn it off and open an issue please.
      </Note>
      <p>
        This plugin minifies your styles in the tagged template literals, giving
        you big bundle size savings.
      </p>
      <Note>
        This operation may potentially break your styles in some rare cases, so
        we recommend to keep this option enabled in development if it's enabled
        in the production build.
      </Note>
      <p>
        You can disable minification with the <Code>minify</Code> option:
      </p>
      <CodeBlock code={minify} language="node" />
    </SectionLayout>
    <SectionLayout sub title="Template String Transpilation">
      <p>
        We also transpile <Code>styled-components</Code> tagged template
        literals down to a smaller representation than what Babel normally does,
        because <Code>styled-components</Code> template literals don't need to
        be 100% spec compliant. Read more about{' '}
        <Link inline href="#tagged-template-literals">Tagged Template Literals</Link> for
        more information about this. You can use the {' '}
        <Code>transpileTemplateLiterals</Code> option to turn this feature off.
      </p>
      <CodeBlock code={transpilation} language="node" />
    </SectionLayout>
  </SectionLayout>;

export default BabelPlugin;
