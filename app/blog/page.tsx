import BlogListPage from '@/components/BlogListPage';
import { getPosts } from '@/utils/blog.server';

export const metadata = {
  title: 'Blog',
  description: 'Articles and announcements from the styled-components team',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogListPage posts={posts} />;
}
