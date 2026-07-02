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
      <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs font-medium bg-gray-100 text-[#424242] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="font-heading text-base font-semibold text-black mb-2">{post.title}</h2>
        <p className="font-body text-sm text-[#424242] line-clamp-2 mb-3">{post.summary}</p>
        <span className="font-body text-xs text-gray-400">{formattedDate}</span>
      </div>
    </Link>
  );
}
