import { useRouter } from 'next/router';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
import { SortedProject, sortedProjects } from '../companies-manifest';
import Footer from '../components/Footer';
import Image, { ImageProps } from '../components/Image';
import Nav from '../components/Nav';
import SeoHead from '../components/SeoHead';
import Navigation from '../components/Slider/Navigation';
import ShowcaseBody from '../components/Slider/ShowcaseBody';
import { generateShowcaseUrl } from '../components/Slider/ShowcaseLink';
import { blmGrey, blmMetal } from '../utils/colors';
import { headerFont } from '../utils/fonts';
import { mobile, phone } from '../utils/media';

export default function Showcase() {
  const router = useRouter();
  const { item } = router.query;
  const { currentSlide, previousSlide, nextSlide } = calculateSlides(Object.keys(sortedProjects), item as string);
  const { title, src } = currentSlide;

  return (
    <>
      <SeoHead title={`styled-components: Showcase ${title}`}>
        <meta name="robots" content="noodp" />
      </SeoHead>

      <Nav showSideNav={false} />
      <ArrowEvents previousSlide={previousSlide} nextSlide={nextSlide} />

      <Container>
        <Header>
          <Wrapper>
            <InsetWrapper>
              <HeaderContent>
                <div>
                  <h2>Awesome websites, by awesome human beings.</h2>
                  <h5>
                    Styled components is used by teams all around the world to create beautiful websites, like these
                    ones:
                  </h5>
                </div>
                <HeaderActions>
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
          <HeaderDecoration $offset={1}>Showcase</HeaderDecoration>
          <HeaderDecoration $offset={2}>Showcase</HeaderDecoration>
        </Header>
        <Body>
          <Wrapper>
            <BodyWrapper>
              <Slide
                width={1920}
                height={1080}
                src={src}
                margin={0}
                renderImage={(props: Parameters<ImageProps['renderImage']>[0]) => {
                  return (
                    <TransitionGroup>
                      <CSSTransition key={src} timeout={500} classNames="fade">
                        <img {...props} />
                      </CSSTransition>
                    </TransitionGroup>
                  );
                }}
              />
            </BodyWrapper>
            <Navigation prev={previousSlide} next={nextSlide} />
            <BodyWrapper>
              <InsetWrapper>
                <ShowcaseBody {...currentSlide} />
              </InsetWrapper>
            </BodyWrapper>
          </Wrapper>
        </Body>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  overflow-x: hidden;

  * {
    font-family: ${headerFont};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-top: 0;
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
  background: linear-gradient(20deg, ${blmGrey}, ${blmMetal});
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

const getSlide = (childIndex: number) => keyframes`
  from {
    transform: translateX(${childIndex * 105}%);
  }
  to {
    transform: translateX(${-105 + 105 * childIndex}%);
  }
`;

const HeaderDecoration = styled.div<{ $offset?: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: ${headerFont};
  font-size: 16rem;
  line-height: 16rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.1);
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: ${({ $offset }) => getSlide($offset || 0)} 30s linear infinite;
`;

const HeaderActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  a {
    height: 50px;
    border-radius: 4px;
    font-family: ${headerFont};
    font-weight: 500;
    font-size: 1rem;
    line-height: 50px;

    ${phone(css`
      height: 40px;
      line-height: 40px;
    `)}
  }

  button,
  a {
    display: block;
    text-align: center;
    background-color: #fff;
    color: #000;
    border: none;
    transition: 200ms;
    padding: 0;

    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

function normalizeSlideIndex<T extends any[]>(arr: T, index: number, fn: (x: number) => number) {
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
function mapIndexToRoute(index: number) {
  const route = Object.keys(sortedProjects)[index];
  return sortedProjects[route];
}

function calculateSlides(sortOrder: string[], route: string) {
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

interface ArrowEventsProps {
  previousSlide: SortedProject;
  nextSlide: SortedProject;
}

function ArrowEvents({ previousSlide, nextSlide }: ArrowEventsProps) {
  const router = useRouter();

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      const isLeft = event.keyCode === 37;
      const isRight = event.keyCode === 39;

      if (!isLeft && !isRight) return;

      const { href } = generateShowcaseUrl(isLeft ? previousSlide : nextSlide);

      router.replace(href);
    },
    [previousSlide, nextSlide]
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
}
