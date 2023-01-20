import { type GroupProps } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface CharacterInfoProps extends GroupProps {
  status: string;
  species: string;
  originName: string;
}

export function CharacterInfo({
  status,
  species,
  originName,
  ...props
}: CharacterInfoProps) {
  return (
    <group {...props}>
      <Text color="#D4D4D8" font="/Inter.ttf" fontSize={0.08}>
        Status: {status}
      </Text>
      <Text
        color="#D4D4D8"
        font="/Inter.ttf"
        fontSize={0.08}
        position={[0, -0.1, 0]}
      >
        Species: {species}
      </Text>
      <Text
        color="#D4D4D8"
        font="/Inter.ttf"
        fontSize={0.08}
        position={[0, -0.2, 0]}
      >
        Origin: {originName}
      </Text>
    </group>
  );
}
