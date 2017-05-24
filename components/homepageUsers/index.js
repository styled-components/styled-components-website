import React from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import { lightVioletRed } from '../../utils/colors'
import { Content, Title } from '../Layout'
import Link from '../Link'

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  background: ${lightVioletRed};
  border-radius: ${rem(5)};
  padding: ${rem(20)};
`

const CellWrapper = styled.div`
  background: white;
  border-radius: ${rem(5)};
  padding: ${rem(15)} ${rem(50)};
  margin: ${rem(10)};
`

const CellImage = styled.div`
  width: ${rem(180)};
  height: ${rem(70)};

  background-image: url('${p => p.src}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

const Cell = ({ href, src }) => (
  <Link inline href={href}>
    <CellWrapper>
      <CellImage src={src} />
    </CellWrapper>
  </Link>
)

const HomepageUsers = () => (
  <Content>
    <Title>Who's using styled-components?</Title>

    <Wrapper>
      <Cell href="https://bloomberg.com" src="/static/users/bloomberg.svg" />
      <Cell href="https://reddit.com" src="/static/users/reddit.svg" />
      <Cell href="https://target.com" src="/static/users/target.svg" />
      <Cell href="https://eurovision.tv" src="/static/users/eurovision.svg" />
      <Cell href="https://artsy.net" src="/static/users/artsy.svg" />
      <Cell href="https://ideo.com" src="/static/users/ideo.svg" />
    </Wrapper>
  </Content>
)

export default HomepageUsers
