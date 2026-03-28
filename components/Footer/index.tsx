import { Favorite } from '@styled-icons/material';
import styled from 'styled-components';
import { color, space, text } from '../../utils/tokens';
import Link from '../Link';

export default function Footer() {
  return (
    <Wrapper>
      <Attribution>
        {'Hosted on '}
        <FooterLink inline href="https://vercel.com">
          Vercel
        </FooterLink>
        {'. Made with '}
        <Heart aria-hidden="true" />
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
          @_philpl
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
      </Attribution>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.textSecondary};
  border-top: 1px solid ${color.border};
  margin-top: ${space[12]};
  width: 100%;
  box-sizing: border-box;
`;

const Attribution = styled.div`
  padding: ${space[6]} ${space[8]};
  text-align: center;
  font-size: ${text.sm};
`;

const Heart = styled(Favorite)`
  display: inline-block;
  width: 1rem;
  color: ${color.error};
  transform: translateY(-10%);
`;

const FooterLink = styled(Link)``;
