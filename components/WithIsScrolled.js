import invariant from 'invariant';
import { useCallback, useEffect, useState } from 'react';

export default function WithIsScrolled(props) {
  const [isScrolled, setIsScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setIsScrolled((window.pageYOffset || document.body.scrollTop) > 0);
  }, []);

  useEffect(() => {
    invariant(typeof props.children === 'function', 'The children prop is expected to be a function');

    // Learn more about how { passive: true } improves scrolling performance
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll, { passive: true });
  }, []);

  return props.children({ isScrolled });
}
