import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostContent } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title ?? 'Blog' };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let frontmatter, content;
  try {
    ({ frontmatter, content } = getPostContent(slug));
  } catch {
    notFound();
  }

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-body text-sm text-[#424242] hover:text-black transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Blog로 돌아가기
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {frontmatter.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-body text-xs font-medium bg-gray-100 text-[#424242] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-3xl font-bold text-black mb-2">{frontmatter.title}</h1>
          <time className="font-body text-xs text-gray-400">{formattedDate}</time>
        </header>

        <div className="prose prose-sm max-w-none font-body text-[#424242]">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
