import posts from '@/sections/blog/posts.json';

export type Post = (typeof posts)[number];

// Group posts by year (shared between BlogListPage and BlogSidebarMenu)
export const postsByYear: Record<string, Post[]> = {};
for (const post of posts) {
  const year = post.date.slice(0, 4);
  if (!postsByYear[year]) postsByYear[year] = [];
  postsByYear[year].push(post);
}
export const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

// Slug-keyed lookup for O(1) access
export const postBySlug = new Map<string, Post>(posts.map(p => [p.slug, p]));
