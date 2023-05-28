import { Favorite } from '@styled-icons/material';
import styled, { css } from 'styled-components';
import { grey, paleGrey, red } from '../../utils/colors';
import { mobile } from '../../utils/media';
import rem from '../../utils/rem';
import { BlmBanner } from '../BlmBanner';
import { Content } from '../Layout';
import Link from '../Link';

export default function Footer() {
  return (
    <>
      <Wrapper>
        <FooterContent $hero>
          {' '}
          {'Hosted on '}
          <FooterLink inline href="https://vercel.com">
            ▲ Vercel
          </FooterLink>
          <br />
          {'Made with '}
          <Heart />
          {' by '}
          <FooterLink inline href="https://twitter.com/glenmaddern">
            @glenmaddern
          </FooterLink>
          {', '}
          <FooterLink inline href="https://twitter.com/mxstbr">
            @mxstbr
          </FooterLink>
          {', '}
          <FooterLink inline href="https://twitter.com/_philpl">
            @_philpl‬
          </FooterLink>
          {', '}
          <FooterLink inline href="https://twitter.com/probablyup">
            @probablyup
          </FooterLink>
          {', '}
          <FooterLink inline href="https://twitter.com/imbhargav5">
            @imbhargav5
          </FooterLink>
          {' and '}
          <FooterLink inline href="https://github.com/orgs/styled-components/people">
            contributors
          </FooterLink>
          {'.'}
        </FooterContent>
      </Wrapper>
      <BlmBanner />
    </>
  );
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${grey};
  background: ${paleGrey};
  box-sizing: border-box;
  margin-top: ${rem(50)};
`;

const Heart = styled(Favorite)`
  display: inline-block;
  width: ${rem(17)};
  color: ${red};
  transform: translateY(-10%);
`;

const FooterLink = styled(Link)`
  color: ${grey};
`;

const FooterContent = styled(Content)`
  padding: ${rem(30)} ${rem(40)} ${rem(30)} ${rem(40)};

  ${mobile(css`
    padding: ${rem(30)} ${rem(20)} ${rem(30)} ${rem(20)};
  `)};
`;
