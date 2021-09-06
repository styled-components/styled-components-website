import 'isomorphic-fetch';

export const getReadme = (repo = 'styled-components') =>
  fetch(`https://cdn.rawgit.com/styled-components/${repo}/master/README.md`).then((resp) => resp.text());

export const getReleasesURI = (repo = 'styled-components') =>
  `https://api.github.com/repos/styled-components/${repo}/releases`;

export const getReleasesAtomFeedURI = (repo = 'styled-components') =>
  `https://github.com/styled-components/${repo}/releases.atom`;

export const getReleases = (repo = 'styled-components') => fetch(getReleasesURI(repo)).then((resp) => resp.json());
