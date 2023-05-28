import Markdown from 'markdown-to-jsx';
import { NextApiResponse } from 'next';
import DocsLayout, { DocsLayoutProps } from '../components/DocsLayout';
import Link from '../components/Link';
import Loading from '../components/Loading';
import escape from '../utils/escape';
import { getReadme } from '../utils/githubApi';
import components from 'utils/mdx-components';

export interface EcosystemProps {
  readme: string;
  sidebarPages: DocsLayoutProps['pages'];
}

export default function Ecosystem({ readme, sidebarPages }: EcosystemProps) {
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

      {typeof readme !== 'string' ? (
        <Loading />
      ) : (
        <Markdown overrides={components}>
          {`
## Contribute

If you know any projects build with styled components contributions and suggestions are always welcome!
Please read the [contribution guidelines](https://github.com/styled-components/awesome-styled-components/blob/master/contributing.md) first and submit a PR.${readme}
        `.trim()}
        </Markdown>
      )}
    </DocsLayout>
  );
}

Ecosystem.getInitialProps = async ({ res }: { res: NextApiResponse }) => {
  const readme = await getReadme('awesome-styled-components');

  const editedReadme =
    '\n' + readme.slice(readme.indexOf('### Built with styled-components'), readme.indexOf('### Contribute') + 1);

  const sidePages = collectPagesFromMd(readme);

  if (res) {
    // Revalidate this data once an hour
    res.setHeader('cache-control', 's-maxage=3600,stale-while-revalidate');
  }

  return {
    readme: editedReadme,
    sidebarPages: sidePages,
  };
};

function collectPagesFromMd(md: string) {
  const TocStartPos = md.indexOf('\n- [Built with styled-components]');
  const TocEndPos = md.indexOf('\n- [Contribute]', TocStartPos);
  const Toc = md.slice(TocStartPos, TocEndPos);
  const linesOfToC = Toc.split('\n');

  const headingIdentifier = '- ';
  const subHeadingIdentifier = '  - ';

  const sidePages: { sections?: { href: string; title: string }[]; title?: string }[] = [];

  let lastHeadingIndex = 0;

  for (let line of linesOfToC) {
    if (line.startsWith(headingIdentifier)) {
      const { title } = parseMarkdownLink(line);
      // Add heading to the sidePages array
      sidePages.push({ title /* pathname */ });
      // Due a bug in our strigifier these Github
      // generated links does not work here :(

      // Set lastHeadingIndex so we can add sections later
      lastHeadingIndex = sidePages.length - 1;
    } else if (line.startsWith(subHeadingIdentifier)) {
      const { title, href } = parseMarkdownLink(line);

      const lastHeading = sidePages[lastHeadingIndex];
      // Check if it's there
      if (lastHeading) {
        lastHeading.sections = [...(lastHeading.sections || []), { title, href }];
      }
    }
  }

  return sidePages;
}

function parseMarkdownLink(mdString: string) {
  const [, title, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(mdString)!;
  return { title: escape(title), href: escape(href) };
}
