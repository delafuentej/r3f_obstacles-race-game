import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';

const BlockSmasher = ({ position = [0, 0, 0] }) => {
  const smasherRef = useRef();
  const [speed] = useState(() => Math.random() * 1 + 1); // Velocidad de bajada/subida
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!smasherRef.current) return;

    const time = state.clock.getElapsedTime();
    const y = Math.abs(Math.sin(time * speed + offset)) * 1.2 + 0.4; // Movimiento vertical

    smasherRef.current.position.y = y; // Solo movemos el mesh
  });

  return (
    <group position={position}>
      {/* Piso */}
      <mesh
        geometry={boxGeometry}
        material={materialMap.floor1}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      {/* Martillo / Smasher */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          ref={smasherRef}
          geometry={boxGeometry}
          material={materialMap.obstacle}
          scale={[2, 0.5, 2]}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockSmasher;