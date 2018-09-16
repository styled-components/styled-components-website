import React, { Component } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Search from './Search'

class SearchWithAlgolia extends Component {
  static propTypes = {
    className: PropTypes.string,
    requestModalClose: PropTypes.func.isRequired,
  }
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
        handleSelected: (input, event, suggestion) => {
          // original handleselect
          this.props.requestModalClose()
          input.setVal('')
          window.location.assign(suggestion.url)
        },
      })
    }
  }

  render() {
    return <Search isDocs={this.isDocs} className={this.props.className} />
  }
}

export default SearchWithAlgolia
