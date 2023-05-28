import styled, { css } from 'styled-components';
import DocsLayout from '../../components/DocsLayout';
import { Header } from '../../components/Layout';
import Link from '../../components/Link';
import { headerFont } from '../../utils/fonts';
import { mobile, phone } from '../../utils/media';
import rem from '../../utils/rem';
import titleToDash from '../../utils/titleToDash';
import json from '../docs.json';

const { pages } = json;

export default function Documentation() {
  return (
    <DocsLayout
      title="Documentation"
      description="Learn how to use styled-components and to style your apps without stress"
    >
      <p>
        Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, styled-components
        allows you to write actual CSS code to style your components. It also removes the mapping between components and
        styles – using components as a low-level styling construct could not be easier!
      </p>

      <Row>
        {pages.map(({ title, pathname, sections }) => (
          <Column key={title}>
            <Header>
              <Link href={`/docs/${pathname}`}>{title}</Link>
            </Header>

            {sections.map(({ title }) => (
              <SubHeader key={title}>
                <Link href={`/docs/${pathname}#${titleToDash(title)}`}>{title}</Link>
              </SubHeader>
            ))}
          </Column>
        ))}
      </Row>
    </DocsLayout>
  );
}

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Column = styled.div`
  width: 33%;
  max-width: 33%;
  flex-basis: 33%;
  padding-right: ${rem(15)};

  ${mobile(css`
    width: 50%;
    max-width: 50%;
    flex-basis: 50%;
  `)} ${phone(css`
    width: 100%;
    max-width: 100%;
    flex-basis: 100%;
  `)};
`;

const SubHeader = styled.h3`
  display: block;
  margin: ${rem(8)} 0;
  font-size: ${rem(18)};
  font-weight: normal;
  font-family: ${headerFont};
`;
