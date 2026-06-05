import { create } from 'zustand';
import type { Project } from '../types/project';

const API = 'http://localhost:3001/projects';

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  addProject: (data: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    const res = await fetch(API);
    const projects: Project[] = await res.json();
    set({ projects, loading: false });
  },

  addProject: async (data) => {
    const project: Project = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    const created: Project = await res.json();
    set((state) => ({ projects: [...state.projects, created] }));
  },

  updateProject: async (id, updates) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const updated: Project = await res.json();
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? updated : p)),
    }));
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('삭제 실패');
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    }));
  },
}));
