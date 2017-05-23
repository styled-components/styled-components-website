import React from 'react'
import styled from 'styled-components'

import rem from '../utils/rem'
import titleToDash from '../utils/titleToDash'
import Anchor from './Anchor'

const Wrapper = styled.div`
  margin-bottom: ${p => p.sub ? rem(30) : rem(90)};
  margin-top: ${p => p.sub ? rem(30) : 0};
`

const SectionLayout = ({ children, title, sub }) => {
  const hash = titleToDash(title)

  return (
    <Wrapper sub={sub}>
      <Anchor id={hash} sub={sub}>
        {title}
      </Anchor>

      {children}
    </Wrapper>
  )
}

export default SectionLayout
