import React from 'react'
import DocsLayout from '../components/DocsLayout'
import { getReleases } from '../utils/githubApi'
import md from '../components/md'
import Anchor from '../components/Anchor'
import Loading from '../components/Loading'


function getFormattedDate(releaseDate) {
  const date = new Date(releaseDate)
  const year = date.getFullYear()
  let month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month
  let day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return day + '/' + month + '/' + year
}

const Ecosystem = ({ releases, sidebarPages }) => (
  <DocsLayout
    useDocsSidebarMenu={false}
    pages={sidebarPages}
    title="Releases"
    description="Styled Components Releases"
  >
    {releases ? releases.map(release =>
      <div key={release.id}>
        <Anchor id={release.name.split('.').join("")}>
          {release.name} <i>({getFormattedDate(release.created_at)})</i>
        </Anchor>
        {md(release.body)}
      </div>
    ) : <Loading />}
  </DocsLayout>
)

Ecosystem.getInitialProps = async () => {
  const releases = await getReleases()

  return {
    releases,
    sidebarPages: releases.map(release => ({ title: release.name, href: release.name }))
  }
}

export default Ecosystem
