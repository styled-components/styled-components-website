import React from 'react';
import styled, { keyframes } from 'styled-components';

const getSlide = (childIndex, reverse) => keyframes`
  from {
    transform: translateX(${childIndex * 100}%);
  }
  to {
    transform: translateX(${(reverse ? -100 : 100) + 100 * childIndex}%);
  }
`;

const UsersSliderContainer = styled.div`
  width: 100%;
  height: 96px;
  overflow: hidden;
  position: relative;
`;

const UsersSlider = styled.span`
  display: inline-block;
  animation: ${({ offset, reverse }) => getSlide(offset || 0, reverse)} 30s linear infinite;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
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

const UsersLogos = ({ users, reverse }) => {
  return (
    <UsersSliderContainer>
      <UsersSlider offset={-1} reverse={reverse}>
        <SortedLogos users={users} />
      </UsersSlider>
      <UsersSlider offset={0} reverse={reverse}>
        <SortedLogos users={users} />
      </UsersSlider>
      <UsersSlider offset={1} reverse={reverse}>
        <SortedLogos users={users} />
      </UsersSlider>
    </UsersSliderContainer>
  );
};

export default UsersLogos;
