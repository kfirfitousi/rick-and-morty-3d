import { type MeshProps } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';

interface LoadMoreProps extends MeshProps {
  count: number;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export function LoadMore({
  count,
  hasNextPage,
  fetchNextPage,
  ...props
}: LoadMoreProps) {
  const scroll = useScroll();

  return (
    <mesh
      {...props}
      onClick={() => {
        if (hasNextPage) fetchNextPage();
        scroll.el.scrollLeft = 0; // reset scroll position, couldn't find a better way
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#a1a1aa" />
      <Text
        color="#27272a"
        font="/Inter.ttf"
        fontSize={0.15}
        position={[0, 0, 0.5]}
      >
        Load More
      </Text>
    </mesh>
  );
}
