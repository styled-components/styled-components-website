import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import Image from './Image';
import Navigation from './Slider/Navigation';
import Link from './Link';
import rem from '../utils/rem';
import { headerFont } from '../utils/fonts';

// TODO: replace these variables if needed
const NavWidth = 192;
const NavHeight = 144;
const NavOffset = 32;
const ScreenMultipliers = {
  xs: 0.3,
  sm: 0.5,
  md: 0.75,
  lg: 1,
};

const Section = styled.section`
  display: flex;
  min-height: 0;
  min-width: 0;
  width: 100%;
  height: calc(100vh - 90px);
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  overflow-y: visible;
  padding-bottom: 60px;
`;

const Nav = styled.div`
  width: ${NavWidth * ScreenMultipliers.xs}px;
  min-width: ${NavWidth * ScreenMultipliers.xs}px;
  height: ${NavHeight * ScreenMultipliers.xs}px;
  overflow: hidden;
  transition: all 0.2s ease;

  @media screen and (min-width: 420px) {
    width: ${NavWidth * ScreenMultipliers.sm}px;
    min-width: ${NavWidth * ScreenMultipliers.sm}px;
    height: ${NavHeight * ScreenMultipliers.sm}px;
  }

  @media screen and (min-width: 800px) {
    width: ${NavWidth * ScreenMultipliers.md}px;
    min-width: ${NavWidth * ScreenMultipliers.md}px;
    height: ${NavHeight * ScreenMultipliers.md}px;
  }

  @media screen and (min-width: 1280px) {
    width: ${NavWidth * ScreenMultipliers.lg}px;
    min-width: ${NavWidth * ScreenMultipliers.lg}px;
    height: ${NavHeight * ScreenMultipliers.lg}px;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
  }

  ${props =>
    props.prev
      ? `
    margin-left: -${NavOffset * ScreenMultipliers.xs}px;        
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    &:hover {
      transform: translateX(${NavOffset * ScreenMultipliers.xs}px);
    }

    @media screen and (min-width: 420px) {
      margin-left: -${NavOffset * ScreenMultipliers.sm}px;

      &:hover {
        transform: translateX(${NavOffset * ScreenMultipliers.sm}px);
      }
    }
    
    @media screen and (min-width: 800px) {
      margin-left: -${NavOffset * ScreenMultipliers.md}px;

      &:hover {
        transform: translateX(${NavOffset * ScreenMultipliers.md}px);
      }
    }
    
    @media screen and (min-width: 1280px) {
      margin-left: -${NavOffset * ScreenMultipliers.lg}px;

      &:hover {
        transform: translateX(${NavOffset * ScreenMultipliers.lg}px);
      }
    }
  `
      : `
    margin-right: -${NavOffset * ScreenMultipliers.xs}px;          
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    &:hover {
      transform: translateX(-${NavOffset * ScreenMultipliers.xs}px);
    }

    @media screen and (min-width: 420px) {
      margin-right: -${NavOffset * ScreenMultipliers.sm}px;

      &:hover {
        transform: translateX(-${NavOffset * ScreenMultipliers.sm}px);
      }
    }
    
    @media screen and (min-width: 800px) {
      margin-right: -${NavOffset * ScreenMultipliers.md}px;

      &:hover {
        transform: translateX(-${NavOffset * ScreenMultipliers.md}px);
      }
    }
    
    @media screen and (min-width: 1280px) {
      margin-right: -${NavOffset * ScreenMultipliers.lg}px;

      &:hover {
        transform: translateX(-${NavOffset * ScreenMultipliers.lg}px);
      }
    }
  `};
`;

const Body = styled.div`
  position: relative;
  max-width: 1280px;
  width: calc(100% - ${NavWidth * ScreenMultipliers.xs * 2}px);

  @media screen and (min-width: 420px) {
    width: calc(100% - ${NavWidth * ScreenMultipliers.sm * 2}px);
  }

  @media screen and (min-width: 800px) {
    width: calc(100% - ${NavWidth * ScreenMultipliers.md * 2}px);
  }

  @media screen and (min-width: 1280px) {
    width: calc(100% - ${NavWidth * ScreenMultipliers.lg * 2}px);
  }
`;

const ImageSlider = styled.div`
  flex: 1;
  margin: 0 16px;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.12);
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;

  @media screen and (min-width: 800px) {
    margin: 0 32px;
  }
  @media screen and (min-width: 1280px) {
    margin: 0 48px;
  }
`;

const Caption = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateY(calc(-100% - 16px));
  text-align: center;
  font-size: 16px;
`;

const Title = styled.h1`
  display: block;
  color: rgb(243, 182, 97);
  font-size: ${rem(42)};
  font-weight: bold;
  font-family: ${headerFont};
  margin: 0;
`;

const Slider = ({ previousSlide, currentSlide, nextSlide }) => (
  <Section>
    <Nav prev>
      <Navigation previous item={previousSlide} />
    </Nav>
    <Body>
      <Caption>
        <Title>{currentSlide.title}</Title>
        <Link inline href={currentSlide.link}>
          {currentSlide.link}
        </Link>
      </Caption>

      <ImageSlider>
        <Image
          width={currentSlide.width}
          height={currentSlide.height}
          src={currentSlide.src}
          margin={0}
          renderImage={() => {
            return (
              <TransitionGroup>
                <CSSTransition key={currentSlide.src} timeout={500} classNames="fade">
                  <img src={currentSlide.src} />
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </ImageSlider>
    </Body>
    <Nav>
      <Navigation item={nextSlide} />
    </Nav>
  </Section>
);

export default Slider;
