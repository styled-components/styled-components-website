export type Post = {
  title: string;
  slug: string;
  author: string;
  date: string;
  description: string;
  originalUrl?: string;
};

export type LatestPost = Pick<Post, 'title' | 'slug'> | null;

export function groupPostsByYear(posts: Post[]): {
  postsByYear: Record<string, Post[]>;
  years: string[];
} {
  const postsByYear: Record<string, Post[]> = {};
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  }
  return {
    postsByYear,
    years: Object.keys(postsByYear).toSorted((a, b) => Number(b) - Number(a)),
  };
}
