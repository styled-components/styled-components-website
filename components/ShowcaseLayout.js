import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from './SeoHead';
import Nav from './Nav';

const Layout = styled.div`
  padding-top: 50px;
  min-height: calc(100vh - 50px);

  @media screen and (max-width: 1000px) {
    padding-top: 90px;
    min-height: calc(100vh - 44px);
  }
`;

// TODO: We should probably have a wrapper component global to the whole project?
const Wrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;

const NativeSelect = styled.select`
  border: 1px solid #ffffff;
  color: #ffffff;
  text-align-last: center;
`;

const Header = styled.header`
  position: relative;
  height: 512px;
  background-color: #daa357;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
  overflow: hidden;
`;

const HeaderContent = styled.div`
  padding: 90px 48px 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const getSlide = childIndex => keyframes`
  from {
    transform: translateX(${childIndex * 105}%);
  }
  to {
    transform: translateX(${-105 + 105 * childIndex}%);
  }
`;

const HeaderDecoration = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: Avenir Next;
  font-size: 16rem;
  line-height: 16rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.1);
  mix-blend-mode: overlay;

  &:last-of-type {
    animation-name: ${getSlide(1)};
  }

  animation: ${getSlide(0)} 30s linear infinite;
`;

const HeaderText = styled.hgroup`
  max-width: 512px;

  * {
    margin-top: 0;
    font-family: Avenir Next;
    color: #ffffff;
  }

  h1 {
    margin-bottom: 12px;
    font-size: 32px;
    line-height: 40px;
  }

  h5 {
    margin-bottom: 0;
    font-size: 20px;
    font-weight: 400;
    opacity: 0.6;
  }
`;

const HeaderActions = styled.div`
  max-width: 200px;
  width: 100%;

  * {
    display: block;
    width: 100%;
    margin-top: 20px;
  }

  button,
  ${NativeSelect} {
    height: 50px;
    border-radius: 4px;
    font-family: Avenir Next;
    font-weight: 500;
    font-size: 18px;
    line-height: 50px;
    padding: 0;
  }

  button {
    background-color: #ffffff;
    color: rgb(219, 112, 147);
    border: none;
  }
`;

class ShowcaseLayout extends Component {
  state = {
    isSideFolded: true,
    isMobileNavFolded: true,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    const { children, title, description } = this.props;

    return (
      <div>
        <Head title={`styled-components${title ? `: ${title}` : ''}`} description={description}>
          <meta name="robots" content="noodp" />
        </Head>

        <Header>
          <Wrapper>
            <Nav transparent showSideNav={false} />
            <HeaderContent>
              <HeaderText>
                <h1>Awesome websites, by awesome humans beings</h1>
                <h5>
                  Styled components is used by teams all around the world to create beautiful websites, like these ones:
                </h5>
              </HeaderText>
              <HeaderActions>
                <NativeSelect name="category" id="categorySelect" value="all">
                  <option value="all">All</option>
                </NativeSelect>
                <button>Share yours!</button>
              </HeaderActions>
            </HeaderContent>
            <HeaderDecoration>Showcase</HeaderDecoration>
            <HeaderDecoration>Showcase</HeaderDecoration>
          </Wrapper>
        </Header>

        <Layout>{children}</Layout>
      </div>
    );
  }
}

export default ShowcaseLayout;
