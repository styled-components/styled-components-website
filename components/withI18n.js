import React, { Component } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../utils/i18n'

import {
  TRANSLATIONS,
} from '../constants/i18n'

const withI18n = (WrappedComponent) => {
  class WithI18n extends Component {
    render() {
      const injectedProps = this.props.i18n ? this.props : {
        ...this.props,
        i18n
      }

      return (
        <I18nextProvider {...injectedProps}>
          <WrappedComponent />
        </I18nextProvider>
      )
    }
  }

  // Passing down initial translations
  // use req.i18n instance on serverside to avoid overlapping requests set the language wrong
  WithI18n.getInitialProps = async ({ req }) => {
    if (req && !process.browser) return i18n.getInitialProps(req, TRANSLATIONS)
    return {}
  }

  return WithI18n
}

export default withI18n
