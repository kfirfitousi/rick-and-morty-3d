import { Canvas, type Props } from '@react-three/fiber';
import { useGalleryStore } from '@/stores/gallery-store';
import { Preload } from '@react-three/drei';
import { Gallery } from './gallery';

export function Scene(props: Omit<Props, 'children'>) {
  const select = useGalleryStore((state) => state.select);

  return (
    <Canvas
      {...props}
      onPointerMissed={() => select(null)}
      camera={{
        position: [0, 0, 10],
        fov: 30,
      }}
    >
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      <Gallery />
      <Preload all />
    </Canvas>
  );
}
