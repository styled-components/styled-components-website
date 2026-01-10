import React from 'react';
import { render } from '@testing-library/react';
import Table, { Row, Column } from '../../components/Table';

test('Table renders correctly', () => {
  const { container } = render(
    <Table head={['head']}>
      <Row>
        <Column />
      </Row>
    </Table>
  );

  expect(container).toMatchSnapshot();
});
