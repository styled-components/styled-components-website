'use client';

import { useEffect, useRef } from 'react';

export default function HeroLogoObserver({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.toggleAttribute('data-hero-logo-visible', entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute('data-hero-logo-visible');
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
