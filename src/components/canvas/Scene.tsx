import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useGalleryStore } from '@/stores/gallery-store'

export default function Scene({ children, ...props }) {
  const setSelected = useGalleryStore((state) => state.setSelected)

  return (
    <Canvas
      {...props}
      onPointerMissed={() => setSelected(null)}
      camera={{
        position: [0, 0, 10],
        fov: 30,
      }}>
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      {children}
      <Preload all />
    </Canvas>
  )
}
