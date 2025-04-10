import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';

const BlockZigZag = ({ position = [0, 0, 0] }) => {
  const zigzagRef = useRef();
  const [speed] = useState(()=> (Math.random() + 0.2) * (Math.random() < 0.5 ? -1: 1));
  const [offset] = useState(() => Math.random() * Math.PI * 5);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const amplitude = 1;   // Qué tan ancho es el zigzag (izquierda - derecha)
    const depth = 1.5;       // Qué tan rápido se mueve hacia adelante
    const frequency = 2;   // Qué tan rápido cambia la dirección del zigzag
  
    const x = Math.sin(time * frequency * speed + offset) * amplitude;
    const z = Math.sin((time + offset) * frequency * 0.5 * speed) * depth;
  
    if (zigzagRef.current) {
      zigzagRef.current.position.set(x, 0.85, z);
      // % 4 - 2 es para que vuelva al centro en bucle si querés mantenerlo en una zona chica
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
          scale={[2, 1.5, 0.3]}
          position={[0, 1, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockZigZag;