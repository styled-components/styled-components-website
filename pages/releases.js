import React from 'react'
import styled from 'styled-components'
import DocsLayout from '../components/DocsLayout'
import { getReleases } from '../utils/githubApi'
import md from '../components/md'
import Anchor from '../components/Anchor'
import Loading from '../components/Loading'
import rem from '../utils/rem'
import { getFormattedDate } from '../utils/dates'


const ReleaseName = styled.span`
  margin-top: ${rem(40)};
  margin-bottom: ${rem(-20)};
  display: block;
`

const Releases = ({ releases, sidebarPages }) => (
  <DocsLayout
    useDocsSidebarMenu={false}
    pages={sidebarPages}
    title="Releases"
    description="Styled Components Releases"
  >
    {md`
      Updating styled components is usually just an \`npm install\`, only major version might have breaking changes that will be noted in the [CHANGELOG](https://github.com/styled-components/styled-components/blob/master/CHANGELOG.md)
    `}
    {releases ? releases.map(release =>
      <section key={release.id}>
        <Anchor id={release.name.split('.').join("")}>
          <ReleaseName>{release.name} <i>({getFormattedDate(release.created_at)})</i></ReleaseName>
        </Anchor>
        {md(release.body)}
      </section>
    ) : <Loading />}
  </DocsLayout>
)

Releases.getInitialProps = async () => {
  const releases = await getReleases()

  return {
    releases,
    sidebarPages: releases.map(release => ({ title: release.name, href: release.name }))
  }
}

export default Releases
