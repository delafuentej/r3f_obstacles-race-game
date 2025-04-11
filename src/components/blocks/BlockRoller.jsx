import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { boxGeometry } from "../../geometries/geometries";
import { materialMap } from "../../materials/materials";

const BlockRoller = ({ position }) => {
  const rollerRef = useRef();
  const [rotation] = useState(new THREE.Quaternion());
  const [speed] = useState(() => (Math.random() * 1 + 0.5) * (Math.random() < 0.5 ? -1 : 1));
 
  useFrame((state) => {
    const  time = state.clock.getElapsedTime();
    rotation.setFromEuler(new THREE.Euler(0, 0, time * speed)); // 🛠 Gira en eje X
      
    if (rollerRef.current) {
      rollerRef.current.setRotationFromQuaternion(rotation);
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

      {/* Rodillo horizontal girando */}
      <RigidBody
        type="kinematicPosition"
        position={[0, 1.3, 0]} // Mediana altura
        restitution={0.2}
        friction={1}
      >
        <mesh
          ref={rollerRef}
          geometry={new THREE.CylinderGeometry(0.2, 0.2, 2.5, 32)}
          material={materialMap.obstacle}
          rotation={[0,  Math.PI / 2,0]} // Acostado horizontalmente
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockRoller;