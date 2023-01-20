import { useGalleryStore } from '@/stores/gallery-store'

export default function Filter() {
  const filter = useGalleryStore((state) => state.filter)
  const setFilter = useGalleryStore((state) => state.setFilter)

  return (
    <div className='flex flex-row space-x-2'>
      <input
        className='h-10 max-w-sm p-2 text-lg border border-zinc-400 bg-zinc-700 text-zinc-300 rounded-md'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder='Filter Characters'
      />
      {filter && (
        <button className='absolute h-10 p-2 right-9 text-zinc-300' onClick={() => setFilter('')}>
          ✕
        </button>
      )}
    </div>
  )
}
