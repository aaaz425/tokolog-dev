'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/BlogCard';
import { GRID_CONTAINER_VARIANTS, PILL_TRANSITION } from '@/lib/motion';
import { useMotionSafe } from '@/hooks/useMotionSafe';
import type { Post } from '@/types/post';

interface BlogGridProps {
  posts: Post[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const motionSafe = useMotionSafe();

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const visible = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setActiveTag(null)}
            className={`relative font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTag === null ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {activeTag === null &&
              (motionSafe ? (
                <motion.div
                  layoutId="blog-filter-pill"
                  className="absolute inset-0 bg-accent-600 rounded-full"
                  transition={PILL_TRANSITION}
                />
              ) : (
                <div className="absolute inset-0 bg-accent-600 rounded-full" />
              ))}
            <span className="relative z-10">전체</span>
          </button>
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`relative font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isActive &&
                  (motionSafe ? (
                    <motion.div
                      layoutId="blog-filter-pill"
                      className="absolute inset-0 bg-accent-600 rounded-full"
                      transition={PILL_TRANSITION}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-accent-600 rounded-full" />
                  ))}
                <span className="relative z-10">{tag}</span>
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="font-body text-sm text-slate-400 py-16 text-center">
          해당 태그의 글이 없습니다.
        </p>
      ) : (
        <motion.div
          variants={motionSafe ? GRID_CONTAINER_VARIANTS : undefined}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
