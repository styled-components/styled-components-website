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
  <Svg width="15" height="15">
    <title>close</title>
    <use fill="#FFF" xlinkHref="#close" transform="translate(1 1)" />
    <defs>
      <path id="close" d="M-.7.7l13 13 1.4-1.4-13-13L-.7.7zm13-1.4l-13 13 1.4 1.4 13-13-1.4-1.4z"/>
    </defs>
  </Svg>
)

export const FoldIcon = () => (
  <Svg width="17" height="14">
    <title>fold</title>
    <use fill="#FFF" xlinkHref="#fold" transform="translate(0 1)"/>
    <defs>
      <path id="fold" d="M0 1h17v-2H0v2zm17 4H0v2h17V5zM0 13h17v-2H0v2z"/>
    </defs>
  </Svg>
)

export const ArrowIcon = () => (
  <Svg width="12" height="8">
    <title>arrow down</title>
    <use fill="#FFF" xlinkHref="#menuArrow" transform="translate(1 1)"/>
    <defs>
      <path id="menuArrow" d="M5 5l-.7.7.7.7.7-.7L5 5zM9.3-.7l-5 5 1.4 1.4 5-5L9.3-.7zm-3.6 5l-5-5L-.7.7l5 5 1.4-1.4z"/>
    </defs>
  </Svg>
)

export const SearchIcon = () => (
  <Svg width="15" height="16">
    <title>search</title>
    <path fill="#FFF" d="M14.772 14.573l-3.698-3.96c.95-1.164 1.472-2.628 1.472-4.153C12.546 2.898 9.732 0 6.273 0 2.813 0 0 2.898 0 6.46s2.814 6.46 6.273 6.46c1.298 0 2.536-.403 3.594-1.17l3.726 3.992c.155.166.365.258.59.258.212 0 .413-.083.566-.235.32-.322.33-.857.02-1.192zm-8.5-12.888c2.558 0 4.637 2.142 4.637 4.775 0 2.633-2.08 4.775-4.64 4.775-2.56 0-4.64-2.142-4.64-4.775 0-2.633 2.08-4.775 4.637-4.775z"/>
  </Svg>
)
