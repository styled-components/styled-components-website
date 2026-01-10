'use client';

import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import json from '~/app/docs.json';
import rem from '../../utils/rem';
import titleToDash from '../../utils/titleToDash';
import Link, { StyledLink } from '../Link';

const { pages } = json;

export interface SimpleSidebarMenuProps {
  pages?: { title: string; pathname?: string; sections: { title: string }[]; href: string }[];
}

export const SimpleSidebarMenu = ({ pages = [] }: SimpleSidebarMenuProps) => {
  return (
    <MenuInner>
      {pages.map(({ title, pathname, sections, href }, idx) => {
        if (!sections?.length) {
          return (
            <TopLevelLink key={idx}>
              <StyledLink href={pathname || '#' + (href || titleToDash(title))}>{title}</StyledLink>
            </TopLevelLink>
          );
        }

        return (
          <Section key={idx}>
            <SectionTitle>
              <Link href={pathname || '#' + titleToDash(title)}>{title}</Link>
            </SectionTitle>

            <SubSection key={title}>
              <StyledLink href={getSectionPath(pathname, title)}>{title}</StyledLink>
            </SubSection>
          </Section>
        );
      })}
    </MenuInner>
  );
};

const MenuInner = styled.div`
  display: block;
  box-sizing: border-box;
  height: 100%;
  padding-top: ${rem(60)};
`;

const TopLevelLink = styled.div<{ children?: React.ReactNode }>`
  display: block;
  margin: ${rem(10)} ${rem(40)};
`;

const Section = styled.div<{ children?: React.ReactNode }>`
  margin-bottom: ${rem(20)};
`;

const SectionTitle = styled.h4<{ children?: React.ReactNode }>`
  display: block;
  margin: ${rem(10)} ${rem(40)};
`;

const SubSection = styled.h5<{ children?: React.ReactNode }>`
  display: block;
  margin: ${rem(10)} ${rem(40)} ${rem(10)} ${rem(55)};
  font-size: 0.9rem;
  font-weight: normal;
`;

export interface DocsSidebarMenuProps {}

export const DocsSidebarMenu = (props: DocsSidebarMenuProps) => {
  const pathname = usePathname();

  return (
    <MenuInner>
      {pages.map(({ title, pathname: pagePathname, sections }) => (
        <Section key={title}>
          <SectionTitle>
            <Link href={`/docs/${pagePathname}`}>{title}</Link>
          </SectionTitle>

          {sections.map(({ title }) => (
            <SubSection key={title}>
              <StyledLink href={`/docs/${pagePathname}#${titleToDash(title)}`}>{title}</StyledLink>
            </SubSection>
          ))}
        </Section>
      ))}
    </MenuInner>
  );
};

function getSectionPath(parentPathname: string | undefined, title: string) {
  return `${parentPathname ?? ''}#${titleToDash(title)}`;
}
