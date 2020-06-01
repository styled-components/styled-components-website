import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';

import rem from '../../utils/rem';
import titleToDash from '../../utils/titleToDash';
import { pages } from '../../pages/docs.json';
import Link, { StyledLink } from '../Link';

const MenuInner = styled.div`
  display: block;
  box-sizing: border-box;
  height: 100%;
  padding-top: ${rem(60)};
`;

const TopLevelLink = styled.div`
  display: block;
  margin: ${rem(10)} ${rem(40)};
`;

const Section = styled.div`
  margin-bottom: ${rem(20)};
`;

const SectionTitle = styled.h4`
  display: block;
  margin: ${rem(10)} ${rem(40)};
  font-weight: normal;
`;

const SubSection = styled.h5`
  display: block;
  margin: ${rem(10)} ${rem(40)} ${rem(10)} ${rem(55)};
  font-size: 0.9rem;
  font-weight: normal;
`;

function Folder({ children, isOpenDefault = false, ...props }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleSubSections = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen !== isOpenDefault) setIsOpen(!!isOpenDefault);
  }, [isOpenDefault]);

  return typeof children === 'function'
    ? children({
        rootProps: props,
        toggleSubSections,
        isOpen,
      })
    : null;
}

export const DocsSidebarMenu = withRouter(({ onRouteChange, router }) => (
  <MenuInner>
    {pages.map(({ title, pathname, sections }) => (
      <Folder key={title} isOpenDefault={router && router.pathname === `/docs/${pathname}`}>
        {({ rootProps, toggleSubSections, isOpen }) => (
          <Section {...rootProps} onClick={onRouteChange}>
            <SectionTitle onClick={toggleSubSections}>
              <Link href={`/docs/${pathname}`}>{title}</Link>
            </SectionTitle>

            {isOpen &&
              sections.map(({ title }) => (
                <SubSection key={title}>
                  <StyledLink href={`/docs/${pathname}#${titleToDash(title)}`}>{title}</StyledLink>
                </SubSection>
              ))}
          </Section>
        )}
      </Folder>
    ))}
  </MenuInner>
));

function getSectionPath(parentPathname, title) {
  return `${parentPathname || ''}#${titleToDash(title)}`;
}

function isFolderOpen(currentHref, { pathname, title, sections }) {
  return (
    sections.reduce((sum, v) => sum || window.location.href.endsWith(getSectionPath(pathname, v.title)), false) ||
    window.location.href.endsWith(pathname || '#' + titleToDash(title))
  );
}

export const SimpleSidebarMenu = ({ onRouteChange, pages = [] }) => (
  <MenuInner>
    {pages.map(({ title, pathname, sections, href }) => {
      if (!sections) {
        return (
          <TopLevelLink key={title}>
            <StyledLink href={pathname || '#' + (href || titleToDash(title))}>{title}</StyledLink>
          </TopLevelLink>
        );
      }

      return (
        <Folder
          key={title}
          isOpenDefault={
            typeof window !== 'undefined' && isFolderOpen(window.location.href, { title, pathname, sections })
          }
        >
          {({ rootProps, toggleSubSections, isOpen }) => (
            <Section {...rootProps} onClick={onRouteChange}>
              <SectionTitle onClick={toggleSubSections}>
                <Link href={pathname || '#' + titleToDash(title)}>{title}</Link>
              </SectionTitle>

              {isOpen &&
                sections.map(({ title }) => (
                  <SubSection key={title}>
                    <StyledLink unstyled href={getSectionPath(pathname, title)}>
                      {title}
                    </StyledLink>
                  </SubSection>
                ))}
            </Section>
          )}
        </Folder>
      );
    })}
  </MenuInner>
);
