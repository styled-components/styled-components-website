import styled from 'styled-components'
import Loading from '../components/Loading'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const LogosWrapper = styled.a`
  position: relative;
  height: 3rem;
  margin: 0.5rem;
  bottom: 0;
  opacity: 0.8;
  transition: opacity 125ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`
const SponsorLogo = styled.img`
  height: 100%;
`

const Svg = styled.svg`
  width: inherit;
  height: inherit;
`

 const NoProfileImage = () => (
  <Svg viewBox="0 0 320 320">
    <path d="M0,0v320h320V0H0z M314,314H6V6h308V314z"/>
    <path d="M159.9,170.3c26,0,45.6-37.4,45.6-61.6c0-25.2-20.5-45.6-45.6-45.6c-25.2,0-45.6,20.5-45.6,45.6 C114.3,132.9,133.9,170.3,159.9,170.3z M120.3,108.7c0-21.8,17.8-39.6,39.6-39.6c21.8,0,39.6,17.8,39.6,39.6 c0,11.3-4.6,25.3-12,36.5c-8,12.2-18.1,19.1-27.6,19.1c-9.6,0-19.6-7-27.6-19.1C124.9,133.9,120.3,119.9,120.3,108.7z"/>
    <path d="M131.1,257.1c8.2-0.1,17.6-0.2,28.8-0.2c11.2,0,20.6,0.1,28.8,0.2c5.9,0.1,11,0.1,15.4,0.1 c16.9,0,24.4-0.8,28.5-4.8c3.8-3.7,3.8-9.3,3.8-17.7c0-12.5-8.2-24.1-23-32.7c-14.3-8.3-33.3-12.9-53.5-12.9 c-20.2,0-39.2,4.6-53.5,12.9c-14.9,8.6-23,20.2-23,32.7c0,8.4,0,14,3.8,17.7C92.3,257.5,102.9,257.4,131.1,257.1z M159.9,195 c38.9,0,70.5,17.8,70.5,39.6c0,7.2,0,11.5-2,13.5c-3.4,3.4-15.5,3.2-39.6,3c-8.3-0.1-17.6-0.2-28.9-0.2s-20.6,0.1-28.9,0.2 c-24.1,0.3-36.2,0.4-39.6-3c-2-2-2-6.3-2-13.5C89.4,212.8,121,195,159.9,195z"/>
  </Svg>
)

function checkImageLink(imageLink){
  return /^(http|https)/.test(imageLink)
}

const HomepageSponsors = ({ sponsors }) => (
  <Wrapper>
    {sponsors.map(sponsor => 
      sponsor.tier == "Sponsor" ?
        <LogosWrapper key={sponsor.MemberId} href={sponsor.website || sponsor.profile} target="_blank">
        {
          sponsor.image && checkImageLink(sponsor.image)?
            <SponsorLogo key={sponsor.MemberId} src={sponsor.image} /> :
            <NoProfileImage  key={sponsor.MemberId} />
        }
        </LogosWrapper> : <Loading />
    )}
  </Wrapper>
)

export default HomepageSponsors
