import React, { Component } from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import titleToDash from '../../utils/titleToDash'
import { pages } from '../../pages/docs.json'
import Link, { StyledLink } from '../Link'

const MenuInner = styled.div`
  display: block;
  box-sizing: border-box;
  height: 100%;
  padding-top: ${rem(25)};
`

const TopLevelLink = styled.div`
  display: block;
  margin: ${rem(10)} ${rem(40)};
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

export const DocsSidebarMenu = ({ onRouteChange }) => (
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
                    {title}
                  </Link>
                </SectionTitle>

                {
                  isOpen && sections.map(({ title }) => (
                    <SubSection key={title}>
                      <StyledLink href={`/docs/${pathname}#${titleToDash(title)}`}>
                        {title}
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
)

function getSectionPath(parentPathname, title) {
  return `${parentPathname || ''}#${titleToDash(title)}`
}

function isFolderOpen(currentHref, { pathname, title, sections }) {
  return (
    sections.reduce((sum, v) => (
      sum || window.location.href.endsWith(getSectionPath(pathname, v.title))
    ), false) ||
    window.location.href.endsWith(pathname || '#' + titleToDash(title))
  )
}

export const SimpleSidebarMenu = ({ onRouteChange, pages = [] }) => (
  <MenuInner>
    {
      pages.map(({ title, pathname, sections }) => {

        if (!sections) {
          return (
            <TopLevelLink key={title}>
              <StyledLink href={pathname || '#' + titleToDash(title)}>
                {title}
              </StyledLink>
            </TopLevelLink>
          )
        }

        return (
          <Folder
            key={title}
            isOpenDefault={
              typeof window !== 'undefined' &&
                isFolderOpen(window.location.href, { title, pathname, sections })
            }
          >
            {({
              rootProps,
              toggleSubSections,
              isOpen,
            }) => (
              <Section {...rootProps} onClick={onRouteChange}>
                <SectionTitle onClick={toggleSubSections}>
                  <StyledLink unstyled href={pathname || '#' + titleToDash(title)}>
                    {title}
                  </StyledLink>
                </SectionTitle>

                {isOpen && sections.map(({ title }) => (
                  <SubSection key={title}>
                    <StyledLink unstyled href={getSectionPath(pathname, title)}>
                      {title}
                    </StyledLink>
                  </SubSection>
                ))}
              </Section>
            )}
          </Folder>
        )
      })
    }
  </MenuInner>
)
