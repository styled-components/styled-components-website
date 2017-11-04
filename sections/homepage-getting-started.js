'use babel'

import React from 'react'
import styled, { css } from 'styled-components'
import { I18n } from 'react-i18next'

import md from 'components/md'
import { Content } from 'components/Layout'

import {
  HOME_TRANSLATION,
} from '../constants/i18n'

const AlignCenter = styled.div`
  text-align: center;
`

const Badge = styled.img`
  margin: 0 0.5em 3em;
  height: 1.5em;
`

const ExampleButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${p => p.primary && css`
    background: palevioletred;
    color: white;
  `}
`

const SecondButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

const HomepageGettingStarted = () => (
  <I18n
    ns={HOME_TRANSLATION}
    wait={process.browser}
  >
    {
      (translate, { i18n }) => {
        if (!translate) {
          return null
        }

        return (
          <Content>
            <AlignCenter>
              <a href="https://github.com/styled-components/styled-components">
                <Badge
                  src="https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star&maxAge=3600"
                  alt={translate('starsOnGithub')}
                />
              </a>
              <a href="https://www.npmjs.com/package/styled-components">
                <Badge
                  src="https://img.shields.io/npm/v/styled-components.svg"
                  alt={translate('currentVersion')}
                />
              </a>
              <Badge
                src="https://img.shields.io/npm/dm/styled-components.svg?maxAge=3600"
                alt={translate('monthlyDownloads')}
              />
              <Badge
                src="http://img.badgesize.io/https://unpkg.com/styled-components/dist/styled-components.min.js?compression=gzip&label=gzip%20size"
                alt={translate('gzipSize')}
              />
              <a href="https://spectrum.chat/styled-components">
                <Badge
                  src="https://withspectrum.github.io/badge/badge.svg"
                  alt={translate('joinTheCommunity')}
                />
              </a>
            </AlignCenter>

            {md(i18n)(translate('gettingStarted.0'))}
            <AlignCenter>
              <ExampleButton
                onClick={() => { alert(translate('clickedNormal')) }}
              >
                {translate('normalButton')}
              </ExampleButton>
              <ExampleButton
                primary
                onClick={() => { alert(translate('clickedPrimary')) }}
              >
                {translate('primaryButton')}
              </ExampleButton>
            </AlignCenter>
            {md(i18n)(translate('gettingStarted.1'))}
            <AlignCenter>
              <button>{translate('imAButton')}</button>
            </AlignCenter>
            {md(i18n)(translate('gettingStarted.2'))}
            <AlignCenter>
              <SecondButton>{translate('imAStyledButton')}</SecondButton>
            </AlignCenter>
            {md(i18n)(translate('gettingStarted.3'))}
          </Content>
        )
      }
    }
  </I18n>
)

export default HomepageGettingStarted
