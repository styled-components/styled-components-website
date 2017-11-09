import React, { Component } from 'react'
import Router from 'next/router'

import Search from './Search'

let docsearch
if (process.browser) {
  docsearch = require('docsearch.js')
}

class SearchWithAlgolia extends Component {
  isDocs = true

  componentWillMount() {
    this.isDocs = process.browser && Router.pathname.startsWith('/docs')
  }

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
    if (this.isDocs) {
      return <Search />
    }

    return null
  }
}

export default SearchWithAlgolia
