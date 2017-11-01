'use babel'

import styled, { css } from 'styled-components'
import { I18n } from 'react-i18next'

import rem from '../../utils/rem'
import DocsLayout from '../../components/DocsLayout'
import { Header } from '../../components/Layout'
import Link from '../../components/Link'
import titleToDash from '../../utils/titleToDash'
import { pages } from '../docs.json'
import { mobile, phone } from '../../utils/media'
import { headerFont } from '../../utils/fonts'

import withI18n from '../../components/withI18n'
import {
  DEFAULT_TRANSLATION,
  NAV_TRANSLATION,
  DOCS_TRANSLATION,
} from '../../constants/i18n'

import {
  addLanguageToPath,
} from '../../utils/translations'

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const Column = styled.div`
  width: 33%;
  max-width: 33%;
  flex-basis: 33%;
  padding-right: ${rem(15)};

  ${mobile(css`
    width: 50%;
    max-width: 50%;
    flex-basis: 50%;
  `)}

  ${phone(css`
    width: 100%;
    max-width: 100%;
    flex-basis: 100%;
  `)}
`

const SubHeader = styled.h3`
  display: block;
  margin: ${rem(8)} 0;
  font-size: ${rem(18)};
  font-weight: normal;
  font-family: ${headerFont};
`

export const Documentation = () => (
  <I18n
    ns={[DOCS_TRANSLATION, NAV_TRANSLATION, DEFAULT_TRANSLATION]}
    wait={process.browser}
  >
    {(translate, { i18n }) => {
      if (!translate) {
        return null
      }

      return (
        <DocsLayout
          title={translate(`${DEFAULT_TRANSLATION}:documentation`)}
          description={translate('description')}
        >
          <p>
            {translate('about')}
          </p>

          <Row>
            {
              pages.map(({ title, pathname, sections }) => (
                <Column key={title}>
                  <Header>
                    <Link
                      href={`/docs/${pathname}`}
                      as={addLanguageToPath(i18n, `/docs/${pathname}`)}
                    >
                      {translate(`${NAV_TRANSLATION}:${title}`)}
                    </Link>
                  </Header>
                  {
                    sections.map(({ title }) => {
                      const path = `/docs/${pathname}#${titleToDash(translate(`${NAV_TRANSLATION}:${title}`))}`

                      return (
                        (
                          <SubHeader key={title}>
                            <Link
                              href={path}
                              as={addLanguageToPath(i18n, path)}
                            >
                              {translate(`${NAV_TRANSLATION}:${title}`)}
                            </Link>
                          </SubHeader>
                        )
                      )
                    })
                  }
                </Column>
              ))
            }
          </Row>
        </DocsLayout>
      )
    }}
  </I18n>
)

export default withI18n(Documentation)
