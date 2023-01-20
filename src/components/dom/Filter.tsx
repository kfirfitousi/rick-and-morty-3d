import { useGalleryStore } from '@/stores/gallery-store';

export function Filter() {
  const query = useGalleryStore((state) => state.query);
  const setQuery = useGalleryStore((state) => state.setQuery);

  return (
    <div className="flex flex-row space-x-2">
      <input
        className="h-10 max-w-sm p-2 text-lg border border-zinc-400 bg-zinc-700 text-zinc-300 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter Characters"
      />
      {query && (
        <button
          className="absolute h-10 p-2 right-9 text-zinc-300"
          onClick={() => setQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}
