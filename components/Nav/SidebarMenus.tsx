import { useRouter, withRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import json from '../../pages/docs.json';
import rem from '../../utils/rem';
import titleToDash from '../../utils/titleToDash';
import Link, { StyledLink } from '../Link';

const { pages } = json;

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

export interface FolderProps {
  children?: (options: { rootProps: FolderProps; toggleSubSections: () => void; isOpen?: boolean }) => JSX.Element;
  isOpenDefault?: boolean;
}

function Folder({ children, isOpenDefault = false, ...props }: FolderProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleSubSections = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen !== isOpenDefault) setIsOpen(!!isOpenDefault);
    // it's fine to grab the current value of isOpen when isOpenDefault changes, if ever
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenDefault]);

  return typeof children === 'function'
    ? children({
        rootProps: props,
        toggleSubSections,
        isOpen,
      })
    : null;
}

export interface DocsSidebarMenuProps {
  onRouteChange?: () => void;
}

export const DocsSidebarMenu = ({ onRouteChange }: DocsSidebarMenuProps) => {
  const router = useRouter();

  return (
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
  );
};

function getSectionPath(parentPathname: string, title: string) {
  return `${parentPathname}#${titleToDash(title)}`;
}

function isFolderOpen(
  currentHref: string,
  { pathname, title, sections }: { pathname: string; title: string; sections: { title: string }[] }
) {
  return (
    sections.reduce((sum, v) => sum || currentHref.endsWith(getSectionPath(pathname, v.title) || ''), false) ||
    currentHref.endsWith(pathname || '#' + titleToDash(title))
  );
}

export interface SimpleSidebarMenuProps {
  onRouteChange?: () => void;
  pages?: { title: string; pathname: string; sections: { title: string }[]; href: string }[];
}

export const SimpleSidebarMenu = ({ onRouteChange, pages = [] }: SimpleSidebarMenuProps) => {
  const router = useRouter();

  return (
    <MenuInner>
      {pages.map(({ title, pathname, sections, href }, idx) => {
        if (!sections) {
          return (
            <TopLevelLink key={idx}>
              <StyledLink href={pathname || '#' + (href || titleToDash(title))}>{title}</StyledLink>
            </TopLevelLink>
          );
        }

        return (
          <Folder key={idx} isOpenDefault={isFolderOpen(router.asPath, { title, pathname, sections })}>
            {({ rootProps, toggleSubSections, isOpen }) => (
              <Section {...rootProps} onClick={onRouteChange}>
                <SectionTitle onClick={toggleSubSections}>
                  <Link href={pathname || '#' + titleToDash(title)}>{title}</Link>
                </SectionTitle>

                {isOpen &&
                  sections.map(({ title }) => (
                    <SubSection key={title}>
                      <StyledLink href={getSectionPath(pathname, title)}>{title}</StyledLink>
                    </SubSection>
                  ))}
              </Section>
            )}
          </Folder>
        );
      })}
    </MenuInner>
  );
};
