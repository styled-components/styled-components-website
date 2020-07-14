import React, { useEffect, useRef } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { Search as SearchIcon } from '@styled-icons/material';
import PropTypes from 'prop-types';
import { grey, blmLightGrey, blmGrey, darkGrey } from '../../utils/colors';
import rem from '../../utils/rem';
import { navbarHeight } from '../../utils/sizes';
import { resetInput } from '../../utils/form';
import { mobile } from '../../utils/media';

const StyledSearchIcon = styled(SearchIcon)``;

const INPUT_ID = 'docs-search-input';

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  ${mobile(css`
    display: block;
    padding: 0;
    span.algolia-autocomplete {
      display: block !important;
    }
    span.ds-dropdown-menu::before {
      display: none;
    }
  `)};
`;

const Input = styled.input`
  ${resetInput};
  appearance: none;
  flex: 0 0 auto;
  width: ${rem(130)};
  line-height: ${rem(navbarHeight - 20)};
  font-size: ${rem(15)};
  color: currentColor;

  ::placeholder {
    color: currentColor;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
  }

  :focus {
    ::placeholder {
      opacity: 0.8;
    }
  }

  ${mobile(css`
    padding: ${rem(10)} ${rem(48)};
    display: block;
    width: 100%;
    background: ${blmGrey};
    color: white;
  `)};
`;

const Button = styled.label.attrs((/* props */) => ({
  htmlFor: INPUT_ID,
}))`
  ${resetInput};
  flex: 0 0 auto;
  ${resetInput} flex: 0 0 auto;
  margin-right: ${rem(4)};
  cursor: pointer;
  display: flex;
  &:hover,
  &:focus {
    opacity: 0.7;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }

  &:active {
    background: rgba(0, 0, 0, 0.1);
  }

  ${StyledSearchIcon} {
    width: ${rem(26)};
    height: ${rem(26)};
  }

  ${mobile(css`
    position: absolute;
    top: ${rem(9)};
    left: ${rem(10)};
    height: ${rem(32)};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${rem(32)};
    z-index: 1;
    background: none;
    color: white;
  `)};
`;

const GlobalStyles = createGlobalStyle`
  .algolia-autocomplete
  .ds-dropdown-menu
  .ds-suggestion
  .algolia-docsearch-suggestion--content {
    width: 100% !important;

    &::before {
      content: none;
    }
  }

  .algolia-autocomplete
    .ds-dropdown-menu
    .ds-suggestion.ds-cursor
    .algolia-docsearch-suggestion--content {
    background: ${blmLightGrey} !important;
  }

  /* Main category (eg. Getting Started) */
  .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
    color: ${darkGrey};
  }

  /* Category (eg. Downloads) */
  .algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column {
    display: none !important;
  }

  /* Title (eg. Bootstrap CDN) */
  .algolia-autocomplete .algolia-docsearch-suggestion--title {
    font-weight: bold;
    color: black;
  }

  /* Description description (eg. Bootstrap currently works...) */
  .algolia-autocomplete .algolia-docsearch-suggestion--text {
    color: ${grey};
  }

  /* Highlighted text */
  .algolia-autocomplete .algolia-docsearch-suggestion--highlight {
    box-shadow: none !important;
    color: ${blmGrey} !important;
    background: transparent !important;
  }

  .algolia-autocomplete .ds-dropdown-menu {
    margin-top: 0;

    > *:first-child {
      border: 0;
    }
  }
`;

const Search = ({ isDocs, className }) => {
  const searchInput = useRef(null);

  useEffect(() => {
    if (searchInput.current) searchInput.current.focus();
  }, [searchInput.current]);

  return (
    <Wrapper className={className}>
      <GlobalStyles />
      <Button>
        <StyledSearchIcon />
      </Button>
      <Input id={INPUT_ID} placeholder={isDocs ? `Search ...` : `Search docs ...`} ref={searchInput} type="search" />
    </Wrapper>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
