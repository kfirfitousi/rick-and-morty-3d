import { useGalleryStore } from '@/stores/gallery-store'

export default function Filter() {
  const filter = useGalleryStore((state) => state.filter)
  const setFilter = useGalleryStore((state) => state.setFilter)

  return (
    <input
      className='h-10 max-w-sm p-2 text-lg border border-gray-300 rounded-md'
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder='Filter'
    />
  )
}
