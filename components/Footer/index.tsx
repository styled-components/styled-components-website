import styled from 'styled-components';
import { theme } from '../../utils/theme';
import Link from '../Link';

export default function Footer() {
  return (
    <Wrapper>
      <Attribution>
        {'Hosted on '}
        <FooterLink inline href="https://vercel.com">
          Vercel
        </FooterLink>
        {'. For outreach, please contact '}
        <FooterLink inline href="https://twitter.com/quantizor">
          @quantizor
        </FooterLink>
        {'. '}
        <FooterLink inline href="https://github.com/styled-components/styled-components/graphs/contributors">
          Thank you contributors!
        </FooterLink>
      </Attribution>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.textSecondary};
  border-top: 1px solid ${theme.color.border};
  margin-top: ${theme.space[12]};
  width: 100%;
  box-sizing: border-box;
`;

const Attribution = styled.div`
  padding: ${theme.space[6]} ${theme.space[8]};
  text-align: center;
  font-size: ${theme.text.sm};
`;

const FooterLink = styled(Link)``;
