## How do I use styled-components with `create-react-app`?

The basic functionality of the library should work out of the box like any other library.

However, if you want to do server-side rendering or take advantage of some of the advanced capabilities of the [styled-components babel plugin](/docs/tooling#babel-plugin) without ejecting you'll need to set up [`react-app-rewired`](https://github.com/timarney/react-app-rewired) and [`react-app-rewire-styled-components`](https://github.com/withspectrum/react-app-rewire-styled-components).
