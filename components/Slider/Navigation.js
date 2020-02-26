import React from 'react';
import styled, { css } from 'styled-components';
import { NavigateNext, NavigateBefore } from '@styled-icons/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ShowcaseLink from './ShowcaseLink';
import Image from '../Image';
import { phone } from '../../utils/media';

const navHeight = 192;

const SlideNav = styled.nav`
  position: absolute;
  pointer-events: none;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  transform: translateY(-50%);

  ${phone(css`
    position: relative;
    transform: translateY(0%);
    top: -64px;
  `)}
`;

const NavButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${navHeight}px;
  height: ${navHeight * 0.5625}px;
  color: white;
  overflow: hidden;
  border-radius: 12px;
  transition: 200ms ease-out;
  padding: 0 16px;
  pointer-events: all;

  ${phone(css`
    width: ${navHeight * 0.5}px;
    height: ${navHeight * 0.5 * 0.5625}px;
  `)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  figure {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    z-index: -2;
    transform: translate(-50%, -50%);
    transition: 200ms ease-out;
  }

  svg {
    display: inline-block;
    color: #ffffff;
    height: 32px;
  }

  &:first-child {
    transform: translateX(-66%);
    justify-content: flex-end;

    &:hover {
      transform: translateX(-60%);
    }
  }
  &:last-child {
    transform: translateX(66%);
    justify-content: flex-start;

    &:hover {
      transform: translateX(60%);
    }
  }

  &:hover {
    figure {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
`;

const Navigation = ({ prev, next }) => {
  return (
    <SlideNav>
      <ShowcaseLink item={prev}>
        <NavButton>
          <Image
            width={1920}
            height={1080}
            src={prev.src}
            margin={0}
            renderImage={props => {
              return (
                <TransitionGroup>
                  <CSSTransition key={props.src} timeout={100} classNames="fade">
                    <img src={prev.src} />
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
          <NavigateBefore />
        </NavButton>
      </ShowcaseLink>

      <ShowcaseLink item={next}>
        <NavButton>
          <Image
            width={1920}
            height={1080}
            src={next.src}
            margin={0}
            renderImage={props => {
              return (
                <TransitionGroup>
                  <CSSTransition key={props.src} timeout={100} classNames="fade">
                    <img src={next.src} />
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
          <NavigateNext />
        </NavButton>
      </ShowcaseLink>
    </SlideNav>
  );
};

export default Navigation;
