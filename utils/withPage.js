import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
`

const Page = styled.div`
  position: absolute;
  left: ${p => p.left || 0};
  top: 0;

  min-height: 100%;
  width: 100%;

  transition: left 0.3s ease-in-out;
`

let lastPathname
let lastPage

const withPage = WrappedComponent => {
  class WithPage extends Component {
    static async getInitialProps({ pathname, isServer }) {
      if (typeof window === 'undefined') {
        return {}
      }

      return { lastPathname, lastPage }
    }

    state = {
      whileTransitioning: false,
      afterTransitioning: false
    }

    componentDidMount() {
      const { lastPage: Last, url: { pathname }} = this.props

      lastPage = WrappedComponent
      lastPathname = pathname

      if (!Last || Last === WrappedComponent) {
        return
      }

      this.timeout = setTimeout(() => {
        this.setState({ fadeOut: true })

        this.timeout = setTimeout(() => {
          this.setState({ afterTransitioning: true })
        }, 350)
      })
    }

    componentWillUnmount() {
      clearTimeout(this.timeout)
    }

    render() {
      const { fadeOut, afterTransitioning } = this.state
      const { lastPage: Last } = this.props
      const shouldTransition = Last && Last !== WrappedComponent

      return (
        <Container>
          { shouldTransition && !afterTransitioning && (
            <Page left={fadeOut ? '-100%' : '0'}>
              <Last />
            </Page>
          )}

          <Page left={!shouldTransition || fadeOut ? '0' : '100%'}>
            <WrappedComponent {...this.props} />
          </Page>
        </Container>
      )
    }
  }

  return WithPage
}

export default withPage
