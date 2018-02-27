import 'isomorphic-fetch'

  export const getSponsors = () =>
  fetch(`https://opencollective.com/styled-components/members/all.json`)
    .then(resp => resp.json())


