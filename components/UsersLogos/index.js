import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideAnimation = keyframes`
  from{
    transform:translate3d(0,0,0);
  }

  to{
    transform:translate3d(-50%,0,0);
  }
`;

const UsersSliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const UsersSlider = styled.div`
  display: inline-block;
  animation: ${slideAnimation} 60s linear infinite;
  white-space: nowrap;
  overflow: hidden;
`;

const UsersWrapper = styled.section`
  white-space: nowrap;
  overflow: hidden;
  padding: 0.5rem;
  display: flex;
  margin-bottom: 2rem;
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
    {users.map(({ key, logo: Logo, ...rest }) => (
      <CompanyLogo key={key} {...rest}>
        <Logo />
      </CompanyLogo>
    ))}
  </UsersWrapper>
);

const UsersLogos = ({ users }) => {
  return (
    <UsersSliderContainer>
      <UsersSlider>
        <SortedLogos users={users} />
      </UsersSlider>
    </UsersSliderContainer>
  );
};

export default UsersLogos;
