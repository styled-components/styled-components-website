import React from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live-runner';
import styled from 'styled-components';
import { sortedCompanies, sortedProjects } from '../companies-manifest';
import Footer from '../components/Footer';
import { Content } from '../components/Layout';
import { default as Link, default as NextLink } from '../components/Link';
import { StyledError, editorMixin } from '../components/LiveEdit';
import Nav from '../components/Nav';
import SeoHead from '../components/SeoHead';
import SmallShowcase from '../components/SmallShowcase';
import UsersLogos from '../components/UsersLogos';
import HomepageGettingStarted from '../sections/homepage/getting-started.mdx';
import { blmBlack, blmGrey } from '../utils/colors';
import { headerFont } from '../utils/fonts';
import rem from '../utils/rem';
import baseScope from '../utils/scope';

export default function Index() {
  const [isMobileNavFolded, setIsMobileNavFolded] = React.useState(true);

  return (
    <div>
      <SeoHead title="styled-components">
        <meta name="robots" content="noodp" />
      </SeoHead>

      <Nav
        showSideNav={false}
        isMobileNavFolded={isMobileNavFolded}
        onMobileNavToggle={() => setIsMobileNavFolded(x => !x)}
      />

      <Wrapper>
        <Content $hero>
          <LiveProvider code={headerCode} transformCode={transformHeaderCode} scope={{ ...baseScope, rem, Link }}>
            <Title>
              <Tagline>
                CSS for the <code>&lt;Component&gt;</code> Age
              </Tagline>
              <SupportingTagline>Styling your way with speed, strong typing, and flexibility.</SupportingTagline>
            </Title>

            <Links>
              <LivePreview />
            </Links>

            <EditorContainer>
              <Editor />
              <StyledError />
            </EditorContainer>
          </LiveProvider>

          <UsersHeading>Used by folks at</UsersHeading>
        </Content>

        <UsersLogos users={sortedCompanies.filter((v, i) => i % 2)} />

        <UsersLogos reverse users={sortedCompanies.filter((v, i) => !(i % 2))} />

        <ShowcaseHeading>To create beautiful websites like these</ShowcaseHeading>

        <SmallShowcase projects={sortedProjects} />
      </Wrapper>

      <ShowcaseLink href="/showcase">Discover more</ShowcaseLink>

      <HomepageGettingStarted />

      <Footer />
    </div>
  );
}

const Tagline = styled.h1`
  font-weight: 200;
  font-size: 2.5rem;
  line-height: 1.1;
  margin: 0 0 0.5em;
`;

const SupportingTagline = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  max-inline-size: 30ch;
  text-wrap: balance;
`;

const headerCode = `
const Button = styled.a<{ $primary?: boolean; }>\`
  --accent-color: white;

  /* This renders the buttons above... Edit me! */
  background: transparent;
  border-radius: 3px;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;

  &:hover {
    filter: brightness(0.85);
  }

  &:active {
    filter: brightness(1);
  }

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  \${props => props.$primary && css\`
    background: var(--accent-color);
    color: black;
  \`}
\`
`.trim();

const transformHeaderCode = (code: string) => `
  ${code}

  render(
    <div>
      <Button
        $primary
        href="https://github.com/styled-components/styled-components"
        target="_blank"
        rel="noopener"
      >
        GitHub
      </Button>

      <Button as={Link} href="/docs">
        Documentation
      </Button>
    </div>
  )
`;

const Title = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 3rem 0;

  > * {
    flex-shrink: 0;
  }
`;

const UsersHeading = styled.p`
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 2.5rem 0 0.5rem;
  max-width: none;
  opacity: 0.8;
  text-align: center;
  text-transform: uppercase;
`;

const ShowcaseHeading = styled(UsersHeading)`
  margin: 2rem 0 0.5rem;
`;

const Wrapper = styled.div.attrs((/* props */) => ({
  className: 'hero-header', // for integration tests
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  background: linear-gradient(20deg, #000, #17191e);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
  margin-bottom: 160px;
`;

const EditorContainer = styled.div`
  display: inline-block;
  box-shadow: ${rem(1)} ${rem(1)} ${rem(20)} rgba(20, 20, 20, 0.27);
  margin: ${rem(35)} 0;
  text-align: left;
  width: 100%;
  max-width: 34rem;
`;

const Editor = styled(LiveEditor)`
  ${editorMixin};
  height: 24rem;
  white-space: pre;
  width: 100%;
`;

const Links = styled.div`
  margin: ${rem(36)} 0;
`;

const ShowcaseLink = styled(NextLink)`
  display: block;
  max-width: 100%;
  width: 196px;
  background: red;
  line-height: 48px;
  text-align: center;
  color: white;
  font-family: ${headerFont};
  border-radius: 4px;
  margin: 0 auto;
  background-color: ${blmGrey};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${blmBlack};
  }
`;
