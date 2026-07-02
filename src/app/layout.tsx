import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    <html lang="ko" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <div className="min-h-screen bg-neutral-100 flex">
          <Navigation />
          <main className="flex-1 lg:ml-[220px] pt-14 lg:pt-0 min-h-screen">
            <div className="px-6 py-8 lg:px-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
