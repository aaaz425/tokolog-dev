import { create } from 'zustand';

interface OriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ActiveProjectCardStore {
  originRect: OriginRect | null;
  setOriginRect: (rect: OriginRect) => void;
}

export const useActiveProjectCard = create<ActiveProjectCardStore>((set) => ({
  originRect: null,
  setOriginRect: (rect) => set({ originRect: rect }),
}));
