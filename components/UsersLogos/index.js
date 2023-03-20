import React from 'react';
import styled from 'styled-components';

const UsersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 56rem;
  flex-wrap: wrap;
  position: relative;
`;

const CompanyLogo = styled.span`
  position: relative;
  height: 2rem;
  margin: 1rem;
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

const UsersLogos = ({ users }) => {
  const slicedUsers = users.slice(0, 10);
  return (
    <UsersContainer>
      {slicedUsers.map(
        ({ key, logo: Logo }) =>
          Logo && (
            <CompanyLogo key={key}>
              <Logo />
            </CompanyLogo>
          )
      )}
    </UsersContainer>
  );
};

export default UsersLogos;
