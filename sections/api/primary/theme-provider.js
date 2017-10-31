import { I18n, Trans } from 'react-i18next'
import React from 'react'

import md from 'components/md'
import Table, { Row, Column } from 'components/Table'
import Code from 'components/Code'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

const ThemeProvider = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('themeProvider.content.0'))}
        <Table
          head={[
            translate('themeProvider.tables.0.head.0'),
            translate('themeProvider.tables.0.head.1'),
          ]}
        >
          <Row>
            <Column>
              <Code>
                {translate('themeProvider.tables.0.rows.0.columns.0')}
              </Code>
            </Column>
            <Column>
              <Trans i18nKey="themeProvider.tables.0.rows.0.columns.1">
                <Code>theme</Code>
              </Trans>
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('themeProvider.content.1'))}
      </div>
    )}
  </I18n>
)

export default ThemeProvider
