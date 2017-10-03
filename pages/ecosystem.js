import React from 'react'
import DocsLayout from '../components/DocsLayout'
import { getReadme } from '../utils/githubApi'
import md from '../components/md'
import Loading from '../components/Loading'

const Ecosystem = ({ readme }) => (
    <DocsLayout title="Ecosystem" description="Ecosystem of styled-components">
      {typeof readme !== 'string' ? <Loading /> : md([readme])}
    </DocsLayout>
  )

Ecosystem.getInitialProps = async () => {
  const readme = await getReadme()

  return { readme }
}

export default Ecosystem
