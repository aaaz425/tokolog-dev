'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="max-w-2xl pt-10"
    >
      <p className="font-body text-sm text-[#424242] mb-3">안녕하세요 👋</p>
      <h1 className="font-heading text-4xl font-bold text-black leading-tight mb-4">
        저는 프론트엔드
        <br />
        개발자입니다.
      </h1>
      <p className="font-body text-base text-[#424242] leading-relaxed mb-8">
        개인 프로젝트 데모와 기술 블로그를 이곳에서 공유합니다.
        <br />
        새로운 것을 배우고 만드는 걸 좋아합니다.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/projects"
          className="flex items-center gap-1.5 font-body text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-[#424242] transition-colors"
        >
          프로젝트 보기 <ArrowRight size={16} strokeWidth={2} />
        </Link>
        <Link
          href="/blog"
          className="flex items-center gap-1.5 font-body text-sm font-medium border border-black text-black px-5 py-2.5 rounded-full hover:bg-neutral-100 transition-colors"
        >
          블로그 보기
        </Link>
      </div>
    </motion.div>
  );
}
