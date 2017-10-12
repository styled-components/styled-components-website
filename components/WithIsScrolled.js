import { PureComponent } from 'react'
import debounce from 'debounce'

class WithIsScrolled extends PureComponent {
  constructor(props) {
    super(props)
    this.checkScroll = debounce(this.checkScroll, 50)
  }

  state = {
    isScrolled: false,
  }

  componentDidMount() {
    // Learn more about how { passive: true } improves scrolling performance
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
    window.addEventListener('scroll', this.checkScroll, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll, { passive: true })

    // Clear the debounce timer
    this.checkScroll.clear()
  }

  checkScroll = () => {
    const scrollPos = window.pageYOffset || document.body.scrollTop
    this.setState({
      isScrolled: scrollPos > 0,
    })
  }

  render() {
    const { children } = this.props
    const { isScrolled } = this.state
    const childrenProps = {
      isScrolled,
    }
    return typeof children === 'function' ? children(childrenProps) : null
  }
}

export default WithIsScrolled
