import NextImage from 'next/image';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Github } from '@styled-icons/fa-brands';
import { OpenInNew } from '@styled-icons/material';
import { SortedProject } from '@/companies-manifest';
import { phone, mobile } from '@/utils/media';
import { theme, font } from '@/utils/theme';
import { logoMonochromeMixin } from './logoMixins';

export interface ShowcaseTileProps {
  project: SortedProject;
  Logo?: React.ComponentType;
  featured?: boolean;
  priority?: boolean;
  /** Position in the visible grid. Drives the staggered entrance delay. */
  index?: number;
  /** When true, render the logo in its source trademark colors instead
   *  of the default monochrome silhouette. Use for multi-color marks
   *  (Warner Bros shield, etc.) where the silhouette destroys the
   *  inner detail that makes the mark recognizable. */
  colorFaithful?: boolean;
}

export default function ShowcaseTile({
  project,
  Logo,
  featured,
  priority,
  index = 0,
  colorFaithful = false,
}: ShowcaseTileProps) {
  const { title, owner, link, repo, src } = project;
  const ImageFrame = featured ? FeaturedFrame : Frame;
  const secondary = title !== owner ? (Logo ? title : `By ${owner}`) : null;

  return (
    <Tile style={{ '--i': index } as React.CSSProperties}>
      <PrimaryLink
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} by ${owner}, open site in a new tab`}
      >
        <ImageFrame>
          <NextImage
            src={src}
            alt={`Screenshot of ${title}`}
            fill
            sizes={
              featured
                ? '(max-width: 1000px) 100vw, (max-width: 1280px) 90vw, 1120px'
                : '(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw'
            }
            priority={priority}
          />
          <OpenIndicator aria-hidden>
            <OpenInNew />
          </OpenIndicator>
        </ImageFrame>
        <Caption>
          {Logo ? (
            <LogoSlot aria-hidden $colorFaithful={colorFaithful}>
              <Logo />
            </LogoSlot>
          ) : (
            <TitleText>{title}</TitleText>
          )}
          {secondary && <Meta>{secondary}</Meta>}
        </Caption>
      </PrimaryLink>
      {repo && (
        <RepoLink href={repo} target="_blank" rel="noopener noreferrer" aria-label={`${title} repository on GitHub`}>
          <Github />
        </RepoLink>
      )}
    </Tile>
  );
}

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Tile = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${riseIn} 520ms ${theme.ease.out} both;
  animation-delay: calc(var(--i, 0) * 38ms);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const PrimaryLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: none;
  }

  &:focus-visible > :first-child {
    outline: 2px solid ${theme.color.accent};
    outline-offset: 4px;
  }
`;

const Frame = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background-color: ${theme.color.surface};
  border: 1px solid ${theme.color.border};
  box-shadow: 0 1px 2px ${theme.color.shadow};
  transition:
    transform 280ms ${theme.ease.out},
    box-shadow 280ms ${theme.ease.out},
    border-color 280ms ${theme.ease.out};
  will-change: transform;

  img {
    object-fit: cover;
    object-position: top center;
    transition: transform 600ms ${theme.ease.out};
    will-change: transform;
  }

  ${PrimaryLink}:hover &,
  ${PrimaryLink}:focus-visible & {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px ${theme.color.shadow};
    border-color: ${theme.color.borderStrong};
  }

  ${PrimaryLink}:hover & img {
    transform: scale(1.025);
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
    transition: none;
  }
`;

const FeaturedFrame = styled(Frame)`
  aspect-ratio: 21 / 9;
  border-radius: 18px;

  ${mobile(css`
    aspect-ratio: 16 / 9;
  `)}
`;

const OpenIndicator = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  color: ${theme.color.text};
  background-color: ${theme.color.bg};
  border: 1px solid ${theme.color.border};
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 220ms ${theme.ease.out},
    transform 220ms ${theme.ease.out};

  svg {
    height: 16px;
  }

  ${PrimaryLink}:hover &,
  ${PrimaryLink}:focus-visible & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Caption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
`;

const LogoSlot = styled.div<{ $colorFaithful?: boolean }>`
  height: 30px;
  display: inline-flex;
  align-items: center;
  color: ${theme.color.text};

  svg {
    height: 100%;
    width: auto;
    max-width: 160px;
  }

  ${p => !p.$colorFaithful && logoMonochromeMixin}
`;

const TitleText = styled.span`
  font-family: ${font.display};
  font-weight: ${theme.fontWeight.display};
  font-size: ${theme.text.lg};
  line-height: 1.1;
  letter-spacing: -0.01em;
`;

const Meta = styled.div`
  font-size: ${theme.text.sm};
  color: ${theme.color.textSecondary};
  line-height: 1.4;
`;

const RepoLink = styled.a`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  color: ${theme.color.text};
  background-color: ${theme.color.bg};
  border: 1px solid ${theme.color.border};
  text-decoration: none;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 220ms ${theme.ease.out},
    transform 220ms ${theme.ease.out},
    background-color 180ms ease,
    border-color 180ms ease;

  svg {
    height: 16px;
  }

  ${Tile}:hover &,
  ${Tile}:focus-within &,
  &:focus-visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background-color: ${theme.color.surfaceRaised};
    border-color: ${theme.color.borderStrong};
  }

  /* Touch devices have no hover; keep visible at reduced opacity. */
  ${phone(css`
    opacity: 0.85;
    transform: none;
  `)}
`;
