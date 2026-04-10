import { KeyboardArrowRight } from '@styled-icons/material';
import styled, { css } from 'styled-components';
import { theme, font } from '../utils/theme';
import { mobile } from '../utils/media';
import rem from '../utils/rem';
import Link, { LinkProps } from './Link';

const Wrapper = styled(Link).attrs({ variant: 'unstyled' as const })`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-end;

  width: 100%;
  padding: ${rem(40)} ${rem(20)};
  text-align: right;
  font-family: ${font.sans};

  ${mobile(css`
    text-align: left;
    justify-content: center;
    padding: ${rem(30)} ${rem(20)};
  `)};
`;

const Text = styled.h3`
  font-weight: ${theme.fontWeight.normal};
  padding-right: ${rem(20)};
  margin: 0;
`;

const PageName = styled.h2`
  font-family: ${font.display};
  font-weight: ${theme.fontWeight.semibold};
  padding-right: ${rem(20)};
  margin: 0;
  color: ${theme.color.accent};
  text-decoration: underline solid;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition:
    color ${theme.duration.fast},
    text-decoration-color ${theme.duration.fast};

  ${Wrapper}:hover &,
  ${Wrapper}:focus-visible & {
    color: ${theme.color.accentDark};
    text-decoration-color: ${theme.color.accentDark};
  }
`;

const Icon = styled(KeyboardArrowRight)`
  color: ${theme.color.textMuted};
  width: ${rem(30)};
`;

export interface NextPageProps extends Pick<LinkProps, 'href'> {
  title: string;
}

const NextPage = ({ title, href }: NextPageProps) => (
  <Wrapper href={href}>
    <div>
      <Text>Continue on the next page</Text>
      <PageName>{title}</PageName>
    </div>

    <div>
      <Icon />
    </div>
  </Wrapper>
);

export default NextPage;
