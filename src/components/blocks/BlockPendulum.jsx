import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { boxGeometry } from "../../geometries/geometries";
import { materialMap } from "../../materials/materials";

const BlockPendulum = ({ position }) => {
  const pendulumRef = useRef();
  const [rotation] = useState(new THREE.Quaternion());
  const [speed] = useState(() => Math.random() * 1.5 + 0.5); // Oscilación suave
  const [amplitude] = useState(() => Math.PI / 4); // 45 grados máx. de oscilación

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = Math.sin(time * speed) * amplitude;

    rotation.setFromEuler(new THREE.Euler(0, 0,angle)); // Oscila en eje Z

    if (pendulumRef.current) {
      pendulumRef.current.setRotationFromQuaternion(rotation);
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

      {/* Péndulo oscilante */}
      <RigidBody
        type="kinematicPosition"
        position={[0, 1, 0]} // Altura del pivote
        friction={0}
        restitution={0.2}
      >
        <mesh
          ref={pendulumRef}
          geometry={boxGeometry}
          material={materialMap.obstacle}
          scale={[0.3, 2, 0.3]} // Brazo largo vertical
          position={[0, 0, 0]} // El cuerpo del péndulo cuelga del pivote
          castShadow
          receiveShadow
        />
         
      </RigidBody>
    </group>
  );
};

export default BlockPendulum;