import styled from 'styled-components';

import rem from '../utils/rem';
import { blmLightGrey, blmGrey } from '../utils/colors';
import { bodyFont, headerFont } from '../utils/fonts';

import { SubHeader, Title } from './Layout';

export const Note = styled.div`
  font-family: ${bodyFont};
  background: ${blmLightGrey};
  padding: ${rem(7)} ${rem(10)} ${rem(5)} ${rem(14)};
  border-left: ${rem(4)} solid ${blmGrey};
  margin: ${rem(45)} 0;
  border-radius: ${rem(3)};

  > p {
    margin: 0 0 ${rem(5)} 0;
  }

  ${SubHeader} + &, ${Title} + & {
    margin-top: ${rem(35)};
  }
`;

const NoteLabel = styled.strong`
  display: block;
  font-weight: 600;
  font-family: ${headerFont};
  text-transform: uppercase;
  font-size: 90%;
  margin-bottom: ${rem(7)};
`;

const NoteWrapper = ({ label = 'Note', children }) => (
  <Note>
    <NoteLabel>{label}</NoteLabel>
    {children}
  </Note>
);

export default NoteWrapper;
