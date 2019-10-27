import React from 'react';
import styled from 'styled-components';

const scaleFactor = [1.8, 1.4, 1];

const Wrapper = styled.div`
  width: 120%;
  max-width: 1280px;
  display: flex;
  /* margin-top: 64px; */
  transform: translateY(50%);
`;

const Website = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;
  transform: scale(${props => scaleFactor[Math.abs(props.position - 2)]});
  z-index: ${props => 2 - Math.abs(props.position - 2)};
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
        .slice(0, 5)
        .map((project, index) => (
          <Website key={project.title} position={index}>
            <RatioBox>
              <Screenshot bg={project.src} />
            </RatioBox>
          </Website>
        ))}
    </Wrapper>
  );
};

export default SmallShowcase;
