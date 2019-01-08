import React, { PureComponent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { LiveProvider, LiveEditor, LivePreview } from '@probablyup/react-live';
import { Favorite } from 'styled-icons/material';

import rem from '../utils/rem';
import { monospace } from '../utils/fonts';
import { mobile } from '../utils/media';
import { violetRed, gold, grey, paleGrey, red } from '../utils/colors';
import { editorMixin, StyledError } from '../components/LiveEdit';
import Link from '../components/Link';
import { Content } from '../components/Layout';
import SeoHead from '../components/SeoHead';
import HomepageGettingStarted from '../sections/homepage/getting-started.md';
import WithIsScrolled from '../components/WithIsScrolled';
import Nav from '../components/Nav';

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

import {
  DoorDashLogo,
  BloombergLogo,
  AtlassianLogo,
  RedditLogo,
  TargetLogo,
  EuroVisionLogo,
  ArtsyLogo,
  IdeoLogo,
  HuffpostLogo,
  CoinbaseLogo,
  PatreonLogo,
  Auth0Logo,
  BBCLogo,
  CasperLogo,
  MoleskineLogo,
  AirBnBLogo,
  TinderLogo,
  LegoLogo,
  TicketmasterLogo,
  TypeformLogo,
  VogueLogo,
  InVisionLogo,
  XingLogo,
  MagicLeapLogo,
  BlueTomatoLogo,
} from '../components/CompanyLogos';

const Title = styled.div`
  margin: 2rem 0;

  h1,
  h2 {
    margin: 0;
  }
`;

const Logo = styled.img.attrs({
  alt: 'styled-components Logo',
  src: '/static/logo.png',
})`
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

const Wrapper = styled.div.attrs({
  className: 'hero-header', // for integration tests
})`
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

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${grey};
  background: ${paleGrey};
  box-sizing: border-box;
  margin-top: ${rem(50)};
`;

const Heart = styled(Favorite)`
  display: inline-block;
  width: ${rem(17)};
  color: ${red};
  transform: translateY(-10%);
`;

const FooterLink = styled(Link)`
  color: ${grey};

  ${p =>
    p.monospaced &&
    css`
      font-family: ${monospace};
    `};
`;

const FooterContent = styled(Content)`
  padding: ${rem(30)} ${rem(40)} ${rem(30)} ${rem(40)};

  ${mobile(css`
    padding: ${rem(30)} ${rem(20)} ${rem(30)} ${rem(20)};
  `)};
`;

const Logos = () => {
  return (
    <>
      <CompanyLogo bottom="0.3rem" height="2.5rem">
        <AirBnBLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.16rem" height="2.25rem" src="/static/artsy-logo.svg">
        <ArtsyLogo />
      </CompanyLogo>

      <CompanyLogo height="1.75rem">
        <AtlassianLogo />
      </CompanyLogo>

      <CompanyLogo>
        <Auth0Logo />
      </CompanyLogo>

      <CompanyLogo>
        <BBCLogo />
      </CompanyLogo>

      <CompanyLogo bottom="-0.2rem" height="1.75rem">
        <BloombergLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.75rem" height="3rem">
        <BlueTomatoLogo />
      </CompanyLogo>

      <CompanyLogo bottom="-0.2rem">
        <CasperLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.3rem" height="2rem" src="/static/coinbase-logo.svg">
        <CoinbaseLogo />
      </CompanyLogo>

      <CompanyLogo bottom="-0.2rem">
        <DoorDashLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.1rem" height="2.5rem">
        <EuroVisionLogo />
      </CompanyLogo>

      <CompanyLogo src="/static/huffpost-logo.svg">
        <HuffpostLogo />
      </CompanyLogo>

      <CompanyLogo bottom="-0.15rem" height="1.5rem">
        <IdeoLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.1rem" height="2.25rem">
        <InVisionLogo />
      </CompanyLogo>

      <CompanyLogo>
        <LegoLogo />
      </CompanyLogo>

      <CompanyLogo bottom="1rem" height="4rem">
        <MagicLeapLogo />
      </CompanyLogo>

      <CompanyLogo bottom="-0.15rem" height="1.3rem">
        <MoleskineLogo />
      </CompanyLogo>

      <CompanyLogo>
        <PatreonLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.15rem">
        <RedditLogo />
      </CompanyLogo>

      <CompanyLogo>
        <TargetLogo />
      </CompanyLogo>

      <CompanyLogo height="1.7rem">
        <TicketmasterLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.2rem">
        <TinderLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.15rem" height="2.35rem">
        <TypeformLogo />
      </CompanyLogo>

      <CompanyLogo height="1.8rem">
        <VogueLogo />
      </CompanyLogo>

      <CompanyLogo bottom="0.7rem" height="2.5rem">
        <XingLogo />
      </CompanyLogo>
    </>
  );
};

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
              <UsersWrapper>
                <Logos />
                <Logos />
              </UsersWrapper>
            </UsersSlider>
          </UsersSliderContainer>
        </Wrapper>

        <HomepageGettingStarted />

        <Footer>
          <FooterContent hero>
            {' '}
            {'Hosted on ▲ ZEIT Now'}
            <br />
            {'Made with '}
            <Heart />
            {' by '}
            <FooterLink inline href="https://twitter.com/glenmaddern">
              @glenmaddern
            </FooterLink>
            {', '}
            <FooterLink inline href="https://twitter.com/mxstbr">
              @mxstbr
            </FooterLink>
            {', '}
            <FooterLink inline href="https://twitter.com/_philpl">
              @_philpl‬
            </FooterLink>
            {', '}
            <FooterLink inline href="https://twitter.com/probablyup">
              @probablyup
            </FooterLink>
            {', '}
            <FooterLink inline href="https://twitter.com/imbhargav5">
              @imbhargav5
            </FooterLink>
            {' and '}
            <FooterLink inline href="https://github.com/orgs/styled-components/people">
              contributors
            </FooterLink>
            {'.'}
            <br />
            {'All code examples use '}
            <FooterLink monospaced inline href="https://dank.sh">
              Dank Mono
            </FooterLink>
            {'.'}
          </FooterContent>
        </Footer>
      </div>
    );
  }
}

export default Index;
