import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Navigation } from '@/components/layout/Navigation';
import './globals.css';

const pretendard = localFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: {
    default: 'tokolog',
    template: '%s | tokolog',
  },
  description: '프론트엔드 개발자 박유진의 포트폴리오 & 블로그',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-body antialiased">
        <div className="relative min-h-screen bg-slate-50 flex overflow-x-hidden">
          <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100" />
            <div className="absolute top-[-120px] left-[280px] w-[520px] h-[520px] rounded-full bg-accent-300/55 blur-[100px]" />
            <div className="absolute top-[220px] right-[80px] w-[560px] h-[560px] rounded-full bg-accent-200/50 blur-[110px]" />
            <div className="absolute bottom-[-140px] left-[420px] w-[460px] h-[460px] rounded-full bg-slate-300/45 blur-[100px]" />
          </div>
          <Navigation />
          <main className="relative z-10 flex-1 lg:ml-[220px] pt-14 lg:pt-0 min-h-screen">
            <div className="px-6 py-8 lg:px-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
