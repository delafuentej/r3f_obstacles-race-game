import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';

const BlockConveyor = ({ position = [0, 0, 0] }) => {
  const conveyorRef = useRef();
  const [speed] = useState(() => (Math.random() * 0.5 + 0.5)); // velocidad constante

  useFrame((state, delta) => {
    if (!conveyorRef.current) return;

    // Simulamos desplazamiento infinito con desplazamiento de UVs
    const material = conveyorRef.current.material;
    if (material.map) {
      material.map.offset.x -= delta * speed;
    }
  });

  return (
    <group position={position}>
      {/* Piso */}
      <mesh
        geometry={boxGeometry}
        material={materialMap.floor2}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      {/* Cinta transportadora */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          ref={conveyorRef}
          geometry={boxGeometry}
          material={materialMap.conveyor || materialMap.obstacle}
          scale={[4, 0.2, 1]}
          position={[0, 0.2, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockConveyor;