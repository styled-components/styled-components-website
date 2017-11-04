import { I18n, Trans } from 'react-i18next'
import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

const Styled = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('styled.content.0'))}
        <Table
          head={[
          translate('styled.tables.0.head.0'),
          translate('styled.tables.0.head.1')
          ]}
        >
          <Row>
            <Column>
              <Trans i18nKey="styled.tables.0.rows.0.columns.0">
                <Code>component</Code> / <Code>tagname</Code>
              </Trans>
            </Column>
            <Column>
              <Trans i18nKey="styled.tables.0.rows.0.columns.1">
                <Code>'div'</Code>.
              </Trans>
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('styled.content.1'))}
        <Table
          head={[
            translate('styled.tables.1.head.0'),
            translate('styled.tables.1.head.1'),
          ]}
        >
          <Row>
            <Column>
              <Code>{translate('styled.tables.1.rows.0.columns.0')}</Code>
            </Column>
            <Column>{translate('styled.tables.1.rows.0.columns.1')}</Column>
          </Row>

          <Row>
            <Column>
              <Code>{translate('styled.tables.1.rows.1.columns.0')}</Code>
            </Column>
            <Column>{translate('styled.tables.1.rows.1.columns.1')}</Column>
          </Row>
        </Table>
        {md(i18n)(translate('styled.content.2'))}
      </div>
    )
    }
  </I18n>
)

export default Styled
