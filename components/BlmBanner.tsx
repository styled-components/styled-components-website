import styled from 'styled-components';
import rem from '../utils/rem';

export const BlmBanner = () => {
  return (
    <Banner href="https://support.eji.org/give/153413/#!/donation/checkout">
      #BlackLivesMatter ✊🏿 <span style={{ textDecoration: `underline` }}>Support the Equal Justice Initiative</span>
    </Banner>
  );
};

const Banner = styled.a`
  background: black;
  color: white;
  display: block;
  font-size: ${rem(15)};
  font-weight: 500;
  justify-content: center;
  padding: 0.75rem 0.5rem;
  text-align: center;
  width: 100%;
`;
