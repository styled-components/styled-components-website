import React from 'react';
import styled from 'styled-components';
import CardContent from './CardContent';
import { SlideMeta } from './CardContent';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
`;

const CardContentWrapper = styled.div`
  transition: 0.3s transform cubic-bezier(0.32, 0, 0.67, 0), 0.3s opacity cubic-bezier(0.32, 0, 0.67, 0);
  opacity: 0;
  transform: scale(0.75);
`;

const ShowcaseCell = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: 0.2s;

  ${SlideMeta} {
    transform: translateY(100%);
    transition: 0.3s;
  }

  &:hover {
    transform: scale(1.05) translateY(-8px);

    ${SlideMeta} {
      transform: translateY(0%);
    }

    ${CardContentWrapper} {
      transition: 0.3s transform cubic-bezier(0.33, 1, 0.68, 1), 0.3s opacity cubic-bezier(0.33, 1, 0.68, 1);
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ShowcaseImage = styled.img`
  display: block;
  width: 100%;
`;

const ShowcaseCellContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 8px;
`;

export const ShowcaseGrid = ({ items }) => {
  return (
    <Grid>
      {(items || []).map(project => (
        <ShowcaseCell key={project.title}>
          <ShowcaseImage src={project.src} />
          <ShowcaseCellContent>
            <CardContentWrapper>
              <CardContent {...project} />
            </CardContentWrapper>
          </ShowcaseCellContent>
        </ShowcaseCell>
      ))}
    </Grid>
  );
};
