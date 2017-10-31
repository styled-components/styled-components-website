import { I18n, Trans } from 'react-i18next'
import React from 'react'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

const Keyframes = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('keyframes.content.0'))}
        <Table
          head={[
            translate('keyframes.tables.0.head.0'),
            translate('keyframes.tables.0.head.1'),
          ]}
        >
          <Row>
            <Column>
              <Trans i18nKey="keyframes.tables.0.rows.0.columns.0">
                <Code>TaggedTemplateLiteral</Code>
              </Trans>
            </Column>
            <Column>
              {translate('keyframes.tables.0.rows.0.columns.1')}
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('keyframes.content.1'))}
      </div>
    )}
  </I18n>
)

export default Keyframes
