import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';

const postsDir = path.join(process.cwd(), 'src/content/posts');

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data } = matter(raw);
      return { slug, ...(data as Omit<Post, 'slug'>) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostContent(slug: string): { frontmatter: Post; content: string } {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: { slug, ...(data as Omit<Post, 'slug'>) }, content };
}
