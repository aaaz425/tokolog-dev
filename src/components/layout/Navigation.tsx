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
      <aside className="hidden lg:flex fixed left-0 top-0 w-[220px] min-h-screen bg-black flex-col px-4 py-5 z-20">
        <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-black text-xs font-bold font-heading">
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
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 모바일 탑 네브 */}
      <header className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 z-20">
        <Link href="/" className="font-heading text-base font-bold text-black">
          tokolog
        </Link>
        <nav className="flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-sm font-medium transition-colors ${
                pathname.startsWith(item.href) ? 'text-black' : 'text-[#424242] hover:text-black'
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
