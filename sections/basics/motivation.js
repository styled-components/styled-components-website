import React from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import md from 'components/md'

const videoHtml = (`
<iframe width="560" height="315" src="https://www.youtube.com/embed/bIK2NwoK9xk?start=89" frameborder="0" allowfullscreen></iframe>
`).trim()

const Video = styled.div.attrs({
  dangerouslySetInnerHTML: {
    __html: videoHtml
  }
})`
  display: block;
  box-shadow: ${rem(1)} ${rem(1)} ${rem(20)} rgba(20, 20, 20, 0.27);
  margin: ${rem(35)} 0;
  position: relative;
  padding-top: calc(1 / (16 / 9) * 100%);
  height: 0;
  
  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Motivation = () => md`
  ## Motivation

  This talk by Max Stoiber is a really thorough introduction to styled-components
  and goes through what the motivations behind its creation were, along with some
  other information to get started with.

  ${<Video />}
`

export default Motivation
