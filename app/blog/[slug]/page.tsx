import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/BlogPostPage';
import CelebrationEffect from '@/components/CelebrationEffect';
import { getPosts, getPostBySlug } from '@/utils/blog.server';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description ?? `${post.title} by ${post.author}`,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let MdxContent: React.ComponentType;
  try {
    const mod = await import(`@/sections/blog/${post.date}-${post.slug}.mdx`);
    MdxContent = mod.default;
  } catch {
    notFound();
  }

  return (
    <>
      {slug === 'celebrating-a-decade-of-styled-components' && <CelebrationEffect />}
      <BlogPostPage post={post}>
        <MdxContent />
      </BlogPostPage>
    </>
  );
}
