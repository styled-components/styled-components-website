import 'server-only';
import { readdirSync } from 'fs';
import { join } from 'path';
import type { Post } from './blog';

const MDX_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.mdx$/;

let cached: Post[] | null = null;

export async function getPosts(): Promise<Post[]> {
  if (cached) return cached;

  const dir = join(process.cwd(), 'sections/blog');
  const files = readdirSync(dir)
    .filter(f => MDX_PATTERN.test(f))
    .toSorted()
    .toReversed();

  const modules = await Promise.all(
    files.map(file => {
      const [, date, slug] = file.match(MDX_PATTERN)!;
      return import(`@/sections/blog/${date}-${slug}.mdx`);
    })
  );

  const posts = modules
    .map(mod => mod.meta as Post | undefined)
    .filter((meta): meta is Post => Boolean(meta) && !meta!.draft);

  cached = posts;
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}
