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

  const posts: Post[] = [];
  for (const file of files) {
    const match = file.match(MDX_PATTERN);
    if (!match) continue;
    const [, date, slug] = match;
    const mod = await import(`@/sections/blog/${date}-${slug}.mdx`);
    if (mod.meta && !mod.meta.draft) posts.push(mod.meta as Post);
  }

  cached = posts;
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}
