import { I18n, Trans } from 'react-i18next'
import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

const StyledComponent = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('styledComponent.content.0'))}
        <Table
          head={[
          translate('styledComponent.tables.0.head.0'),
          translate('styledComponent.tables.0.head.1')
          ]}
          >
          <Row>
            <Column>
              <Trans i18nKey="styledComponent.tables.0.rows.0.columns.0">
                <Code>TaggedTemplateLiteral</Code>
              </Trans>
            </Column>
            <Column>
              {translate('styledComponent.tables.0.rows.0.columns.1')}
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('styledComponent.content.1'))}
        <Table
          head={[
          translate('styledComponent.tables.1.head.0'),
          translate('styledComponent.tables.1.head.1')
          ]}
        >
          <Row>
            <Column>
              <Trans i18nKey="styledComponent.tables.1.rows.0.columns.0">
                <Code>component</Code> / <Code>tagname</Code>
              </Trans>
            </Column>
            <Column>
              {translate('styledComponent.tables.1.rows.0.columns.1')}
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('styledComponent.content.2'))}
      </div>
    )}
  </I18n>
)

export default StyledComponent
