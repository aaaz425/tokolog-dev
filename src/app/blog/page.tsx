import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { BlogGrid } from '@/components/BlogGrid';

export const metadata: Metadata = { title: 'Blog' };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-slate-800">Blog</h1>
        <p className="font-body text-sm text-slate-600 mt-1">개발 경험과 배운 것들을 기록합니다.</p>
      </div>
      <BlogGrid posts={posts} />
    </div>
  );
}
