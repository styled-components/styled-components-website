import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Table, { Row, Column } from '../../components/Table'

test('Table renders correctly', () => {
  const tree = renderer.create(
    <Table head={['head']}>
      <Row>
        <Column />
      </Row>
    </Table>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
