import React from 'react'
import styled from 'styled-components'

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { resetInput } from '../../utils/form'

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
`

const Input = styled.input`
  ${resetInput};
  flex: 0 0 auto;
  ${resetInput} flex: 0 0 auto;
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
`

const Button = styled.button`
  ${resetInput};
  flex: 0 0 auto;
  ${resetInput} flex: 0 0 auto;
  height: ${rem(navbarHeight)};
  margin-right: ${rem(4)};
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 0.7;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }

  &:active {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    width: ${rem(16)};
    height: ${rem(17)};

    path {
      fill: currentColor;
    }
  }
`

const SearchButton = () =>
  <Button>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>search</title>
      <use fill="#FFF" xlinkHref="#search-icon" />
      <defs>
        <path
          id="search-icon"
          d="M14.772 14.573l-3.698-3.96c.95-1.164 1.472-2.628 1.472-4.153C12.546 2.898 9.732 0 6.273 0 2.813 0 0 2.898 0 6.46s2.814 6.46 6.273 6.46c1.298 0 2.536-.403 3.594-1.17l3.726 3.992c.155.166.365.258.59.258.212 0 .413-.083.566-.235.32-.322.33-.857.02-1.192zm-8.5-12.888c2.558 0 4.637 2.142 4.637 4.775 0 2.633-2.08 4.775-4.64 4.775-2.56 0-4.64-2.142-4.64-4.775 0-2.633 2.08-4.775 4.637-4.775z"
        />
      </defs>
    </svg>
  </Button>

const Search = ({ isDocs }) =>
  <Wrapper>
    <SearchButton />
    <Input
      id="docs-search-input"
      placeholder={isDocs ? `Search ...` : `Search docs ...`}
    />
  </Wrapper>

export default Search
