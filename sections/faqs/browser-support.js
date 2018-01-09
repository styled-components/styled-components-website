import md from "components/md"

const BrowserSupport = () => md`
  ## Which browsers does styled-components support?

  Styled-components supports all the browsers that ReactDOM supports.
  Please do read the [React docs section](https://reactjs.org/docs/react-dom.html#browser-support) to learn more.
  However, the short version is that ReactDOM currently supports "IE9+", i.e. any browser and version that was released since - and including - IE9. 
`

export default BrowserSupport