import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { parser, RuleType, type MarkdownToJSX } from 'markdown-to-jsx';
import { getPostBySlug, getPosts } from '@/utils/blog.server';
import { readOgFont } from '@/utils/readOgFont';

export const alt = 'styled-components blog';
const SCALE = 1.5;
export const size = { width: 1200 * SCALE, height: 630 * SCALE };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

const BG = '#f8f8f8';
const TEXT = '#1a1a1a';
const MUTED = '#6b7280';
const ACCENT = '#7c5cff';

const FACES: [string, string][] = [
  ['12.7962,10.3482 42.8954,25.0286 32.4747,58.5778 2.3755,43.8975', '#ffc000'],
  ['61.6245,20.1025 51.2038,53.6518 32.4747,58.5778 42.8954,25.0286', '#00ff55'],
  ['31.5253,5.4222 61.6245,20.1025 42.8954,25.0286 12.7962,10.3482', '#5a8aff'],
  ['21.1046,38.9714 2.3755,43.8975 32.4747,58.5778 51.2038,53.6518', '#ff50e0'],
  ['31.5253,5.4222 12.7962,10.3482 2.3755,43.8975 21.1046,38.9714', '#ff2030'],
  ['31.5253,5.4222 21.1046,38.9714 51.2038,53.6518 61.6245,20.1025', '#00cce8'],
];

function buildCube(): string {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
    ...FACES.map(([pts, color]) => `<polygon points="${pts}" fill="${color}" opacity="0.85"/>`),
    '</svg>',
  ].join('');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// Adapt title size so long titles still fit on three lines.
function titleFontSize(title: string): number {
  if (title.length > 60) return 56;
  if (title.length > 40) return 68;
  return 84;
}

// Walk a markdown-to-jsx AST and concatenate every prose text node.
// Code blocks, code inline, images, and frontmatter are excluded.
function extractProseText(node: MarkdownToJSX.ASTNode | MarkdownToJSX.ASTNode[] | undefined): string {
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractProseText).join(' ');
  switch (node.type) {
    case RuleType.text:
      return node.text;
    case RuleType.textFormatted:
      return extractProseText(node.children);
    case RuleType.heading:
    case RuleType.paragraph:
    case RuleType.blockQuote:
    case RuleType.link:
      return extractProseText(node.children);
    case RuleType.orderedList:
    case RuleType.unorderedList:
      return node.items.map(item => extractProseText(item)).join(' ');
    case RuleType.table:
      return [...node.header, ...node.cells.flat()].map(c => extractProseText(c)).join(' ');
    default:
      return '';
  }
}

// Estimate read time at 230 wpm (typical technical-prose pace).
async function estimateReadTimeMinutes(post: { date: string; slug: string }): Promise<number> {
  try {
    const path = join(process.cwd(), 'sections', 'blog', `${post.date}-${post.slug}.mdx`);
    const raw = await readFile(path, 'utf8');
    // Drop the JS `export const meta = {...}` block before parsing, since
    // markdown-to-jsx treats it as inline HTML/text.
    const md = raw.replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\};?/m, '').replace(/^import\s+[^;]+;\s*$/gm, '');
    const ast = parser(md);
    const words = extractProseText(ast).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 230));
  } catch {
    return 0;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [figtreeBold, inter400, inter600, readMinutes] = await Promise.all([
    readOgFont('figtreeBold'),
    readOgFont('interLatin400'),
    readOgFont('interLatin600'),
    estimateReadTimeMinutes(post),
  ]);
  const twitter = post.authorTwitter;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: BG,
        padding: `${56 * SCALE}px ${64 * SCALE}px`,
        fontFamily: 'Inter',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 * SCALE, color: MUTED, fontSize: 22 * SCALE }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={buildCube()} width={44 * SCALE} height={44 * SCALE} alt="" />
        <span style={{ color: TEXT, fontWeight: 600 }}>styled-components</span>
        <span>·</span>
        <span>blog</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          gap: 28 * SCALE,
        }}
      >
        <div
          style={{
            display: 'flex',
            color: TEXT,
            fontSize: titleFontSize(post.title) * SCALE,
            fontFamily: 'Figtree',
            fontWeight: 700,
            letterSpacing: -1.5 * SCALE,
            lineHeight: 1.05,
          }}
        >
          {post.title}
        </div>

        {post.description ? (
          <div
            style={{
              display: 'flex',
              color: MUTED,
              fontSize: 26 * SCALE,
              lineHeight: 1.4,
              maxHeight: 88 * SCALE,
              overflow: 'hidden',
            }}
          >
            {post.description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16 * SCALE,
          fontSize: 22 * SCALE,
          color: TEXT,
        }}
      >
        <span style={{ fontWeight: 600 }}>{post.author}</span>
        {twitter ? <span style={{ color: ACCENT, fontWeight: 600 }}>@{twitter}</span> : null}
        <span style={{ color: MUTED }}>·</span>
        <span style={{ color: MUTED }}>{formatDate(post.date)}</span>
        {readMinutes > 0 ? (
          <>
            <span style={{ color: MUTED }}>·</span>
            <span style={{ color: MUTED }}>{readMinutes} min read</span>
          </>
        ) : null}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Figtree', data: figtreeBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter600, weight: 600, style: 'normal' },
      ],
    }
  );
}
