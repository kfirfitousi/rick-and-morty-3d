import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type GalleryStore = {
  selected: number | null;
  query: string;
  setSelected: (selected: number) => void;
  setQuery: (query: string) => void;
};

export const useGalleryStore = create<GalleryStore>()(
  devtools((set) => ({
    selected: null,
    query: '',
    setSelected: (selected) => set({ selected }),
    setQuery: (query) => set({ query }),
  })),
);
