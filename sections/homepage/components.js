import styled, { css } from 'styled-components'

export const AlignCenter = styled.div`
  text-align: center;
`

export const Badge = styled.img`
  margin: 0 0.5em 3em;
  height: 1.5em;
`

export const ExampleButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${p =>
    p.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

export const SecondButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`
