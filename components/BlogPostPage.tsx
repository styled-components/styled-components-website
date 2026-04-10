import DocsLayout from './DocsLayout';
import { BlogByline, BlogColophon } from './BlogMeta';
import type { Post } from '../utils/blog';

export default function BlogPostPage({ post, children }: { post: Post; children: React.ReactNode }) {
  return (
    <DocsLayout title={post.title}>
      <BlogByline author={post.author} date={post.date} />
      {children}
      {post.originalUrl && <BlogColophon author={post.author} originalUrl={post.originalUrl} />}
    </DocsLayout>
  );
}
