import styled from 'styled-components';
import { lightGrey } from '../utils/colors';
import rem from '../utils/rem';
import { font } from '../utils/theme';

export const TableWrapper = styled.table`
  width: 100%;
  text-align: left;
  margin: ${rem(40)} 0;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHead = styled.thead<{ children?: React.ReactNode }>`
  font-family: ${font.sans};

  tr {
    border-bottom: 2px solid ${lightGrey};
  }
`;

export const Row = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${lightGrey};
  }
`;

export const Column = styled.th<{ children?: React.ReactNode }>`
  font-weight: normal;
  padding: ${rem(12)} ${rem(16)};
  vertical-align: top;

  &:first-child {
    padding-left: 0;
  }
`;

const TableHeadColumn = styled(Column)<{ children?: React.ReactNode }>`
  text-transform: uppercase;
  font-size: 85%;
  font-weight: 600;
  opacity: 0.8;
  padding-bottom: ${rem(14)};
`;

export interface TableProps {
  head: string[];
}

const Table = ({ head, children }: React.PropsWithChildren<TableProps>) => (
  <TableWrapper>
    <TableHead>
      <tr>
        {head.map((text, i) => (
          <TableHeadColumn key={i}>{text}</TableHeadColumn>
        ))}
      </tr>
    </TableHead>

    <tbody>{children}</tbody>
  </TableWrapper>
);

export default Table;
