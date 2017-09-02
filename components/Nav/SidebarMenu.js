import styled from 'styled-components'

import rem from '../../utils/rem'
import Link, { StyledLink } from '../Link'
import titleToDash from '../../utils/titleToDash'
// import { lightGrey } from '../../utils/colors'
// import { mobile } from '../../utils/media'

import { pages } from '../../pages/docs.json'

const MenuInner = styled.div`
  display: block;
  box-sizing: border-box;
  height: 100%;
  padding-top: ${rem(25)};
`

const Section = styled.div`
  margin-bottom: ${rem(30)};
`

const SectionTitle = styled.h4`
  display: block;
  margin: ${rem(10)} ${rem(40)};
  font-weight: normal;
`

const SubSection = styled.h5`
  display: block;
  margin: ${rem(10)} ${rem(40)} ${rem(10)} ${rem(55)};
  font-size: 0.9rem;
  font-weight: normal;
`

const SidebarMenu = ({ onRouteChange }) => (
  <MenuInner>
    {
      pages.map(({ title, pathname, sections }) => (
        <Section key={title} onClick={onRouteChange}>
          <SectionTitle>
            <Link href={`/docs/${pathname}`}>
              {title}
            </Link>
          </SectionTitle>

          {
            sections.map(({ title }) => (
              <SubSection key={title}>
                <StyledLink href={`/docs/${pathname}#${titleToDash(title)}`}>
                  {title}
                </StyledLink>
              </SubSection>
            ))
          }
        </Section>
      ))
    }
  </MenuInner>
)

export default SidebarMenu
