import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type GalleryStore = {
  selected: number | null
  filter: string
  setSelected: (selected: number) => void
  setFilter: (filter: string) => void
}

export const useGalleryStore = create<GalleryStore>()(
  devtools((set) => ({
    selected: null,
    filter: '',
    setSelected: (selected) => set({ selected }),
    setFilter: (filter) => set({ filter }),
  })),
)
