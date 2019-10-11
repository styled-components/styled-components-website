import React, { PureComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { LiveProvider, LiveEditor, LivePreview } from 'react-live';

import rem from '../utils/rem';
import { violetRed, gold } from '../utils/colors';
import { editorMixin, StyledError } from '../components/LiveEdit';
import Link from '../components/Link';
import { Content } from '../components/Layout';
import SeoHead from '../components/SeoHead';
import HomepageGettingStarted from '../sections/homepage/getting-started.md';
import WithIsScrolled from '../components/WithIsScrolled';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { sortedCompanies } from '../companies-manifest';

const Tagline = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
`;

const SupportingTagline = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
`;

const headerCode = `
const Button = styled.a\`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  \${props => props.primary && css\`
    background: white;
    color: palevioletred;
  \`}
\`

render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs" prefetch>
      Documentation
    </Button>
  </div>
)
`.trim();

const Title = styled.div`
  margin: 2rem 0;

  h1,
  h2 {
    margin: 0;
  }
`;

const Logo = styled.img.attrs((/* props */) => ({
  alt: 'styled-components Logo',
  src: '/static/logo.png',
}))`
  width: ${rem(125)};
  height: ${rem(125)};
`;

const slideAnimation = keyframes`
  from{
    transform:translate3d(0,0,0);
  }

  to{
    transform:translate3d(-50%,0,0);
  }
`;

const UsersSliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const UsersSlider = styled.div`
  display: inline-block;
  animation: ${slideAnimation} 60s linear infinite;
  white-space: nowrap;
  overflow: hidden;
`;

const UsersWrapper = styled.section`
  white-space: nowrap;
  overflow: hidden;
  padding: 0.5rem;
  display: flex;
  margin-bottom: 2rem;
`;

const UsersHeading = styled.p`
  text-transform: uppercase;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 2.5rem 0 0.5rem;
  opacity: 0.8;
`;

const CompanyLogo = styled.span`
  position: relative;
  height: ${p => p.height || '2rem'};
  margin: 0.5rem 1rem;
  bottom: ${p => p.bottom || 0};
  opacity: 0.8;
  filter: brightness(0) invert(1);
  transition: opacity 125ms ease-in-out;

  &:hover {
    opacity: 1;
  }
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

  background: linear-gradient(20deg, ${violetRed}, ${gold});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
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

const SortedLogos = () => (
  <UsersWrapper>
    {sortedCompanies.map(({ key, logo: Logo, ...rest }) => (
      <CompanyLogo key={key} {...rest}>
        <Logo />
      </CompanyLogo>
    ))}
  </UsersWrapper>
);

class Index extends PureComponent {
  state = {
    isMobileNavFolded: true,
  };

  toggleMobileNav = () => {
    this.setState(prevState => ({
      isMobileNavFolded: !prevState.isMobileNavFolded,
    }));
  };

  onRouteChange = () => {
    this.setState({
      isMobileNavFolded: true,
    });
  };

  render() {
    const { isMobileNavFolded } = this.state;
    return (
      <div>
        <SeoHead title="styled-components">
          <meta name="robots" content="noodp" />
        </SeoHead>

        <WithIsScrolled>
          {({ isScrolled }) => (
            <Nav
              showSideNav={false}
              transparent={!isScrolled}
              isMobileNavFolded={isMobileNavFolded}
              onMobileNavToggle={this.toggleMobileNav}
              onRouteChange={this.onRouteChange}
            />
          )}
        </WithIsScrolled>

        <Wrapper>
          <Content hero>
            <LiveProvider code={headerCode} noInline mountStylesheet={false} scope={{ React, styled, css, rem, Link }}>
              <Logo />

              <Title>
                <Tagline>Visual primitives for the component age.</Tagline>
                <SupportingTagline>
                  Use the best bits of ES6 and CSS to style your apps without stress 💅
                </SupportingTagline>
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
          <UsersSliderContainer>
            <UsersSlider>
              <SortedLogos />
            </UsersSlider>
          </UsersSliderContainer>
        </Wrapper>

        <HomepageGettingStarted />

        <Footer />
      </div>
    );
  }
}

export default Index;
