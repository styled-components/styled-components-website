import styled from 'styled-components'

const Svg = styled.svg`
  svg {
    display: inline-block;

    path {
      fill: currentColor;
    }
  }
`

export const CloseIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>close</title>
    <use fill="#FFF" xlinkHref="#close" transform="translate(1 1)" />
    <defs>
      <path
        id="close"
        d="M-.7.7l13 13 1.4-1.4-13-13L-.7.7zm13-1.4l-13 13 1.4 1.4 13-13-1.4-1.4z"
      />
    </defs>
  </Svg>
)

export const FoldIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="14"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>fold</title>
    <use fill="#FFF" xlinkHref="#fold" transform="translate(0 1)" />
    <defs>
      <path id="fold" d="M0 1h17v-2H0v2zm17 4H0v2h17V5zM0 13h17v-2H0v2z" />
    </defs>
  </Svg>
)

export const ArrowIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="8"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>arrow down</title>
    <use fill="#FFF" xlinkHref="#menuArrow" transform="translate(1 1)" />
    <defs>
      <path
        id="menuArrow"
        d="M5 5l-.7.7.7.7.7-.7L5 5zM9.3-.7l-5 5 1.4 1.4 5-5L9.3-.7zm-3.6 5l-5-5L-.7.7l5 5 1.4-1.4z"
      />
    </defs>
  </Svg>
)
