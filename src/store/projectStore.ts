import { create } from 'zustand';
import type { Project } from '../types/project';

const STORAGE_KEY = 'tokolog_projects';

function loadFromStorage(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: loadFromStorage(),

  addProject: (project) =>
    set((state) => {
      const next = [...state.projects, project];
      saveToStorage(next);
      return { projects: next };
    }),

  updateProject: (id, updates) =>
    set((state) => {
      const next = state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveToStorage(next);
      return { projects: next };
    }),

  deleteProject: (id) =>
    set((state) => {
      const next = state.projects.filter((p) => p.id !== id);
      saveToStorage(next);
      return { projects: next };
    }),
}));
