import React from 'react'
import DocsLayout from '../components/DocsLayout'
import { getReadme } from '../utils/githubApi'
import md from '../components/md'
import Loading from '../components/Loading'
import Link from '../components/Link'



const Ecosystem = ({ readme }) => (
    <DocsLayout title="Ecosystem" description="Ecosystem of styled-components">
    <p>
      This is an incomplete list of awesome things built with styled-components. If you have something to share, please add it to the <Link href="https://github.com/styled-components/awesome-styled-components" inline>awesome-styled-components</Link> repo on GitHub and it will automatically show up here!
    </p>
      {typeof readme !== 'string' ? <Loading /> : md(
          `
          ${readme}

### Contribute

If you know any projects build with styled components contributions and suggestions are always welcome !
Please read the [contribution guidelines](https://github.com/styled-components/awesome-styled-components/blob/master/contributing.md) first and submit a PR.
          `)}
    </DocsLayout>
  )

Ecosystem.getInitialProps = async () => {
  const readme = await getReadme('awesome-styled-components')
  return {
    readme: readme
      .split('### Built with styled-components')[1]
      .split('### Contribute')[0]
  }
}

export default Ecosystem
