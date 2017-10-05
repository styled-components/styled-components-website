import 'isomorphic-fetch'

export const getReadme = (repo = 'styled-components') =>
  fetch(`https://cdn.rawgit.com/styled-components/${repo}/master/README.md`)
    .then(resp => resp.text())


