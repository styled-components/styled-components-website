import React from 'react';
import styled from 'styled-components';

const scaleFactor = [1.8, 1.4, 1];

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 32px;
  padding: 24px;
  transform: translateY(20%);
  margin-top: -96px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    transform: translateY(28%);
    margin-top: -96px;
    padding: 32px;
  }

  @media (min-width: 800px) {
    width: 120%;
    padding: 0;
    max-width: 1280px;
    margin-top: 0px;
    display: flex;
    transform: translateY(50%);
  }
`;

const Label = styled.label`
  position: absolute;
  bottom: 0;
  left: 50%;
  max-width: 100%;
  transform: translate(-50%, 50%);
  background-color: white;
  color: #333;
  font-family: Avenir Next;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 2px 12px;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.2s ease-out;

  @media (min-width: 800px) {
    font-size: 0.65rem;
  }
`;

const Website = styled.a`
  display: block;
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);

    ${Label} {
      opacity: 1;
    }
  }

  @media (min-width: 800px) {
    padding: 12px;
    z-index: ${props => 2 - Math.abs(props.position - 2)};
    display: ${props => (props.position > 4 ? 'none' : 'block')};
    transform: scale(${props => scaleFactor[Math.abs(props.position - 2)]});

    &:hover {
      transform: scale(${props => scaleFactor[Math.abs(props.position - 2)] + 0.2});
    }
  }
`;

const RatioBox = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const Screenshot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${props => props.bg});
  background-size: cover;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.1);
`;

const SmallShowcase = ({ projects }) => {
  return (
    <Wrapper>
      {Object.values(projects)
        .slice(0, 6)
        .map((project, index) => (
          <Website key={project.title} position={index} href={project.link} target="_blank">
            <RatioBox>
              <Screenshot bg={project.src} />
              <Label>{project.title}</Label>
            </RatioBox>
          </Website>
        ))}
    </Wrapper>
  );
};

export default SmallShowcase;
