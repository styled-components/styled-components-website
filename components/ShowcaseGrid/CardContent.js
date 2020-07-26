import React from 'react';
import styled from 'styled-components';
import { Github, Bitbucket, Gitlab, Git } from '@styled-icons/fa-brands';
import { Globe } from '@styled-icons/boxicons-regular';

export const SlideMeta = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  h4 {
    margin-bottom: 0;
  }
`;

const SlideMetaLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

const SlideMetaLink = styled.a`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    display: inline-block;
    height: 24px;
  }
`;

const RepoIcon = ({ url }) => {
  if (url.indexOf('github') > -1) return <Github />;
  if (url.indexOf('bitbucket') > -1) return <Bitbucket />;
  if (url.indexOf('gitlab') > -1) return <Gitlab />;
  return <Git />;
};

const CardContent = ({ title, link, repo }) => (
  <SlideMeta>
    <h4>{title}</h4>
    <SlideMetaLinks>
      <SlideMetaLink href={link} target="_blank">
        <Globe />
      </SlideMetaLink>
      {repo && (
        <SlideMetaLink href={repo} target="_blank">
          <RepoIcon url={repo} />
        </SlideMetaLink>
      )}
    </SlideMetaLinks>
  </SlideMeta>
);

export default CardContent;
