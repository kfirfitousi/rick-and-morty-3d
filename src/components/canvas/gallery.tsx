import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { useGalleryStore } from '@/stores/gallery-store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ResponseSchema } from '@/types';
import { Text, Scroll, ScrollControls } from '@react-three/drei';
import { LoadMore } from '@/components/canvas/load-more';
import { Cube } from '@/components/canvas/cube';

export function Gallery() {
  const { viewport } = useThree();

  const xW = 2; // Cube width + margin

  const { data, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['characters'],
    async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pageParam}`,
      );
      const data = await res.json();
      return ResponseSchema.parse(data);
    },
    {
      getPreviousPageParam: (firstPage) =>
        parseInt(firstPage.info.prev?.slice(-1)),
      getNextPageParam: (lastPage) => parseInt(lastPage.info.next?.slice(-1)),
    },
  );

  const query = useGalleryStore((state) => state.query);

  const filteredCharacters = useMemo(
    () =>
      data?.pages
        .flatMap((page) => page.results)
        .filter((character) =>
          character.name.toLowerCase().includes(query.toLowerCase()),
        ),
    [data, query],
  );

  if (isError) {
    return (
      <Text
        color="#f43f5e"
        fontSize={0.2}
        position={[0, 0, 0]}
        font="/Inter.ttf"
      >
        Error occurred while fetching data
      </Text>
    );
  }

  return (
    <ScrollControls
      horizontal
      damping={20}
      pages={
        (viewport.width + filteredCharacters?.length * xW) / viewport.width
      }
    >
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
        {!query && (
          <LoadMore
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            position={[filteredCharacters?.length * xW, 0, 0]}
            count={filteredCharacters?.length}
          />
        )}
      </Scroll>
    </ScrollControls>
  );
}
