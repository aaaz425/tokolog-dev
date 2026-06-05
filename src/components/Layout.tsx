import { useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  onAddProject?: () => void;
}

const NAV_ITEMS = [
  { label: 'Projects', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Tech Stack', path: '/techstack' },
];

export function Layout({ children, onAddProject }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* PC 사이드바 */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-[220px] min-h-screen bg-black flex-col px-4 py-5 z-20">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-black text-xs font-bold font-heading">
            M
          </div>
          <span className="font-heading text-white text-base font-bold">tokolog</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-body text-sm font-medium text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 모바일 탑 네브 */}
      <header className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 z-20">
        <span className="font-heading text-base font-bold text-black">tokolog</span>
        <div className="flex items-center gap-4">
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="font-body text-sm font-medium bg-black text-white px-4 py-1.5 rounded-full hover:bg-[#424242] transition-colors cursor-pointer"
            >
              + New Project
            </button>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 lg:ml-[220px] pt-14 lg:pt-0 min-h-screen">
        <div className="px-6 py-8 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}
