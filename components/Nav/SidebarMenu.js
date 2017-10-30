import React, { Component } from 'react'
import styled from 'styled-components'
import { I18n } from 'react-i18next'

import rem from '../../utils/rem'
import Link, { StyledLink } from '../Link'
import titleToDash from '../../utils/titleToDash'
// import { lightGrey } from '../../utils/colors'
// import { mobile } from '../../utils/media'

import { pages } from '../../pages/docs.json'

import {
  NAV_TRANSLATION,
} from '../../constants/i18n'

const MenuInner = styled.div`
  display: block;
  box-sizing: border-box;
  height: 100%;
  padding-top: ${rem(25)};
`

const Section = styled.div`
  margin-bottom: ${rem(20)};
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

class Folder extends Component {
  state = {
    isOpen: false,
  }

  toggleSubSections = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentWillMount() {
    this.setState({ isOpen: this.props.isOpenDefault })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpenDefault })
  }

  render() {
    // eslint-disable-next-line
    const { children, isOpenDefault, ...props } = this.props
    const { isOpen } = this.state

    return typeof children === 'function'
      ? children({ rootProps: props, toggleSubSections: this.toggleSubSections, isOpen })
      : null
  }
}

const SidebarMenu = ({ onRouteChange }) => (
  <I18n
    ns={NAV_TRANSLATION}
  >
    {translate => (
      <MenuInner>
        {
          pages.map(({ title, pathname, sections }) => (
              <Folder
                key={title}
                isOpenDefault={
                  typeof window !== 'undefined' &&
                    (window.location.pathname === `/docs/${pathname}`)
                }
              >
                {({
                  rootProps,
                  toggleSubSections,
                  isOpen,
                }) => (
                  <Section {...rootProps} onClick={onRouteChange}>
                    <SectionTitle onClick={toggleSubSections}>
                      <Link href={`/docs/${pathname}`}>
                        {translate(title)}
                      </Link>
                    </SectionTitle>

                    {
                      isOpen && sections.map(({ title }) => (
                        <SubSection key={title}>
                          <StyledLink href={`/docs/${pathname}#${titleToDash(translate(title))}`}>
                            {translate(title)}
                          </StyledLink>
                        </SubSection>
                      ))
                    }
                    </Section>
                )}
              </Folder>
          ))
        }
      </MenuInner>
    )}
  </I18n>
)

export default (SidebarMenu)
