import { type Character } from '@/hooks/useCharacters'
import { type Mesh } from 'three'
import { useRef } from 'react'
import { useFrame, type MeshProps } from '@react-three/fiber'
import { useTexture, Text, useScroll } from '@react-three/drei'
import { useGalleryStore } from '@/stores/gallery-store'
import { damp } from 'three/src/math/MathUtils'

interface CubeProps extends MeshProps {
  index: number
  total: number
  character: Character
}

export default function Cube({ index, total, character, ...props }: CubeProps) {
  const cubeRef = useRef<Mesh>(null!)
  const nameRef = useRef(null!)
  const texture = useTexture(character.image)
  const scroll = useScroll()
  const selected = useGalleryStore((state) => state.selected)
  const setSelected = useGalleryStore((state) => state.setSelected)

  const isSelected = index === selected
  const { position } = props

  useFrame((_, delta) => {
    const cube = cubeRef.current
    const name = nameRef.current

    const y = scroll.curve(index / total - total / total ** 2, 2 / total)
    cube.position.z = damp(cube.position.z, isSelected ? 6 : 4 * y, 5, delta)

    if (selected !== null && index < selected) {
      cube.position.x = damp(cube.position.x, position[0] - 0.5, 5, delta)
    }
    if (selected !== null && index > selected) {
      cube.position.x = damp(cube.position.x, position[0] + 0.5, 5, delta)
    }
    if (selected === null || isSelected) {
      cube.position.x = damp(cube.position.x, position[0], 6, delta)
      name.position.y = damp(name.position.y, isSelected ? 0.62 : 0.7, 5, delta)
    }
  })

  return (
    <mesh ref={cubeRef} onClick={() => setSelected(selected === index ? null : index)} {...props}>
      <Text ref={nameRef} color='white' fontSize={0.15} position={[0, 0.7, 0]}>
        {character.name}
      </Text>
      {selected === index && (
        <group position={[0, -0.7, 0]}>
          <Text color='white' fontSize={0.08}>
            Status: {character.status}
          </Text>
          <Text color='white' fontSize={0.08} position={[0, -0.1, 0]}>
            Species: {character.species}
          </Text>
          <Text color='white' fontSize={0.08} position={[0, -0.2, 0]}>
            Origin: {character.origin.name}
          </Text>
        </group>
      )}
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
