'use client';

import { useEffect, type RefObject } from 'react';

/**
 * `react-simple-code-editor` renders a `<textarea>` with a fixed class name
 * but doesn't expose a ref or way to set `aria-label` declaratively. This
 * hook reaches into the rendered DOM after mount and applies the label iff
 * the textarea doesn't already have an accessible name.
 */
export function useCodeEditorAriaLabel(containerRef: RefObject<HTMLElement | null>, label: string) {
  useEffect(() => {
    const textarea = containerRef.current?.querySelector<HTMLTextAreaElement>(
      'textarea.npm__react-simple-code-editor__textarea'
    );
    if (!textarea) return;
    const hasName = textarea.hasAttribute('aria-label') || textarea.hasAttribute('aria-labelledby');
    if (!hasName) textarea.setAttribute('aria-label', label);
  }, [containerRef, label]);
}
