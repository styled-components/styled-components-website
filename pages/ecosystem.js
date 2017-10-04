import React from 'react'
import DocsLayout from '../components/DocsLayout'
import { getReadme } from '../utils/githubApi'
import md from '../components/md'
import Loading from '../components/Loading'



const Ecosystem = ({ readme }) => (
    <DocsLayout title="Ecosystem" description="Ecosystem of styled-components">
      {typeof readme !== 'string' ? <Loading /> : md(
          `${readme}

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
