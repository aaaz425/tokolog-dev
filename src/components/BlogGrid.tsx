'use client';

import { useState } from 'react';
import { BlogCard } from '@/components/BlogCard';
import type { Post } from '@/types/post';

interface BlogGridProps {
  posts: Post[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const visible = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              activeTag === null
                ? 'bg-black text-white'
                : 'bg-gray-100 text-[#424242] hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                activeTag === tag
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-[#424242] hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="font-body text-sm text-gray-400 py-16 text-center">
          해당 태그의 글이 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
