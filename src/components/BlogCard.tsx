import Link from 'next/link';
import { MotionCardSurface } from '@/components/motion/MotionCardSurface';
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
      <MotionCardSurface className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
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
      </MotionCardSurface>
    </Link>
  );
}
