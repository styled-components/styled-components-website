'use client';

import { Company } from 'companies-manifest';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

const getSlide = (childIndex: number, reverse?: boolean) => keyframes`
  from {
    transform: translateX(${childIndex * 100}%);
  }
  to {
    transform: translateX(${(reverse ? -100 : 100) + 100 * childIndex}%);
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

const UsersSlider = styled.span<{
  $offset?: number;
  $reverse?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}>`
  display: inline-block;
  animation: ${({ $offset, $reverse }) => getSlide($offset || 0, $reverse)} 150s linear infinite;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  cursor: pointer; // Add cursor pointer to indicate it's clickable

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
    {/* TODO: remove this check after adding missing logos */}
    {users.map(
      ({ key, logo: Logo }) =>
        Logo && (
          <CompanyLogo key={key}>
            <Logo />
          </CompanyLogo>
        )
    )}
  </UsersWrapper>
);

const UsersLogos = ({ users, reverse }: { reverse?: boolean; users: ISortedLogos['users'] }) => {
  // State to track animation pause
  const [animationPaused, setAnimationPaused] = useState(false);

  // Function to toggle animation pause state
  const toggleAnimation = () => {
    setAnimationPaused(prevState => !prevState);
  };

  return (
    <UsersSliderContainer>
      {[0, 1, 2].map(idx => (
        <UsersSlider
          key={`slider-${idx}`}
          $offset={idx}
          $reverse={reverse}
          onClick={toggleAnimation}
          style={{ animationPlayState: animationPaused ? 'paused' : 'running' }}
        >
          <SortedLogos users={users} />
        </UsersSlider>
      ))}
    </UsersSliderContainer>
  );
};

export default UsersLogos;
