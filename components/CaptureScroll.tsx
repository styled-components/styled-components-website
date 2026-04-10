'use client';

import React from 'react';

let isMobile: boolean;
let lastWheelTimestamp: number;

if (typeof window !== 'undefined' && window.matchMedia) {
  isMobile = window.matchMedia(`(max-width: ${1000 / 16}em)`).matches;

  if (!isMobile) {
    window.addEventListener(
      'wheel',
      ({ timeStamp }) => {
        lastWheelTimestamp = timeStamp;
      },
      { passive: true }
    );
  }
}

export default function captureScroll<T extends React.ComponentType>(Component: T) {
  if (isMobile) {
    return Component;
  }

  return function CaptureScroll(props: React.ComponentProps<T>) {
    const ref = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      const node = ref.current;
      if (!node) return;

      const handleScroll = (evt: Event & { deltaY: number }) => {
        // Don't access window wheel listener
        evt.stopImmediatePropagation();

        const { timeStamp, deltaY } = evt;
        const { offsetHeight, scrollHeight, scrollTop } = node;

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
          node.scrollTop = isReachingTop ? 0 : maxScrollTop;
        }
      };

      const handleResize = () => {
        isMobile = window.matchMedia(`(max-width: ${1000 / 16}em)`).matches;
        if (isMobile) {
          node.removeEventListener('wheel', handleScroll as EventListener);
        } else {
          node.addEventListener('wheel', handleScroll as EventListener);
        }
      };

      node.addEventListener('wheel', handleScroll as EventListener);
      window.addEventListener('resize', handleResize);

      return () => {
        node.removeEventListener('wheel', handleScroll as EventListener);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // React.ComponentType<P> doesn't model `ref` for generic T, so TS can't
    // verify the callee accepts a ref. Runtime is fine — callers always pass
    // ref-forwarding components.
    // @ts-expect-error see note above
    return <Component {...props} ref={ref} />;
  };
}
