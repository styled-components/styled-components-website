import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from '../components/Image';
import { sortedProjects } from '../companies-manifest';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Github, Bitbucket, Gitlab, Git } from 'styled-icons/fa-brands';
import { Globe } from 'styled-icons/boxicons-regular';
import { NavigateNext, NavigateBefore } from 'styled-icons/material';
import { withRouter } from 'next/router';
import WithIsScrolled from '../components/WithIsScrolled';
import ShowcaseLink, { generateShowcaseUrl } from '../components/Slider/ShowcaseLink';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { mobile, phone } from '../utils/media';

const navHeight = 192;

const Container = styled.div`
  overflow-x: hidden;

  * {
    margin-top: 0;
    font-family: Avenir Next;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0;

    ${phone(css`
      font-size: 2rem;
    `)}
  }

  h2 {
    font-size: 1.75rem;
    line-height: 1.5;

    ${phone(css`
      font-size: 1.5rem;
    `)}
  }

  h5 {
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.6;
  }

  p {
    opacity: 0.6;
  }
`;

const Header = styled.header`
  position: relative;
  height: 512px;
  padding-top: 48px;
  background-color: #daa357;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
  overflow: hidden;

  ${mobile(css`
    padding-top: 92px;
  `)}
`;

const HeaderContent = styled.div`
  width: 100%;
  padding: 48px 0;
  display: grid;
  justify-content: space-between;
  grid-template-columns: minmax(0px, 512px) minmax(128px, 192px);
  grid-column-gap: 24px;
  color: #ffffff;

  ${phone(css`
    grid-template-columns: 1fr;
  `)}
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 80px;

  ${phone(css`
    padding: 0 16px;
  `)}
`;

const InsetWrapper = styled.div`
  padding: 0 64px;

  ${mobile(css`
    padding: 0;
  `)}
`;

const SlideNav = styled.nav`
  position: absolute;
  pointer-events: none;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  transform: translateY(-50%);

  ${phone(css`
    position: relative;
    transform: translateY(0%);
    top: -64px;
  `)}
`;

const NavButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${navHeight}px;
  height: ${navHeight * 0.5625}px;
  color: white;
  overflow: hidden;
  border-radius: 12px;
  transition: 200ms ease-out;
  padding: 0 16px;
  pointer-events: all;

  ${phone(css`
    width: ${navHeight * 0.5}px;
    height: ${navHeight * 0.5 * 0.5625}px;
  `)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    z-index: -2;
    transform: translate(-50%, -50%);
    transition: 200ms ease-out;
  }

  svg {
    display: inline-block;
    color: #ffffff;
    height: 32px;
  }

  &:first-child {
    transform: translateX(-66%);
    justify-content: flex-end;

    &:hover {
      transform: translateX(-60%);
    }
  }
  &:last-child {
    transform: translateX(66%);
    justify-content: flex-start;

    &:hover {
      transform: translateX(60%);
    }
  }

  &:hover {
    img {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
`;

const Body = styled.div`
  position: relative;
`;

const BodyWrapper = styled.div`
  position: relative;
  top: -192px;

  ${mobile(css`
    top: -96px;
  `)}
`;

const Slide = styled(Image)`
  border-radius: 12px;
  box-shadow: 0 32px 48px rgba(0, 0, 0, 0.12);
`;

const SlideMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;

  ${phone(css`
    position: relative;
    top: -86px;
    flex-direction: column-reverse;
  `)}

  em {
    color: rgb(219, 112, 147);
    font-style: normal;
  }
`;

const SlideMetaLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 64px;
  margin-bottom: 24px;
  flex-shrink: 0;
  padding-top: 16px;
  align-items: flex-end;

  ${phone(css`
    margin-left: 0;
    justify-content: center;
    flex-direction: row;

    span {
      display: none;
    }
  `)}
`;

const SlideMetaLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;
  margin-right: -16px;
  padding: 4px 16px;
  border-radius: 8px;

  ${phone(css`
    display: inline-flex;
    justify-content: center;
    margin-right: 0;
    margin-bottom: 0;
    padding: 16px;
    border-radius: 50%;
  `)}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    display: inline-block;
    height: 24px;
    margin-left: 8px;

    ${phone(css`
      margin-left: 0;
    `)}
  }
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
  pointer-events: none;
  animation: ${({ offset }) => getSlide(offset || 0)} 30s linear infinite;
`;

const NativeSelect = styled.select`
  border: 1px solid #ffffff;
  color: #ffffff;
  text-align-last: center;
`;

const HeaderActions = styled.div`
  width: 100%;

  ${phone(css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
  `)}

  * {
    display: block;
    width: 100%;
    margin-top: 20px;
  }

  button,
  a,
  ${NativeSelect} {
    height: 50px;
    border-radius: 4px;
    font-family: Avenir Next;
    font-weight: 500;
    font-size: 1rem;
    line-height: 50px;
    padding: 0;

    ${phone(css`
      height: 40px;
      line-height: 40px;
    `)}
  }

  button,
  a {
    display: block;
    text-align: center;
    background-color: #ffffff;
    color: rgb(219, 112, 147);
    border: none;
    transition: 200ms;

    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

function normalizeSlideIndex(arr, index, fn) {
  const result = fn(index);
  if (result > arr.length - 1) {
    return 0;
  }
  if (result < 0) {
    return arr.length - 1;
  }
  return result;
}

// Since objects don't allow for a sort order we have to map an array to the object
function mapIndexToRoute(index) {
  const route = Object.keys(sortedProjects)[index];
  return sortedProjects[route];
}

function calculateSlides(sortOrder, route) {
  let currentSlideIndex = sortOrder.indexOf(route);
  if (currentSlideIndex === -1) {
    currentSlideIndex = 0;
  }
  const previousSlideIndex = normalizeSlideIndex(sortOrder, currentSlideIndex, x => x - 1);
  const nextSlideIndex = normalizeSlideIndex(sortOrder, currentSlideIndex, x => x + 1);
  return {
    currentSlide: mapIndexToRoute(currentSlideIndex),
    previousSlide: mapIndexToRoute(previousSlideIndex),
    nextSlide: mapIndexToRoute(nextSlideIndex),
  };
}

class ArrowEvents extends React.Component {
  handleKeyDown = event => {
    const isLeft = event.keyCode === 37;
    const isRight = event.keyCode === 39;
    const { router, previousSlide, nextSlide } = this.props;

    if (!isLeft && !isRight) return;

    const { href, as } = generateShowcaseUrl(isLeft ? previousSlide : nextSlide);
    router.replace(href, as);
    return;
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return null;
  }
}

const RepoIcon = ({ url }) => {
  if (url.indexOf('github') > -1) return <Github />;
  if (url.indexOf('bitbucket') > -1) return <Bitbucket />;
  if (url.indexOf('gitlab') > -1) return <Gitlab />;
  return <Git />;
};

const Showcase = ({ router }) => {
  const { item } = router.query;
  const { currentSlide, previousSlide, nextSlide } = calculateSlides(Object.keys(sortedProjects), item);
  const { title, src, owner, link, repo, description } = currentSlide;
  const { src: prevSrc } = previousSlide;
  const { src: nextSrc } = nextSlide;

  return (
    <>
      <WithIsScrolled>{({ isScrolled }) => <Nav showSideNav={false} transparent={!isScrolled} />}</WithIsScrolled>
      <ArrowEvents router={router} previousSlide={previousSlide} nextSlide={nextSlide} />
      <Container>
        <Header>
          <Wrapper>
            <InsetWrapper>
              <HeaderContent>
                <div>
                  <h2>Awesome websites, by awesome humans beings.</h2>
                  <h5>
                    Styled components is used by teams all around the world to create beautiful websites, like these
                    ones:
                  </h5>
                </div>
                <HeaderActions>
                  <NativeSelect name="category" id="categorySelect" value="all">
                    <option value="all">All</option>
                  </NativeSelect>
                  <a
                    href="https://github.com/styled-components/styled-components-website/issues/new?template=company-showcase-request.md&title=Add+%5Bproject%5D+by+%5Bcompany%5D+to+showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share yours!
                  </a>
                </HeaderActions>
              </HeaderContent>
            </InsetWrapper>
          </Wrapper>
          <HeaderDecoration>Showcase</HeaderDecoration>
          <HeaderDecoration offset={1}>Showcase</HeaderDecoration>
          <HeaderDecoration offset={2}>Showcase</HeaderDecoration>
        </Header>
        <Body>
          <Wrapper>
            <BodyWrapper>
              <Slide
                width={1920}
                height={1080}
                src={src}
                margin={0}
                renderImage={props => {
                  return (
                    <TransitionGroup>
                      <CSSTransition key={src} timeout={500} classNames="fade">
                        <img src={src} {...props} />
                      </CSSTransition>
                    </TransitionGroup>
                  );
                }}
              />
            </BodyWrapper>
            <SlideNav>
              <ShowcaseLink item={previousSlide}>
                <NavButton>
                  <img src={prevSrc} alt="" />
                  <NavigateBefore />
                </NavButton>
              </ShowcaseLink>

              <ShowcaseLink item={nextSlide}>
                <NavButton item={nextSlide}>
                  <img src={nextSrc} alt="" />
                  <NavigateNext />
                </NavButton>
              </ShowcaseLink>
            </SlideNav>
            <BodyWrapper>
              <InsetWrapper>
                <SlideMeta>
                  <div>
                    <h1>{title}</h1>
                    <p>
                      <em>By {owner}</em>
                    </p>
                    {description && <p>{description}</p>}
                  </div>
                  <SlideMetaLinks>
                    <SlideMetaLink href={link} target="_blank">
                      <span>Go to website</span>
                      <Globe />
                    </SlideMetaLink>
                    {repo && (
                      <SlideMetaLink href={repo} target="_blank">
                        <span>Go to repository</span>
                        <RepoIcon url={repo} />
                      </SlideMetaLink>
                    )}
                  </SlideMetaLinks>
                </SlideMeta>
              </InsetWrapper>
            </BodyWrapper>
          </Wrapper>
        </Body>
      </Container>
      <Footer />
    </>
  );
};

export default withRouter(Showcase);
