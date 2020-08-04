import React from 'react';
import styled, { css } from 'styled-components';
import { Favorite } from '@styled-icons/material';
import rem from '../../utils/rem';
import { mobile } from '../../utils/media';
import { grey, paleGrey, red } from '../../utils/colors';
import Link from '../Link';
import { Content } from '../Layout';

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

const Footer = () => (
  <Wrapper>
    <FooterContent hero>
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
);

export default Footer;
