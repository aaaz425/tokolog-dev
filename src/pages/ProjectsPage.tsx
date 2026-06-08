import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ProjectCard } from '../components/ProjectCard';
import { useProjectStore } from '../store/projectStore';

export function ProjectsPage() {
  const { projects, loading, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-black">Projects</h1>
          <p className="font-body text-sm text-[#424242] mt-1">사내·개인 프로젝트 목록</p>
        </div>
        <button className="flex items-center gap-1.5 bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#424242] transition-colors">
          <Plus size={16} strokeWidth={2} />
          새 프로젝트
        </button>
      </div>
      {loading ? (
        <p className="font-body text-sm text-gray-400">불러오는 중...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Layout>
  );
}
