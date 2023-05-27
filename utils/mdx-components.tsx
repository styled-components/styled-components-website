import { MDXProvider } from '@mdx-js/react';
import React from 'react';

import elementToText from './elementToText';
import titleToDash from './titleToDash';

// Components to be used as renderers
import Code from '../components/Code';
import LiveEdit from '../components/LiveEdit';
import CodeBlock from '../components/CodeBlock';
import Note from '../components/Note';
import Link from '../components/Link';
import { Title } from '../components/Layout';
import Anchor from '../components/Anchor';
import Label, { LabelGroup } from '../components/Label';

const Heading = ({ level, children }: React.PropsWithChildren<{ level: number }>) => {
  if (level === 1) {
    return <Title>{children}</Title>;
  }

  // The pipe indicates labels after the initial title
  const [_, ...labels] = elementToText(children).split('|');

  const title = React.Children.map(children, child => {
    if (typeof child === 'string') {
      const pipeIndex = child.indexOf('|');
      return pipeIndex > -1 ? child.slice(0, pipeIndex) : child;
    }

    return child;
  });

  const hash = titleToDash(title);

  return (
    <Anchor id={hash} level={level}>
      {title}
      {labels.length > 0 && (
        <LabelGroup>
          {labels.map((label, index) => (
            <Label key={index} $isVersion={label.trim().startsWith('v')}>
              {label.trim()}
            </Label>
          ))}
        </LabelGroup>
      )}
    </Anchor>
  );
};

Heading.displayName = 'Heading';

const components: React.ComponentProps<typeof MDXProvider>['components'] = {
  p({ children }) {
    return <p>{children}</p>;
  },

  code({ children: providedChildren, className = '' }) {
    const children = providedChildren as unknown as string;
    const language = className.replace(/language-/, '');

    if (language === 'react') {
      return <LiveEdit code={children.trim()} />;
    } else if (language === 'sh') {
      return <CodeBlock code={children.trim()} language="bash" />;
    } else if (language) {
      return <CodeBlock code={children.trim()} language={language} />;
    }

    return <Code>{children}</Code>;
  },

  blockquote({ children }) {
    return <Note>{children}</Note>;
  },

  a({ href, children }) {
    return (
      <Link href={href || ''} inline>
        {children}
      </Link>
    );
  },
  h1(props) {
    return <Heading {...props} level={1} />;
  },
  h2(props) {
    return <Heading {...props} level={2} />;
  },
  h3(props) {
    return <Heading {...props} level={3} />;
  },
  h4(props) {
    return <Heading {...props} level={4} />;
  },
  h5(props) {
    return <Heading {...props} level={5} />;
  },
};

export default components;
