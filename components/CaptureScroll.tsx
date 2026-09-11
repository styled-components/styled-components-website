'use client';

import React from 'react';

const MOBILE_MQ = `(max-width: ${1000 / 16}em)`;

function getScrollRoot(): Element | null {
  return document.querySelector('.root');
}

/**
 * Keeps wheel gestures on the fixed sidebar from fighting the main `.root`
 * scrollport. When the user was recently scrolling the page, continue that
 * scroll even if the cursor drifts over the sidebar; otherwise let the
 * sidebar scroll until it hits an edge.
 */
export default function captureScroll<T extends React.ComponentType>(Component: T) {
  return function CaptureScroll(props: React.ComponentProps<T>) {
    const ref = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      const node = ref.current;
      if (!node) return;

      let lastMainWheel = 0;
      let isMobile = window.matchMedia(MOBILE_MQ).matches;

      const onWindowWheelCapture = (evt: WheelEvent) => {
        // Only count wheels that originate outside the sidebar so sidebar
        // scrolling does not keep resetting the "main scroll" window.
        if (!node.contains(evt.target as Node)) {
          lastMainWheel = evt.timeStamp;
        }
      };

      const handleScroll = (evt: WheelEvent) => {
        if (isMobile) return;

        const { timeStamp, deltaY } = evt;
        const { offsetHeight, scrollHeight, scrollTop } = node;
        const root = getScrollRoot();

        // If the main scrollport was recently wheeled, keep scrolling it
        // instead of the sidebar under the cursor.
        if (root && timeStamp - lastMainWheel <= 400) {
          evt.preventDefault();
          root.scrollBy(0, deltaY);
          lastMainWheel = timeStamp;
          return;
        }

        const maxScrollTop = scrollHeight - offsetHeight;
        const hasReachedTop = deltaY < 0 && scrollTop === 0;
        const hasReachedBottom = deltaY > 0 && scrollTop >= maxScrollTop;
        const isReachingTop = scrollTop + deltaY <= 0;
        const isReachingBottom = scrollTop + deltaY >= maxScrollTop;

        if (hasReachedTop || hasReachedBottom || isReachingTop || isReachingBottom) {
          evt.preventDefault();
        }

        if (isReachingTop || isReachingBottom) {
          node.scrollTop = isReachingTop ? 0 : maxScrollTop;
        }
      };

      const handleResize = () => {
        isMobile = window.matchMedia(MOBILE_MQ).matches;
      };

      window.addEventListener('wheel', onWindowWheelCapture, { capture: true, passive: true });
      // preventDefault is required to redirect / clamp wheel; cannot be passive.
      node.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('wheel', onWindowWheelCapture, true);
        node.removeEventListener('wheel', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // React.ComponentType<P> doesn't model `ref` for generic T, so TS can't
    // verify the callee accepts a ref. Runtime is fine, callers always pass
    // ref-forwarding components.
    // @ts-expect-error see note above
    return <Component {...props} ref={ref} />;
  };
}
