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
        <div className="min-h-screen bg-slate-50 flex">
          <Navigation />
          <main className="flex-1 lg:ml-[220px] pt-14 lg:pt-0 min-h-screen">
            <div className="px-6 py-8 lg:px-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
