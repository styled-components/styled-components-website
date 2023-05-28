import { ServerResponse } from 'http';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';
import Anchor from '../components/Anchor';
import DocsLayout, { DocsLayoutProps } from '../components/DocsLayout';
import Loading from '../components/Loading';
import { getReleases } from '../utils/githubApi';
import components from '../utils/mdx-components';
import rem from '../utils/rem';

export interface ReleasesProps {
  releases: Awaited<ReturnType<typeof getReleases>>;
  sidebarPages: DocsLayoutProps['pages'];
}

export default function Releases({ releases, sidebarPages }: ReleasesProps) {
  return (
    <DocsLayout
      useDocsSidebarMenu={false}
      pages={sidebarPages}
      title="Releases"
      description="Styled Components Releases"
    >
      <Markdown options={{ wrapper: 'p' }}>
        Updating styled components is usually as simple as `npm install`. Only major versions have the potential to
        introduce breaking changes (noted in the following release notes).
      </Markdown>
      {releases ? (
        releases.map(release => (
          <section key={release.id}>
            <ReleaseAnchor id={release.name!} data-created-at={release.created_at.replace(/T.*?$/, '')}>
              {release.name}
            </ReleaseAnchor>

            {release.body && <Markdown overrides={components}>{release.body}</Markdown>}
          </section>
        ))
      ) : (
        <Loading />
      )}
    </DocsLayout>
  );
}

Releases.getInitialProps = async ({ res }: { res: ServerResponse }): Promise<ReleasesProps> => {
  const releases = await getReleases();

  if (res) {
    // Revalidate this data every 30 seconds
    res.setHeader('cache-control', 's-maxage=30,stale-while-revalidate');
  }

  return {
    releases,
    sidebarPages: releases.map(release => ({
      href: release.name!,
      pathname: '',
      sections: [],
      title: release.name!,
    })),
  };
};

const ReleaseAnchor = styled(Anchor)`
  &::after {
    color: rosybrown;
    content: attr(data-created-at);
    display: block;
    font-size: 16px;
    margin-top: ${rem(-5)};
  }
`;
