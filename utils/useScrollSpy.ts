'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks which section id is active while scrolling the `.root` scrollport.
 * Uses IntersectionObserver so we avoid getBoundingClientRect + setState on
 * every scroll frame (a prior source of docs sidebar jank).
 */
export default function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Content-based dep: re-run when the set of ids changes value, not just reference.
  const idsKey = ids.join(',');

  useEffect(() => {
    if (!idsKey) return;
    const localIds = idsKey.split(',');

    const root = document.querySelector('.root');
    if (!root) return;

    const intersecting = new Set<string>();

    const pickActive = () => {
      // Prefer the last intersecting section in document order (closest to
      // the top offset band). Matches prior "top <= 100px" scroll-spy feel.
      let current: string | null = null;
      for (const id of localIds) {
        if (intersecting.has(id)) current = id;
      }

      if (!current) {
        for (const id of localIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 100) current = id;
        }
      }

      setActiveId(prev => (prev === current ? prev : current));
    };

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        pickActive();
      },
      {
        root,
        // Shrink the observed viewport so a section counts as active near the
        // fixed navbar rather than only when it reaches the true top.
        rootMargin: '-100px 0px -55% 0px',
        threshold: 0,
      }
    );

    for (const id of localIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    pickActive();

    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
