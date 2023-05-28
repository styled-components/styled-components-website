import { useCallback, useEffect, useState } from 'react';

export default function WithIsScrolled(props: { children: React.FC<{ isScrolled: boolean }> }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setIsScrolled((window.pageYOffset || document.body.scrollTop) > 0);
  }, []);

  useEffect(() => {
    // Learn more about how { passive: true } improves scrolling performance
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll, props.children]);

  return props.children({ isScrolled });
}
