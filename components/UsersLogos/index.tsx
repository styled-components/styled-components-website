'use client';

import { Company } from 'companies-manifest';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

const slideAnimation = (reverse?: boolean) => keyframes`
  from {
    transform: translateX(${reverse ? '0%' : '-50%'});
  }
  to {
    transform: translateX(${reverse ? '-50%' : '0%'});
  }
`;

const UsersWrapper = styled.section<{ children?: React.ReactNode }>`
  white-space: nowrap;
  overflow: hidden;
  padding: 0.5rem 0;
  display: flex;
`;

const UsersSliderContainer = styled.div<{ children?: React.ReactNode }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  overflow: hidden;
  position: relative;
`;

const UsersSliderTrack = styled.div<{
  $reverse?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}>`
  display: flex;
  animation: ${({ $reverse }) => slideAnimation($reverse)} 75s linear infinite;
  white-space: nowrap;
  cursor: pointer;

  ${UsersWrapper} {
    flex-direction: ${({ $reverse }) => ($reverse ? 'row' : 'row-reverse')};
  }

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;

const CompanyLogo = styled.span<{ children?: React.ReactNode }>`
  position: relative;
  height: 2rem;
  margin: 0 1rem;
  bottom: 0;
  opacity: 0.8;
  filter: brightness(0) invert(1);
  transition: opacity 125ms ease-in-out;
  flex-shrink: 0;

  svg {
    height: 100%;
    max-width: 128px;
  }

  &:hover {
    opacity: 1;
  }
`;

export interface ISortedLogos {
  users: Company[];
}

const SortedLogos = ({ users }: ISortedLogos) => (
  <UsersWrapper>
    {users.map(({ key, name, logo: Logo }) =>
      Logo ? (
        <CompanyLogo key={key} title={name}>
          <Logo />
        </CompanyLogo>
      ) : null
    )}
  </UsersWrapper>
);

const UsersLogos = ({ users, reverse }: { reverse?: boolean; users: ISortedLogos['users'] }) => {
  const [animationPaused, setAnimationPaused] = useState(false);

  const toggleAnimation = () => {
    setAnimationPaused(prevState => !prevState);
  };

  return (
    <UsersSliderContainer>
      <UsersSliderTrack
        $reverse={reverse}
        onClick={toggleAnimation}
        style={{ animationPlayState: animationPaused ? 'paused' : 'running' }}
      >
        <SortedLogos users={users} />
        <SortedLogos users={users} />
      </UsersSliderTrack>
    </UsersSliderContainer>
  );
};

export default UsersLogos;
