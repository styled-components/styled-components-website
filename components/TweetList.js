import styled from 'styled-components'
import TweetEmbed from 'react-tweet-embed'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  float: none;
  margin: auto;
`

const Tweet = styled(TweetEmbed)`
  margin: 50px;
  max-width: 500px;
`

const TweetList = ({ tweets }) => (
  <Wrapper>
    {tweets.map((tweet) => <Tweet key={tweet} id={tweet} />)}
  </Wrapper>
)

export default TweetList
