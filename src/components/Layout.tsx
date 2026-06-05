import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  onAddProject?: () => void;
}

export function Layout({ children, onAddProject }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-lg font-bold text-indigo-600 tracking-tight"
          >
            MyStack
          </button>
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + 새 프로젝트
            </button>
          )}
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
