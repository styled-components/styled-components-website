import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import {
  lightGrey,
  grey,
  lightVioletRed,
  gold,
  darkGrey,
} from '../../utils/colors'
import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { resetInput } from '../../utils/form'
import { mobile } from '../../utils/media'

const INPUT_ID = 'docs-search-input'

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  ${mobile(css`
    display: block;
    padding: ${rem(10)};
    span.algolia-autocomplete {
      display: block !important;
    }
    span.ds-dropdown-menu::before {
      display: none;
    }
  `)};
`

const Input = styled.input`
  ${resetInput};
  flex: 0 0 auto;
  width: ${rem(130)};
  line-height: ${rem(navbarHeight - 20)};
  font-size: ${rem(15)};
  color: currentColor;
  ::placeholder {
    color: currentColor;
    opacity: 0.5;
  }
  &:focus {
    border-bottom: 1px solid currentColor;
  }
  ${mobile(css`
    padding-left: ${rem(40)};
    display: block;
    width: 100%;
    border: 1px solid ${lightGrey};
    border-radius: ${rem(3)};
    background: ${grey};
    color: white;
    &:focus {
      border-bottom: 1px solid ${lightGrey};
    }
  `)};
`

const StyledSearchIcon = styled(FontAwesomeIcon).attrs({
  icon: faSearch,
})``

const Button = styled.label.attrs({
  for: INPUT_ID,
})`
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
    width: ${rem(20)};
    height: ${rem(20)};

    path {
      fill: currentColor;
    }
  }
  ${mobile(css`
    position: absolute;
    height: ${rem(34)};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${rem(34)};
    z-index: 1;
    background: ${grey};
    color: white;
    border-radius: ${rem(3)};
  `)};
`

const SearchButton = () => (
  <Button>
    <StyledSearchIcon />
  </Button>
)

const GlobalStyles = createGlobalStyle`
    .algolia-autocomplete
      .ds-dropdown-menu
      .ds-suggestion.ds-cursor
      .algolia-docsearch-suggestion.suggestion-layout-simple,
    .algolia-autocomplete
      .ds-dropdown-menu
      .ds-suggestion.ds-cursor
      .algolia-docsearch-suggestion:not(.suggestion-layout-simple)
      .algolia-docsearch-suggestion--content {
      background: ${lightVioletRed};
    }

    /* Main category (eg. Getting Started) */
    .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
      color: ${darkGrey};
    }

    /* Category (eg. Downloads) */
    .algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column {
      color: ${grey};
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
      color: ${gold};
      background: transparent;
    }
`

const Search = ({ isDocs, className }) => (
  <Wrapper className={className}>
    <GlobalStyles />
    <SearchButton />
    <Input
      id={INPUT_ID}
      placeholder={isDocs ? `Search ...` : `Search docs ...`}
    />
  </Wrapper>
)

Search.propTypes = {
  className: PropTypes.string,
}

export default Search
