import Markdown from 'markdown-to-jsx';
import DocsLayout, { type DocsLayoutProps } from '~/components/DocsLayout';
import Link from '~/components/Link';
import escapeText from '~/utils/escape';
import { getReadme } from '~/utils/githubApi';
import components from '~/utils/mdx-components';

export const revalidate = 3600;

export default async function EcosystemPage() {
  const readme = await getReadme('awesome-styled-components');

  const editedReadme =
    '\n' + readme.slice(readme.indexOf('### Built with styled-components'), readme.indexOf('### Contribute') + 1);

  const sidebarPages = collectPagesFromMd(readme);

  return (
    <DocsLayout
      useDocsSidebarMenu={false}
      pages={sidebarPages}
      title="Ecosystem"
      description="Ecosystem of styled-components"
    >
      <p>
        This is an incomplete list of awesome things built with styled-components. If you have something to share,
        please add it to the{' '}
        <Link href="https://github.com/styled-components/awesome-styled-components" inline>
          awesome-styled-components
        </Link>{' '}
        repo on GitHub and it will automatically show up here!
      </p>

      <Markdown options={{ overrides: components }}>
        {`
## Contribute

If you know any projects build with styled components contributions and suggestions are always welcome!
Please read the [contribution guidelines](https://github.com/styled-components/awesome-styled-components/blob/master/contributing.md) first and submit a PR.${editedReadme}
        `.trim()}
      </Markdown>
    </DocsLayout>
  );
}

function collectPagesFromMd(md: string): DocsLayoutProps['pages'] {
  const TocStartPos = md.indexOf('\n- [Built with styled-components]');
  const TocEndPos = md.indexOf('\n- [Contribute]', TocStartPos);
  const Toc = md.slice(TocStartPos, TocEndPos);
  const linesOfToC = Toc.split('\n');

  const headingIdentifier = '- ';
  const subHeadingIdentifier = '  - ';

  const sidePages: DocsLayoutProps['pages'] = [];

  let lastHeadingIndex = 0;

  for (const line of linesOfToC) {
    if (line.startsWith(headingIdentifier)) {
      const { title } = parseMarkdownLink(line);
      sidePages.push({ title, pathname: '', href: '', sections: [] });
      lastHeadingIndex = sidePages.length - 1;
    } else if (line.startsWith(subHeadingIdentifier)) {
      const { title } = parseMarkdownLink(line);

      const lastHeading = sidePages[lastHeadingIndex];
      if (lastHeading) {
        lastHeading.sections = [...(lastHeading.sections || []), { title }];
      }
    }
  }

  return sidePages;
}

function parseMarkdownLink(mdString: string) {
  const match = /\[([^\]]+)\]\(([^)]+)\)/.exec(mdString);
  const title = match?.[1] ?? '';
  const href = match?.[2] ?? '';
  return { title: escapeText(title), href: escapeText(href) };
}
