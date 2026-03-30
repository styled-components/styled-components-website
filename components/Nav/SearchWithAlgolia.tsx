'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../utils/theme';
import posts from '@/sections/blog/posts.json';

const latestPost = posts[0];

const SUGGESTED_LINKS = [
  { href: '/docs/basics#getting-started', label: 'Getting Started' },
  { href: '/docs/api#primary', label: 'API Reference' },
  { href: '/docs/advanced#theming', label: 'Theming' },
  { href: '/docs/advanced#server-side-rendering', label: 'Server Side Rendering' },
  { href: '/docs/faqs', label: 'FAQs' },
];

function injectStartScreen(modal: Element) {
  const dropdown = modal.querySelector('.DocSearch-Dropdown');
  if (!dropdown || dropdown.querySelector('.DocSearch-StartScreen-Suggestions')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'DocSearch-StartScreen-Suggestions';

  for (const { href, label } of SUGGESTED_LINKS) {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'DocSearch-StartScreen-Suggestions-Card';
    a.textContent = label;
    a.addEventListener('click', () => {
      const overlay = modal.closest('.DocSearch-Container');
      if (overlay instanceof HTMLElement) overlay.click();
    });
    wrapper.appendChild(a);
  }
  dropdown.append(wrapper);

  if (latestPost) {
    const blogLink = document.createElement('a');
    blogLink.href = `/blog/${latestPost.slug}`;
    blogLink.className = 'DocSearch-StartScreen-LatestBlog';
    blogLink.addEventListener('click', () => {
      const overlay = modal.closest('.DocSearch-Container');
      if (overlay instanceof HTMLElement) overlay.click();
    });

    const label = document.createElement('span');
    label.className = 'DocSearch-StartScreen-LatestBlog-Label';
    label.textContent = 'Latest Blog Post';
    blogLink.appendChild(label);

    const title = document.createElement('span');
    title.className = 'DocSearch-StartScreen-LatestBlog-Title';
    title.textContent = latestPost.title;
    blogLink.appendChild(title);

    dropdown.append(blogLink);
  }
}

// Module-level singleton: DocSearch initializes once, survives component remounts
let docSearchInitialized = false;
let docSearchTarget: HTMLDivElement | null = null;
let modalObserver: MutationObserver | null = null;

function initDocSearch(container: HTMLElement, onReady: () => void) {
  if (docSearchInitialized) {
    // Re-attach existing target if component remounted
    if (docSearchTarget && !container.contains(docSearchTarget)) {
      container.appendChild(docSearchTarget);
    }
    onReady();
    return;
  }
  docSearchInitialized = true;

  docSearchTarget = document.createElement('div');
  container.appendChild(docSearchTarget);

  modalObserver = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node instanceof HTMLElement && node.classList.contains('DocSearch-Container')) {
          injectStartScreen(node);
          const dropdown = node.querySelector('.DocSearch-Dropdown');
          if (dropdown) {
            new MutationObserver(() => {
              if (!dropdown.querySelector('.DocSearch-Dropdown-Container')) {
                injectStartScreen(node);
              }
            }).observe(dropdown, { childList: true });
          }
        }
      }
    }
  });
  modalObserver.observe(document.body, { childList: true });

  import('@docsearch/js').then(mdl => {
    mdl.default({
      apiKey: '79886fb59ad3ebe2002b481cffbbe7cb',
      appId: 'BH4D9OD16A',
      container: docSearchTarget!,
      indexName: 'styled-components',
      placeholder: 'Search docs...',
      translations: {
        modal: {
          searchBox: {
            searchInputAriaLabel: 'Search documentation',
            searchInputPlaceholder: 'Search docs...',
          } as any,
          startScreen: {
            noRecentSearchesText: 'Try a suggested topic below',
          },
        },
      },
    });
    onReady();
  });
}

export default function AlgoliaSearch(props: React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(docSearchInitialized);

  useEffect(() => {
    if (!containerRef.current || process.env.NODE_ENV === 'test') return;
    initDocSearch(containerRef.current, () => setReady(true));
  }, []);

  return (
    <div {...props} ref={containerRef}>
      {!ready && <Skeleton aria-hidden="true" />}
    </div>
  );
}

const Skeleton = styled.div`
  height: 2.25rem;
  border-radius: ${theme.radius.md};
  border: 1px solid color-mix(in oklch, ${theme.color.text} 10%, ${theme.color.surface});
  background: var(--docsearch-searchbox-background, ${theme.color.surface});
`;
