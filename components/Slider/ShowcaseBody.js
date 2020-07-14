import React from 'react';
import styled, { css } from 'styled-components';
import { Github, Bitbucket, Gitlab, Git } from '@styled-icons/fa-brands';
import { Globe } from '@styled-icons/boxicons-regular';
import { phone } from '../../utils/media';

const SlideMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;

  ${phone(css`
    position: relative;
    margin-top: -134px;
    flex-direction: column-reverse;
  `)}

  em {
    color: rgb(219, 112, 147);
    font-style: normal;
  }
`;

const SlideMetaLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
  margin-bottom: 24px;
  flex-shrink: 0;
  padding-top: 16px;
  align-items: flex-end;

  ${phone(css`
    margin-left: 0;
    justify-content: center;
    flex-direction: row;

    span {
      display: none;
    }
  `)}
`;

const SlideMetaLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;
  margin-right: -16px;
  padding: 4px 16px;
  border-radius: 8px;

  ${phone(css`
    display: inline-flex;
    justify-content: center;
    margin-right: 0;
    margin-bottom: 0;
    padding: 16px;
    border-radius: 50%;
  `)}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    display: inline-block;
    height: 24px;
    margin-left: 8px;

    ${phone(css`
      margin-left: 0;
    `)}
  }
`;

const RepoIcon = ({ url }) => {
  if (url.indexOf('github') > -1) return <Github />;
  if (url.indexOf('bitbucket') > -1) return <Bitbucket />;
  if (url.indexOf('gitlab') > -1) return <Gitlab />;
  return <Git />;
};

const ShowcaseBody = ({ title, owner, description, link, repo }) => (
  <SlideMeta>
    <div>
      <h1>{title}</h1>
      <p>
        <em>By {owner}</em>
      </p>
      {description && <p>{description}</p>}
    </div>
    <SlideMetaLinks>
      <SlideMetaLink href={link} target="_blank">
        <span>Go to website</span>
        <Globe />
      </SlideMetaLink>
      {repo && (
        <SlideMetaLink href={repo} target="_blank">
          <span>Go to repository</span>
          <RepoIcon url={repo} />
        </SlideMetaLink>
      )}
    </SlideMetaLinks>
  </SlideMeta>
);

export default ShowcaseBody;
