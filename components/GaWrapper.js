import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'

export default WrappedComponent =>
  class GaWrapper extends Component {
    constructor(props) {
      super(props)
      this.trackPageview = this.trackPageview.bind(this)
    }

    componentDidMount() {
      if (window !== undefined) {
        this.initGa()
      }
      
      // Track Page event for GA
      this.trackPageview()
      Router.router.events.on('routeChangeComplete', this.trackPageview)

     
    }

    componentWillUnmount() {
      Router.router.events.off('routeChangeComplete', this.trackPageview)
    }

    trackPageview(path = document.location.pathname) {
      if (path !== this.lastTrackedPath) {
        ReactGA.pageview(path)

        this.lastTrackedPath = path
      }
    }

    initGa() {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize('UA-105613776-1', {debug: true})
        window.GA_INITIALIZED = true
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
