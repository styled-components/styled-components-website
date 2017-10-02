import 'isomorphic-fetch'
import { atob} from 'isomorphic-base64'

export const getReadme = (repo = 'awesome-styled-components') =>
  fetch(`https://api.github.com/repos/styled-components/${repo}/readme`)
    .then(resp => resp.json())
    .then(data => atob(data.content))
