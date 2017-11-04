import { I18n, Trans } from 'react-i18next'
import React from 'react'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

const WithTheme = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('withTheme.content.0'))}
        <Table head={[
          translate('withTheme.tables.0.head.0'),
          translate('withTheme.tables.0.head.1')
        ]}>
          <Row>
            <Column>
              <Trans i18nKey="withTheme.tables.0.rows.0.columns.0">
                <Code>Component</Code>
              </Trans>
            </Column>
            <Column>
              <Trans i18nKey="withTheme.tables.0.rows.0.columns.1">
                <Code>theme</Code>
              </Trans>
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('withTheme.content.1'))}
      </div>
    )}
  </I18n>
)

export default WithTheme
