import React from 'react'; // eslint-disable-line
import { findDOMNode } from 'react-dom';

let isMobile;
let lastWheelTimestamp;

if (typeof window !== 'undefined' && window.matchMedia) {
  isMobile = window.matchMedia(`(max-width: ${1000 / 16}em)`).matches;

  if (!isMobile) {
    window.addEventListener('wheel', ({ timeStamp }) => {
      lastWheelTimestamp = timeStamp;
    });
  }
}

const captureScroll = (Component) => {
  if (isMobile) {
    return Component;
  }

  class CaptureScroll extends React.Component {
    onScroll = (evt) => {
      // Don't access window wheel listener
      evt.stopImmediatePropagation();

      const { timeStamp, deltaY } = evt;
      const { offsetHeight, scrollHeight, scrollTop } = this.node;

      // If the window is being scrolled, don't scroll the captured scroll area
      if (timeStamp - lastWheelTimestamp <= 400) {
        lastWheelTimestamp = timeStamp;

        evt.preventDefault();
        window.scrollBy(0, deltaY);
        return;
      }

      const maxScrollTop = scrollHeight - offsetHeight;

      // Has the scroll area reached it's beginning/end
      const hasReachedTop = deltaY < 0 && scrollTop === 0;
      const hasReachedBottom = deltaY > 0 && scrollTop >= maxScrollTop;

      // Is the trajectory overshooting the scroll area
      const isReachingTop = scrollTop + deltaY <= 0;
      const isReachingBottom = scrollTop + deltaY >= maxScrollTop;

      if (hasReachedTop || hasReachedBottom || isReachingTop || isReachingBottom) {
        evt.preventDefault();
      }

      // If we're overshooting, we need to set the maximum available position
      if (isReachingTop || isReachingBottom) {
        this.node.scrollTop = isReachingTop ? 0 : maxScrollTop;
      }
    };

    onResize = () => {
      isMobile = window.matchMedia(`(max-width: ${1000 / 16}em)`).matches;
      if (isMobile) {
        this.node.removeEventListener('wheel', this.onScroll);
      } else {
        this.node.addEventListener('wheel', this.onScroll);
      }
    };

    componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this.node = findDOMNode(this.ref);

      this.node.addEventListener('wheel', this.onScroll);
      window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
      this.node.removeEventListener('wheel', this.onScroll);
      window.removeEventListener('resize', this.onResize);
    }

    render() {
      return <Component {...this.props} ref={(x) => (this.ref = x)} />;
    }
  }

  return CaptureScroll;
};

export default captureScroll;
