import styled from 'styled-components'
import tweets from '../tweets.json'
import TweetList from '../../components/TweetList'
import { violetRed, gold } from '../../utils/colors'
import rem from '../../utils/rem'
import { Content } from '../../components/Layout'
import Link from '../../components/Link'
import { headerFont } from '../../utils/fonts'
import HeartIcon from 'react-octicons-svg/dist/HeartIcon'

const Title = styled.div`
  margin: 2rem 0;

  h1,
  h2 {
    margin: 0;
  }
`

const Tagline = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
`

const SupportingTagline = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
`

const Logo = styled.img.attrs({
  alt: 'styled-components Logo',
  src: '/static/logo.png'
})`
  width: ${rem(125)};
  height: ${rem(125)};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  background: linear-gradient(20deg, ${violetRed}, ${gold});
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
`

const HeroContent = Content.extend`
  font-family: ${headerFont};
  width: 75rem;
`

const Heart = styled(HeartIcon).attrs({
  width: null,
  height: null
})`
  display: inline-block;
  width: ${rem(17)};
`

const WallOfLove = () => (
  <div>
    <Wrapper>
      <HeroContent>
        <Link href="/"><Logo /></Link>
        <Title>
          <Tagline>Wall of Love</Tagline>
          <SupportingTagline>A list of positive tweets about styled-components 💅🏿</SupportingTagline>
        </Title>
        <TweetList tweets={tweets} />
      </HeroContent>
      <HeroContent>
        {'Made with '}
        <Heart />
        {' by '}
        <Link inline white href="https://twitter.com/glenmaddern">@glenmaddern</Link>
        {', '}
        <Link inline white href="https://twitter.com/mxstbr">@mxstbr</Link>
        {' & '}
        <Link inline white href="https://twitter.com/_philpl">@_philpl‬</Link>
      </HeroContent>

    </Wrapper>
  </div>
)

export default WallOfLove
