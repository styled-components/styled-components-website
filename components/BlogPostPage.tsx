'use client';

import { createGlobalStyle } from 'styled-components';
import DocsLayout from './DocsLayout';
import BlogMeta from './BlogMeta';
import BlogSidebarMenu from './Nav/BlogSidebarMenu';
import type { Post } from '../utils/blog';

const blogSidebar = <BlogSidebarMenu />;

const BlogStyles = createGlobalStyle`
  [data-e2e-id="content"] {
    max-width: 100ch;
  }

  [data-e2e-id="content"] img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;

export default function BlogPostPage({
  post,
  children,
}: {
  post: Post & { description?: string };
  children: React.ReactNode;
}) {
  return (
    <DocsLayout title={post.title} description={post.description ?? `${post.title} by ${post.author}`}>
      <BlogStyles />
      <BlogMeta author={post.author} date={post.date} originalUrl={post.originalUrl} />

      {children}
    </DocsLayout>
  );
}
