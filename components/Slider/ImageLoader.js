import React from 'react'
import styled, { keyframes } from 'styled-components'

const show = keyframes`
  show {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

const DataImg = styled.img`
  opacity: 1;
  animation-delay: 0.2s;
  animation-name: ${show};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`

const Image = styled.img`
  transition: opacity 0.2s ease;

  &.loading {
    opacity: 0;
  }

  &.loaded {
    opacity: 1;
  }
`

class ImageLoader extends React.Component {
  state = {
    loaded: false
  }
  handleLoaded = () => {
    this.setState({ loaded: true })
  }

  componentDidMount() {  
    const node = this.imageRef
    console.log(this.imageRef)

    node.onload = this.handleLoaded
    if (node.complete && !this.state.loaded) {
      this.handleLoaded()
    }
  }

  render() {
    const {item, className} = this.props
    const {src, data} = item
    const {loaded} = this.state
    return <div className={className}>
      <DataImg src={data} />
      <Image className={loaded ? 'loaded' : 'loading'} innerRef={ref => { this.imageRef = ref }} src={src} />
    </div>
  }
}

export default ImageLoader