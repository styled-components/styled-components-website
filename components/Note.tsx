'use client';

import styled from 'styled-components';
import { color, font, radius, space, fontWeight } from '../utils/tokens';
import { SubHeader, Title } from './Layout';

export const Note = styled.div`
  font-family: ${font.sans};
  background: ${color.surface};
  padding: ${space[2]} ${space[3]} ${space[1]} ${space[4]};
  border-left: 4px solid ${color.borderStrong};
  margin: ${space[10]} 0;
  border-radius: ${radius.md};

  > p {
    margin: 0 0 ${space[1]} 0;
  }

  ${SubHeader} + &, ${Title} + & {
    margin-top: ${space[8]};
  }
`;

const NoteLabel = styled.strong`
  display: block;
  font-weight: ${fontWeight.semibold};
  font-family: ${font.sans};
  text-transform: uppercase;
  font-size: 90%;
  margin-bottom: ${space[2]};
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
