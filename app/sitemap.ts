import { MetadataRoute } from 'next';
import { BASE_URL } from './url';
import docsJson from './docs.json';
import posts from '@/sections/blog/posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/docs`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/releases`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/ecosystem`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/showcase`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const docsPages: MetadataRoute.Sitemap = docsJson.pages.map(page => ({
    url: `${BASE_URL}/docs/${page.pathname}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticPages, ...docsPages, ...blogPosts];
}
