import { I18n } from 'react-i18next'
import React from 'react'

import md from 'components/md'
import Code from 'components/Code'
import Table, { Row, Column } from 'components/Table'

import {
  DOCS_API_TRANSLATION,
} from '../../../constants/i18n'

const TaggedTemplateLiteral = () => (
  <I18n ns={DOCS_API_TRANSLATION}>
    {(translate, { i18n }) => (
      <div>
        {md(i18n)(translate('taggedTemplateLiteral.content.0'))}
        <Table
          head={[
          translate('taggedTemplateLiteral.tables.0.head.0'),
          translate('taggedTemplateLiteral.tables.0.head.1')
          ]}
        >
          <Row>
            <Column>
              <Code>
                {translate('taggedTemplateLiteral.tables.0.rows.0.columns.0')}
              </Code>
            </Column>
            <Column>
              {translate('taggedTemplateLiteral.tables.0.rows.0.columns.1')}
            </Column>
          </Row>
          <Row>
            <Column>
              <Code>
                {translate('taggedTemplateLiteral.tables.0.rows.1.columns.0')}
              </Code>
            </Column>
            <Column>
              {translate('taggedTemplateLiteral.tables.0.rows.1.columns.1')}
            </Column>
          </Row>
        </Table>
        {md(i18n)(translate('taggedTemplateLiteral.content.1'))}
      </div>
    )}
  </I18n>
)

export default TaggedTemplateLiteral
