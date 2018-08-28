import React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import styled from 'styled-components'
import ImageLoader from './Slider/ImageLoader'
import Image from './Image'
import Navigation from './Slider/Navigation'

const Section = styled.section`
  display: flex;
  min-height: 0;
  min-width: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  padding-bottom: 60px;
`

const Nav = styled.div`
  width: 200px;
  min-width: 200px;
  height: 150px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transition: all 0.2s ease-in-out;
  }

  ${props => props.prev ? `
    margin-left: -40px;          
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    &:hover {
      transform: translateX(40px);
    }
  ` : `
    margin-right: -40px;          
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    &:hover {
      transform: translateX(-40px);
    }
  ` }
`

const ImageSlider = styled.div`
  flex: 1;
  margin: 0 60px;
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.12);
  max-width: 1280px;
  border-radius: 4px;
  overflow: hidden;
`

const Slider = ({previousSlide, currentSlide, nextSlide}) => <Section>
    <Nav prev ><Navigation previous item={previousSlide} /></Nav>
    <ImageSlider>

  <Image width={currentSlide.width} height={currentSlide.height} src={currentSlide.src} margin={0} renderImage={() => {
    return <TransitionGroup>
            <CSSTransition
              key={currentSlide.src}
              timeout={500}
              classNames="fade"
            >
              <ImageLoader item={currentSlide} />
            </CSSTransition>
          </TransitionGroup>
  }} />
    </ImageSlider>
    <Nav><Navigation item={nextSlide} /></Nav>
</Section>

export default Slider