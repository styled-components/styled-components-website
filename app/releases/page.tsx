import Markdown from 'markdown-to-jsx';
import DocsLayout, { type DocsLayoutProps } from '~/components/DocsLayout';
import ReleaseAnchor from '~/components/ReleaseAnchor';
import { getReleases } from '~/utils/githubApi';
import components from '~/utils/mdx-components';

export const revalidate = 30;

export default async function ReleasesPage() {
  const releases = await getReleases();

  const validReleases = releases.filter(release => release.name && release.tag_name);

  const sidebarPages: DocsLayoutProps['pages'] = validReleases.map(release => ({
    href: release.tag_name || '',
    pathname: '',
    sections: [],
    title: release.name || '',
  }));

  return (
    <DocsLayout
      useDocsSidebarMenu={false}
      pages={sidebarPages}
      title="Releases"
      description="Styled Components Releases"
    >
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
                {release.body
                  .replace(/#### (.*)/g, '## $1')
                  .replace(/### (.*)/g, '## $1')
                  .replace(/## (.*)/g, '### $1')}
              </Markdown>
            )}
          </section>
        );
      })}
    </DocsLayout>
  );
}
