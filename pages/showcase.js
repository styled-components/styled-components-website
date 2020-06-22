import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { sortedProjects } from '../companies-manifest';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { withRouter } from 'next/router';
import WithIsScrolled from '../components/WithIsScrolled';
import { mobile, phone } from '../utils/media';
import { ShowcaseGrid } from '../components/ShowcaseGrid';
import { blmGrey, blmMetal } from '../utils/colors';
import { GridTwoUp as GridIcon, GridThreeUp as DenseGridIcon } from '@styled-icons/open-iconic';
import { FilterAlt as FilterIcon, Sort as SortIcon } from '@styled-icons/boxicons-regular';

const Container = styled.div`
  overflow-x: hidden;

  * {
    font-family: Avenir Next;
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
  height: 568px;
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
  padding: 48px 0 32px;
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

const GridWrapper = styled.div`
  position: relative;
  top: -160px;

  ${mobile(css`
    top: -96px;
  `)}
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

const NativeSelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 0 8px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' fill='white'><path d='M7 10l5 5 5-5z'/></svg>");
  background-position: 98% 50%;
  border-radius: 4px;
  min-width: 128px;

  ${phone(css`
    min-width: 40px;
    width: 40px;
    background-image: none;
  `)}

  svg {
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-right: 8px;
  }

  select {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 36px;
    width: 100%;
    height: 100%;
    appearance: none;
    border: none;
    outline: none;
    padding-right: 24px;
    line-height: 25px;

    ${phone(css`
      opacity: 0;
    `)}

    &::after {
      content: '';
      height: 10px;
      width: 10px;
      border: 8px solid black;
    }
  }
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
    font-family: Avenir Next;
    font-weight: 500;
    font-size: 1rem;
    line-height: 50px;
    border-radius: 4px;

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
    color: ${blmGrey};
    border: none;
    transition: 200ms;
    padding: 0;

    &:hover {
      background-color: #f3f3f3;
    }
  }
`;

const HeaderToolbar = styled.div`
  display: flex;
  justify-content: center;
  color: white;

  ${NativeSelect} {
    margin-left: 16px;
  }
`;

const FlexSpacer = styled.div`
  flex-grow: 1;
`;

const DisplayModePicker = styled.div`
  position: relative;
  border: 1px solid white;
  justify-self: center;
  border-radius: 4px;
  padding: 4px 2px;

  &::before {
    content: '';
    position: absolute;
    border-radius: 2px;
    display: block;
    top: 4px;
    left: 0;
    z-index: 0;
    height: 32px;
    width: 32px;
    background-color: white;
    transition: 0.2s;
    transform: translateX(${({ $activeIndex }) => $activeIndex * 32 + ($activeIndex + 1) * 4}px);
  }
`;

const DisplayModePickerOption = styled.button`
  position: relative;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  height: 32px;
  width: 32px;
  margin: 0 2px;

  ${({ $active }) =>
    $active &&
    css`
      color: ${blmGrey};
    `};

  svg {
    width: 16px;
  }
`;

const Showcase = () => {
  const [gridDensity, setGridDensity] = useState('REGULAR');

  return (
    <>
      <WithIsScrolled>{({ isScrolled }) => <Nav showSideNav={false} transparent={!isScrolled} />}</WithIsScrolled>
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
                  <a
                    href="https://github.com/styled-components/styled-components-website/issues/new?template=company-showcase-request.md&title=Add+%5Bproject%5D+by+%5Bcompany%5D+to+showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share yours!
                  </a>
                </HeaderActions>
              </HeaderContent>
              <HeaderToolbar>
                <DisplayModePicker $activeIndex={['REGULAR', 'DENSE'].indexOf(gridDensity)}>
                  <DisplayModePickerOption
                    $active={gridDensity === 'REGULAR'}
                    onClick={() => setGridDensity('REGULAR')}
                  >
                    <GridIcon />
                  </DisplayModePickerOption>
                  <DisplayModePickerOption $active={gridDensity === 'DENSE'} onClick={() => setGridDensity('DENSE')}>
                    <DenseGridIcon />
                  </DisplayModePickerOption>
                </DisplayModePicker>
                <FlexSpacer />
                <NativeSelect name="category" id="categorySelect" value="all">
                  <FilterIcon />
                  <select>
                    <option value="all">All</option>
                  </select>
                </NativeSelect>
                <NativeSelect name="category" id="categorySelect" value="all">
                  <SortIcon />
                  <select>
                    <option value="all">Popular</option>
                    <option value="all">New</option>
                    <option value="all">Name</option>
                  </select>
                </NativeSelect>
              </HeaderToolbar>
            </InsetWrapper>
          </Wrapper>
          <HeaderDecoration>Showcase</HeaderDecoration>
          <HeaderDecoration offset={1}>Showcase</HeaderDecoration>
          <HeaderDecoration offset={2}>Showcase</HeaderDecoration>
        </Header>
        <Body>
          <Wrapper>
            <GridWrapper>
              <ShowcaseGrid items={Object.values(sortedProjects)} density={gridDensity} />
            </GridWrapper>
          </Wrapper>
        </Body>
      </Container>
      <Footer />
    </>
  );
};

export default withRouter(Showcase);
