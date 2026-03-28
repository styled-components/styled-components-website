import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/BlogPostPage';
import CelebrationEffect from '@/components/CelebrationEffect';
import posts from '@/sections/blog/posts.json';
import { postBySlug } from '@/utils/blog';

export function generateStaticParams() {
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug.get(slug);
  if (!post) return { title: 'Post Not Found' };

  const mod = await import(`@/sections/blog/${post.date}-${post.slug}.mdx`);

  return {
    title: mod.meta?.title ?? post.title,
    description: mod.meta?.description ?? `${post.title} by ${post.author}`,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug.get(slug);

  if (!post) {
    notFound();
  }

  let MdxContent: React.ComponentType;
  let meta: Record<string, string> | undefined;
  try {
    const mod = await import(`@/sections/blog/${post.date}-${post.slug}.mdx`);
    MdxContent = mod.default;
    meta = mod.meta;
  } catch {
    notFound();
  }

  return (
    <>
      {slug === 'celebrating-a-decade-of-styled-components' && <CelebrationEffect />}
      <BlogPostPage post={{ ...post, description: meta?.description }}>
        <MdxContent />
      </BlogPostPage>
    </>
  );
}
