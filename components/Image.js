import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// This component might look a little complex
// because one could argue that keeping the aspect ratio
// of an image can be solved with `height: auto`,
// but it's actually not that easy if you want to prevent
// element flickering

// Because if you want to do that, you need to set the aspect
// ratio of the image's container BEFORE the image loads

const Figure = styled.figure`
  display: block;
  text-align: center;
  margin: ${props => props.margin}px 0;
  max-width: 100%;

  & img {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  & .fade-enter {
    opacity: 0.01;
  }

  & .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  & .fade-exit {
    opacity: 1;
  }

  & .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

const Main = styled.div`
  margin: 0 auto;
  max-width: 100%;
  width: ${props => props.width}px;
`;

const Caption = styled.p`
  color: #999;
  font-size: 12px;
  margin: 0;
  text-align: center;
  ${props => (props.captionSpacing ? `margin-top: ${props.captionSpacing}px;` : '')};
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-bottom: ${props => props.aspectRatio};
`;

class Image extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    const { caption, width, height, margin = 40, captionSpacing = null, renderImage, ...rest } = this.props;

    const aspectRatio = String((height / width) * 100) + '%';

    return (
      <Figure margin={margin}>
        <Main width={width}>
          <ImageWrapper aspectRatio={aspectRatio}>{renderImage && renderImage(rest)}</ImageWrapper>

          {caption && <Caption captionSpacing={captionSpacing}>{caption}</Caption>}
        </Main>
      </Figure>
    );
  }
}

export const Video = props => <Image {...props} video />;

export default Image;
