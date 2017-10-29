import styled, { css } from 'styled-components'
import { I18nextProvider, I18n } from 'react-i18next'

import rem from '../../utils/rem'
import DocsLayout from '../../components/DocsLayout'
import { Header } from '../../components/Layout'
import Link from '../../components/Link'
import titleToDash from '../../utils/titleToDash'
import { pages } from '../docs.json'
import { mobile, phone } from '../../utils/media'
import { headerFont } from '../../utils/fonts'

import i18n from '../../utils/i18n'
import {
  DOCS_TRANSLATION,
  TRANSLATIONS,
} from '../../constants/i18n'

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
    ns={DOCS_TRANSLATION}
    wait={process.browser}
  >
    {(translate) => {
      if (!translate) {
        return null
      }

      return (
        <DocsLayout
          title={translate('title')}
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
                    <Link href={`/docs/${pathname}`}>
                      {title}
                    </Link>
                  </Header>

                  {
                    sections.map(({ title }) => (
                      <SubHeader key={title}>
                        <Link href={`/docs/${pathname}#${titleToDash(title)}`}>
                          {title}
                        </Link>
                      </SubHeader>
                    ))
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

const TranslateDocumentation = (props) => {
  const injectedProps = props.i18n ? props : {
    ...props,
    i18n
  }

  return (
    <I18nextProvider {...injectedProps}>
      <Documentation />
    </I18nextProvider>
  )
}

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslateDocumentation.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, TRANSLATIONS)
  return {}
}

export default TranslateDocumentation
