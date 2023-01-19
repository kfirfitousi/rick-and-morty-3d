import { Scroll, ScrollControls, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ResponseSchema } from '@/hooks/useCharacters'
import { useGalleryStore } from '@/stores/gallery-store'
import { useMemo } from 'react'
import Cube from '@/components/canvas/Cube'

export default function Gallery() {
  const { viewport } = useThree()

  const xW = 2 // Cube width + margin

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['characters'],
    async ({ pageParam = 1 }) => {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageParam}`)
      return ResponseSchema.parse(await res.json())
    },
    {
      getPreviousPageParam: (firstPage) => parseInt(firstPage.info.prev?.slice(-1)),
      getNextPageParam: (lastPage) => parseInt(lastPage.info.next?.slice(-1)),
    },
  )

  const charactersFilter = useGalleryStore((state) => state.filter)

  const filteredCharacters = useMemo(
    () =>
      data?.pages
        .flatMap((page) => page.results)
        .filter((character) => character.name.toLowerCase().includes(charactersFilter.toLowerCase())),
    [data, charactersFilter],
  )

  return (
    <ScrollControls horizontal damping={5} pages={(viewport.width + filteredCharacters?.length * xW) / viewport.width}>
      <Scroll>
        {filteredCharacters?.map((character, i) => (
          <Cube
            key={i}
            index={i}
            total={filteredCharacters?.length}
            character={character}
            position={[i * xW, 0, 0]}
            rotation={[0.1, 0, 0]}
            scale={[1, 1, 1]}
          />
        ))}
        <mesh position={[filteredCharacters?.length * xW, 0, 0]} onClick={() => fetchNextPage()}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color='white' />
          <Text color='black' fontSize={0.15}>
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
          </Text>
        </mesh>
      </Scroll>
    </ScrollControls>
  )
}
