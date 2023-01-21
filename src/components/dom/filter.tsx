import { useGalleryStore } from '@/stores/gallery-store';

export function Filter() {
  const query = useGalleryStore((state) => state.query);
  const setQuery = useGalleryStore((state) => state.setQuery);

  return (
    <div className="flex flex-row space-x-2">
      <input
        className="h-10 max-w-sm rounded-md border border-zinc-400 bg-zinc-700 p-2 text-lg text-zinc-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter Characters"
      />
      {query && (
        <button
          className="absolute right-9 h-10 p-2 text-zinc-300"
          onClick={() => setQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
