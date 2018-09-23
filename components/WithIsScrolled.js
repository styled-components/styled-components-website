import { Component } from 'react';
import invariant from 'invariant';

class WithIsScrolled extends Component {
  state = {
    isScrolled: false,
  };

  componentWillMount() {
    invariant(typeof this.props.children === 'function', 'The children prop is expected to be a function');
  }

  componentDidMount() {
    // Learn more about how { passive: true } improves scrolling performance
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, { passive: true });
  }

  onScroll = () => {
    const isScrolled = (window.pageYOffset || document.body.scrollTop) > 0;

    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }
  };

  render() {
    return this.props.children(this.state);
  }
}

export default WithIsScrolled;
