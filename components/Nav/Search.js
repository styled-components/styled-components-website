import React, { Component } from 'react'
import styled from 'styled-components'

let docsearch
if (process.browser) {
  docsearch = require('docsearch.js')
}

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { resetInput } from '../../utils/form'

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  margin-right: ${rem(10)};
`

const Input = styled.input`
  ${resetInput}

  flex: 0 0 auto;
  width: ${rem(130)};
  padding: 0 ${rem(5)};
  line-height: ${rem(navbarHeight - 20)};
  font-size: ${rem(15)};
  color: currentColor;
  transition: background 100ms ease-in;

  ::placeholder {
    color: currentColor;
    opacity: 0.5;
  }

  &:focus {
    background: rgba(0, 0, 0, 0.07);
    border-radius: 3px;
  }
`

const Label = styled.label`
  text-indent: -99999px;

  span {
    position: absolute;
  }
`

const SvgIcon = styled.svg`
  width: ${rem(16)};
  height: ${rem(17)};
  margin-right: ${rem(5)};
  display: block;

  path {
    fill: currentColor;
  }
`

const SearchIcon = () => (
  <Label htmlFor="docs-search-input">
    <span>Search</span>
    <SvgIcon width="15" height="16">
      <title>search</title>
      <use fill="#FFF" xlinkHref="#search-icon"/>
      <defs>
        <path id="search-icon" d="M14.772 14.573l-3.698-3.96c.95-1.164 1.472-2.628 1.472-4.153C12.546 2.898 9.732 0 6.273 0 2.813 0 0 2.898 0 6.46s2.814 6.46 6.273 6.46c1.298 0 2.536-.403 3.594-1.17l3.726 3.992c.155.166.365.258.59.258.212 0 .413-.083.566-.235.32-.322.33-.857.02-1.192zm-8.5-12.888c2.558 0 4.637 2.142 4.637 4.775 0 2.633-2.08 4.775-4.64 4.775-2.56 0-4.64-2.142-4.64-4.775 0-2.633 2.08-4.775 4.637-4.775z"/>
      </defs>
    </SvgIcon>
  </Label>
)

class Search extends Component {
  componentDidMount() {
    if (process.browser && typeof docsearch !== 'undefined') {
      docsearch({
        apiKey: '79886fb59ad3ebe2002b481cffbbe7cb',
        indexName: 'styled-components',
        inputSelector: '[class^="Search__Input"]',
        debug: true // Set debug to true if you want to inspect the dropdown
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <SearchIcon />
        <Input
          placeholder="Search ..."
          id="docs-search-input"
        />
      </Wrapper>
    )
  }
}

export default Search
