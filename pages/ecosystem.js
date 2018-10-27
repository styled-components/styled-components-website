import React from 'react';
import MDX from '@mdx-js/runtime';
import components from '../utils/mdx-components';

import DocsLayout from '../components/DocsLayout';
import { getReadme } from '../utils/githubApi';
import escape from '../utils/escape';
import Loading from '../components/Loading';
import Link from '../components/Link';

const Ecosystem = ({ readme, sidebarPages }) => (
  <DocsLayout
    useDocsSidebarMenu={false}
    pages={sidebarPages}
    title="Ecosystem"
    description="Ecosystem of styled-components"
  >
    <p>
      This is an incomplete list of awesome things built with styled-components. If you have something to share, please
      add it to the{' '}
      <Link href="https://github.com/styled-components/awesome-styled-components" inline>
        awesome-styled-components
      </Link>{' '}
      repo on GitHub and it will automatically show up here!
    </p>
    {typeof readme !== 'string' ? (
      <Loading />
    ) : (
      <MDX components={components}>{`
        ${readme}

### Contribute

If you know any projects build with styled components contributions and suggestions are always welcome!
Please read the [contribution guidelines](https://github.com/styled-components/awesome-styled-components/blob/master/contributing.md) first and submit a PR.
      `}</MDX>
    )}
  </DocsLayout>
);

Ecosystem.getInitialProps = async () => {
  const readme = await getReadme('awesome-styled-components');
  const editedReadme = readme
    .slice(readme.indexOf('\n---\n### Built with styled-components'))
    .split('### Contribute')[0];

  const sidePages = collectPagesFromMd(readme);

  return {
    readme: editedReadme,
    sidebarPages: sidePages,
  };
};

export default Ecosystem;

function collectPagesFromMd(md) {
  const TocStartPos = md.indexOf('\n- [Built with styled-components]');
  const TocEndPos = md.indexOf('\n- [Contribute]', TocStartPos);
  const Toc = md.slice(TocStartPos, TocEndPos);
  const linesOfToC = Toc.split('\n');

  const headingIdentifier = '- ';
  const subHeadingIdentifier = '  - ';

  const sidePages = [];

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

function parseMarkdownLink(mdString) {
  const [, title, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(mdString);
  return { title: escape(title), href: escape(href) };
}
