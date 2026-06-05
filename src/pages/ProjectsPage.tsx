import { Layout } from '../components/Layout';
import { ProjectCard } from '../components/ProjectCard';
import { mockProjects } from '../data/projects';

export function ProjectsPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-black">Projects</h1>
        <p className="font-body text-sm text-[#424242] mt-1">사내·개인 프로젝트 목록</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Layout>
  );
}
