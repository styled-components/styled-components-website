import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideAnimation1 = keyframes`
  0%{
    transform:translate3d(0,0,0);
    opacity:1;
  }
  100%{
    transform:translate3d(-100%,0,0);
    opacity:1;
  }  
`;
const slideAnimation2 = keyframes`
  0%{
    transform:translate3d(100%,0,0);
  }
  50%{
    transform:translate3d(0%,0,0);
  }
  100%{
    transform:translate3d(-100%,0,0);  	
  }
`;
const slideAnimation3 = keyframes`
  0%{
    transform:translate3d(100%,0,0);
    opacity:1;

  }

  50%{
    transform:translate3d(0%,0,0);
    opacity:1;

  }
  100%{
    transform:translate3d(-100%,0,0);
    opacity:1;

  }
`;
const UsersSliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const UsersSlider1 = styled.span`
  display: inline-block;
  animation: ${slideAnimation1} 60s linear;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  position: absolute;
`;
const UsersSlider2 = styled.span`
  display: inline-block;
  animation: ${slideAnimation2} 120s linear infinite;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
`;
const UsersSlider3 = styled.span`
  display: inline-block;
  animation: ${slideAnimation3} 120s linear 60s infinite;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
`;

const UsersWrapper = styled.section`
  white-space: nowrap;
  overflow: hidden;
  padding: 0.5rem;
  display: flex;
`;

const CompanyLogo = styled.span`
  position: relative;
  height: ${p => p.height || '2rem'};
  margin: 0.5rem 1rem;
  bottom: ${p => p.bottom || 0};
  opacity: 0.8;
  filter: brightness(0) invert(1);
  transition: opacity 125ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const SortedLogos = ({ users }) => (
  <UsersWrapper>
    {/* TODO: remove this check after adding missing logos */}
    {users.map(
      ({ key, logo: Logo, ...rest }) =>
        Logo && (
          <CompanyLogo key={key} {...rest}>
            <Logo />
          </CompanyLogo>
        )
    )}
  </UsersWrapper>
);

const UsersLogos = ({ users }) => {
  return (
    <UsersSliderContainer>
      <UsersSlider1>
        <SortedLogos users={users} />
      </UsersSlider1>
      <UsersSlider2>
        <SortedLogos users={users} />
      </UsersSlider2>
      <UsersSlider3>
        <SortedLogos users={users} />
      </UsersSlider3>
    </UsersSliderContainer>
  );
};

export default UsersLogos;
