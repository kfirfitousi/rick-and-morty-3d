import { useRef } from 'react';
import { useFrame, type MeshProps } from '@react-three/fiber';
import { useTexture, Text, useScroll } from '@react-three/drei';
import { useGalleryStore } from '@/stores/gallery-store';
import { type Character } from '@/types';
import { CharacterInfo } from '@/components/canvas/character-info';
import { damp } from 'three/src/math/MathUtils';

interface CubeProps extends MeshProps {
  index: number;
  total: number;
  character: Character;
}

export function Cube({ index, total, character, ...props }: CubeProps) {
  const cubeRef = useRef(null!);
  const nameRef = useRef(null!);
  const infoRef = useRef(null!);
  const scroll = useScroll();
  const texture = useTexture(character.image);
  const select = useGalleryStore((state) => state.select);
  const selected = useGalleryStore((state) => state.selected);

  const isSelected = index === selected;
  const { position } = props;

  useFrame((_, delta) => {
    const cube = cubeRef.current;
    const name = nameRef.current;
    const desc = infoRef.current;

    const y = scroll.curve(index / total - total / total ** 2, 2 / total);

    // when a cube is selected, make it bigger
    cube.position.z = damp(cube.position.z, isSelected ? 5 : 4 * y, 5, delta);

    // rotate the selected cube
    if (isSelected) {
      cube.rotation.y += 0.003;
      name.rotation.y -= 0.003;
      desc.rotation.y -= 0.003;
    } else {
      cube.rotation.y = damp(cube.rotation.y, 0, 5, delta);
      name.rotation.y = damp(name.rotation.y, 0, 5, delta);
      desc.rotation.y = damp(desc.rotation.y, 0, 5, delta);
    }

    // when a cube is selected, make room for it by pushing the neighboring cubes away
    if (selected !== null && index < selected) {
      cube.position.x = damp(cube.position.x, position[0] - 0.5, 5, delta);
    }
    if (selected !== null && index > selected) {
      cube.position.x = damp(cube.position.x, position[0] + 0.5, 5, delta);
    }

    // if no cube is selected, or the current cube is selected, move it to its original position
    if (selected === null || isSelected) {
      cube.position.x = damp(cube.position.x, position[0], 5, delta);
      name.position.y = damp(name.position.y, 0.67, 5, delta);
    }

    // if selected and out of bounds, deselect
    if (
      isSelected &&
      (scroll.offset > index / total + 1.35 / total ||
        scroll.offset < index / total - 1.35 / total)
    ) {
      select(null);
    }
  });

  const onClick = () => {
    if (selected === index) {
      return select(null);
    }
    select(index);
    scroll.el.scrollLeft =
      ((scroll.el.scrollWidth - scroll.el.clientWidth) / total) * index;
  };

  return (
    <mesh ref={cubeRef} onClick={onClick} {...props}>
      <Text
        ref={nameRef}
        color="#D4D4D8"
        font="/Inter.ttf"
        fontSize={0.12}
        position={[0, 0.67, 0]}
      >
        {character.name}
      </Text>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={texture} />
      <group position={[0, -0.75, 0]} ref={infoRef}>
        {selected === index && (
          <CharacterInfo
            status={character.status}
            species={character.species}
            originName={character.origin.name}
          />
        )}
      </group>
    </mesh>
  );
}
