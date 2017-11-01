import React from 'react'
import { I18nextProvider, I18n } from 'react-i18next'
import DocsLayout from '../components/DocsLayout'
import { getReadme } from '../utils/githubApi'
import md from '../components/md'
import Loading from '../components/Loading'

import {
  TRANSLATIONS,
  DEFAULT_TRANSLATION,
  ECOSYSTEM_TRANSLATION,
} from '../constants/i18n'

import i18n from '../utils/i18n'

export const Ecosystem = ({ readme, ...props }) => {
  const injectedProps = props.i18n ? props : {
    ...props,
    i18n
  }

  return (
    <I18nextProvider {...injectedProps}>
      <I18n
        ns={[ECOSYSTEM_TRANSLATION, DEFAULT_TRANSLATION]}
        wait={process.browser}
      >
        {(translate, { i18n }) => {
          if (!translate) {
            return null
          }

          return (
            <DocsLayout
              title={translate(`${DEFAULT_TRANSLATION}:ecosystemTitle`)}
              description={translate('description')}
            >
              {md(i18n)(translate('content.0'))}
              {typeof readme !== 'string' ? <Loading /> : (
                <div>
                  {md(i18n)(readme)}
                  {md(i18n)(translate('content.1'))}
                </div>
              )}
            </DocsLayout>
          )
        }}
      </I18n>
    </I18nextProvider>
  )
}

Ecosystem.getInitialProps = async ({ req }) => {
  const readme = await getReadme('awesome-styled-components')

  const props = {
    readme: readme
      .split('### Built with styled-components')[1]
      .split('### Contribute')[0]
  }

  if (req && !process.browser) {
    return {
      ...props,
      ...i18n.getInitialProps(req, TRANSLATIONS),
    }
  }

  return props
}

export default Ecosystem
