import Link from 'next/link';
import type { Post } from '@/types/post';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white/55 backdrop-blur-xl rounded-lg border border-white/50 shadow-sm p-5 hover:shadow-lg hover:bg-white/70 transition-all cursor-pointer">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="font-heading text-base font-semibold text-slate-800 mb-2">{post.title}</h2>
        <p className="font-body text-sm text-slate-600 line-clamp-2 mb-3">{post.summary}</p>
        <span className="font-body text-xs text-slate-400">{formattedDate}</span>
      </div>
    </Link>
  );
}
