import { Metadata } from 'next';
import Markdown from 'markdown-to-jsx';
import DocsLayout from '@/components/DocsLayout';
import Link from '@/components/Link';
import { getReadme } from '@/utils/githubApi';
import components from '@/utils/mdx-components';

export const metadata: Metadata = {
  title: 'Ecosystem',
  description: 'Ecosystem of styled-components',
};

export const revalidate = 3600;

export default async function EcosystemPage() {
  const readme = await getReadme('awesome-styled-components');

  const editedReadme =
    '\n' + readme.slice(readme.indexOf('### Built with styled-components'), readme.indexOf('### Contribute') + 1);

  return (
    <DocsLayout title="Ecosystem">
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
