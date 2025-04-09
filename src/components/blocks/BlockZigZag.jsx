import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';

const BlockZigZag = ({ position = [0, 0, 0] }) => {
  const zigzagRef = useRef();
  const [speed] = useState(() => (Math.random() + 0.5) * 1.2);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time * speed + offset) * 1.5;
    const z = Math.cos(time * speed + offset) * 1.5;

    if (zigzagRef.current) {
      zigzagRef.current.position.set(x, 0.85, z); // movemos solo el mesh
    }
  });

  return (
    <group position={position}>
      {/* Piso */}
      <mesh
        geometry={boxGeometry}
        material={materialMap.floor2}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      {/* Obstáculo ZigZag */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          ref={zigzagRef}
          geometry={boxGeometry}
          material={materialMap.obstacle}
          scale={[1.5, 1.5, 0.3]}
          position={[0, 1, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockZigZag;