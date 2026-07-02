'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* PC 사이드바 */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[220px] min-h-screen bg-slate-900/85 backdrop-blur-xl border-r border-white/10 flex-col px-4 py-5 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-7 h-7 rounded-md bg-accent-500 flex items-center justify-center text-white text-xs font-bold font-heading">
            T
          </div>
          <span className="font-heading text-white text-base font-bold">tokolog</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 모바일 탑 네브 */}
      <header className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 h-14 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-20">
        <Link href="/" className="font-heading text-base font-bold text-slate-800 cursor-pointer">
          tokolog
        </Link>
        <nav className="flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-sm font-medium transition-colors cursor-pointer ${
                pathname.startsWith(item.href)
                  ? 'text-slate-800'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
