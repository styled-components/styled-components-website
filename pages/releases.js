import React from 'react';
import styled from 'styled-components';
import MDX from '@mdx-js/runtime';
import DocsLayout from '../components/DocsLayout';
import { getReleases } from '../utils/githubApi';
import Anchor from '../components/Anchor';
import Loading from '../components/Loading';
import rem from '../utils/rem';
import { getFormattedDate } from '../utils/dates';
import components from '../utils/mdx-components';

const ReleaseAnchor = styled(Anchor)`
  &::after {
    color: rgb(243, 182, 97);
    content: attr(data-created-at);
    display: block;
    font-size: 16px;
    margin-top: ${rem(-5)};
  }
`;

const Releases = ({ releases, sidebarPages }) => (
  <DocsLayout useDocsSidebarMenu={false} pages={sidebarPages} title="Releases" description="Styled Components Releases">
    <MDX components={components}>
      Updating styled components is usually as simple as \`npm install\`. Only major versions have the potential to
      introduce breaking changes (noted in the following release notes).
    </MDX>
    {releases ? (
      releases.map(release => (
        <section key={release.id}>
          <ReleaseAnchor id={release.name} data-created-at={getFormattedDate(release.created_at)}>
            {release.name}
          </ReleaseAnchor>
          <MDX components={components}>{release.body}</MDX>
        </section>
      ))
    ) : (
      <Loading />
    )}
  </DocsLayout>
);

Releases.getInitialProps = async () => {
  const releases = await getReleases();
  return {
    releases,
    sidebarPages: releases.map(release => ({
      title: release.name,
      href: release.name,
    })),
  };
};

export default Releases;
