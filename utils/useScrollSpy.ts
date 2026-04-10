'use client';

import { useState, useEffect, useRef } from 'react';

export default function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const lastId = useRef<string | null>(null);
  const raf = useRef<number>(0);

  // Content-based dep: re-run when the set of ids changes value, not just reference.
  // Re-derive the array inside the effect so the linter sees a single string dep.
  const idsKey = ids.join(',');

  useEffect(() => {
    if (!idsKey) return;
    const localIds = idsKey.split(',');

    const root = document.querySelector('.root');
    if (!root) return;

    const update = () => {
      let current: string | null = null;

      for (const id of localIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 100) {
          current = id;
        }
      }

      if (current !== lastId.current) {
        lastId.current = current;
        setActiveId(current);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };

    root.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      root.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [idsKey]);

  return activeId;
}
