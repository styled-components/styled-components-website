import type { MDXComponents } from 'mdx/types';
import components from './utils/mdx-components';

export function useMDXComponents(userComponents: MDXComponents = {}): MDXComponents {
  return {
    ...components,
    ...userComponents,
  };
}
