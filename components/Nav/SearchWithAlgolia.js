import React, { Component } from 'react'
import Router from 'next/router'

import Search from './Search'

class SearchWithAlgolia extends Component {
  isDocs = true

  componentWillMount() {
    this.isDocs = process.browser && Router.pathname.startsWith('/docs')
  }

  componentDidMount() {
    const docsearch = require('docsearch.js')

    // for Jest
    if (process.browser) {
      docsearch({
        apiKey: '79886fb59ad3ebe2002b481cffbbe7cb',
        indexName: 'styled-components',
        inputSelector: '[class^="Search__Input"]',
        debug: true, // Set debug to true if you want to inspect the dropdown
      })
    }
  }

  render() {
    return <Search isDocs={this.isDocs} />
  }
}

export default SearchWithAlgolia
