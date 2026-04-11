import DocsLayout from './DocsLayout';
import { BlogByline } from './BlogMeta';
import BlogComments from './BlogComments';
import Footer from './Footer';
import type { Post } from '../utils/blog';

export default function BlogPostPage({ post, children }: { post: Post; children: React.ReactNode }) {
  return (
    <DocsLayout title={post.title}>
      <BlogByline
        author={post.author}
        date={post.date}
        originalUrl={post.originalUrl}
        showJumpToComments={!!post.blueskyPostUrl}
      />
      {children}
      {post.blueskyPostUrl && <BlogComments blueskyPostUrl={post.blueskyPostUrl} />}
      <Footer />
    </DocsLayout>
  );
}
