import { Metadata } from 'next';
import Markdown from 'markdown-to-jsx';
import DocsLayout from '@/components/DocsLayout';
import ReleaseAnchor from '@/components/ReleaseAnchor';
import { getReleases, getReleasesAtomFeedURI } from '@/utils/githubApi';
import components from '@/utils/mdx-components';

export const metadata: Metadata = {
  title: 'Releases',
  description: 'Styled Components Releases',
  alternates: {
    types: {
      'application/atom+xml': getReleasesAtomFeedURI(),
    },
  },
};

const REPO = 'https://github.com/styled-components/styled-components';

function linkifyGitHub(text: string): string {
  return (
    text
      // Issue/PR numbers: #1234 → link (but not inside existing markdown links or URLs)
      .replace(/(?<!\[|\/|&)#(\d{1,6})\b/g, `[#$1](${REPO}/issues/$1)`)
      // Standalone commit SHAs: 7+ hex chars not already inside a link or URL
      .replace(/(?<!\[|\/|\w)([0-9a-f]{7,40})(?!\w|\])/g, `[\`$1\`](${REPO}/commit/$1)`)
  );
}

export const revalidate = 30;

export default async function ReleasesPage() {
  const releases = await getReleases();

  const validReleases = releases.filter(release => release.name && release.tag_name);

  return (
    <DocsLayout title="Releases">
      <p>
        Updating styled components is usually as simple as <code>npm update styled-components</code>. Only major
        versions have the potential to introduce breaking changes (noted in the following release notes).
      </p>

      {validReleases.map(release => {
        const releaseName = release.name || '';
        const releaseDate = release.created_at?.replace(/T.*?$/, '') || '';

        return (
          <section key={release.id}>
            <ReleaseAnchor id={releaseName} data-created-at={releaseDate}>
              {releaseName}
            </ReleaseAnchor>

            {release.body && (
              <Markdown
                options={{
                  overrides: components,
                }}
              >
                {linkifyGitHub(
                  release.body
                    .replace(/#### (.*)/g, '## $1')
                    .replace(/### (.*)/g, '## $1')
                    .replace(/## (.*)/g, '### $1')
                )}
              </Markdown>
            )}
          </section>
        );
      })}
    </DocsLayout>
  );
}
