'use client';

import styled from 'styled-components';
import { theme, font } from '../utils/theme';
import { SubHeader, Title } from './Layout';

export const Note = styled.div`
  font-family: ${font.sans};
  background: ${theme.color.surface};
  padding: ${theme.space[2]} ${theme.space[3]} ${theme.space[1]} ${theme.space[4]};
  border-left: 4px solid ${theme.color.borderStrong};
  margin: ${theme.space[10]} 0;
  border-radius: ${theme.radius.md};

  > p {
    margin: 0 0 ${theme.space[1]} 0;
  }

  ${SubHeader} + &, ${Title} + & {
    margin-top: ${theme.space[8]};
  }
`;

const NoteLabel = styled.strong`
  display: block;
  font-weight: ${theme.fontWeight.semibold};
  font-family: ${font.sans};
  text-transform: uppercase;
  font-size: 90%;
  margin-bottom: ${theme.space[2]};
`;

export interface NoteWrapper {
  label?: string;
}

const NoteWrapper = ({ label = 'Note', children }: React.PropsWithChildren<NoteWrapper>) => (
  <Note>
    <NoteLabel>{label}</NoteLabel>
    {children}
  </Note>
);

export default NoteWrapper;
