import React from 'react'
import styled, { css } from 'styled-components'
import { I18n } from 'react-i18next'
import { phone } from '../../utils/media'

import rem from '../../utils/rem'
import md from 'components/md'

import {
  DOCS_BASICS_TRANSLATION,
} from '../../constants/i18n'

const videoHtml = (`
<iframe width="560" height="315" src="https://www.youtube.com/embed/bIK2NwoK9xk?start=89" frameborder="0" allowfullscreen></iframe>
`).trim()

const Video = styled.div.attrs({
  dangerouslySetInnerHTML: {
    __html: videoHtml
  }
})`
  display: block;
  box-shadow: ${rem(1)} ${rem(1)} ${rem(20)} rgba(20, 20, 20, 0.27);
  margin: ${rem(35)} 0;
  position: relative;
  width: 560px;
  height: 315px;
  padding-top: 0;

  ${phone(css`
    padding-top: calc(1 / (16 / 9) * 100%);
    height: 0;
    width: 100%;

    & iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `)}
`

const Motivation = () => (
  <I18n ns={DOCS_BASICS_TRANSLATION}>
    {translate => (
      <div>
        {md(translate('motivation'))}
        <Video />
      </div>
    )}
  </I18n>
)

export default Motivation
