import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { boxGeometry } from "../../geometries/geometries";
import { materialMap } from "../../materials/materials";

const BlockSpinner = ({ position }) => {
  const obstacleRef = useRef(); // Usamos un ref para el mesh
  const [rotation] = useState(new THREE.Quaternion()); // Guardamos la rotación
  const [speed] = useState(()=> (Math.random() + 0.2) * (Math.random() < 0.5 ? -1: 1));
  

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const newRotation = rotation;
    newRotation.setFromEuler(new THREE.Euler(0, time * speed, 0)); // Calculamos la rotación

    if (obstacleRef.current) {
      obstacleRef.current.setRotationFromQuaternion(newRotation); // Aplicamos la rotación al mesh
    }
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={materialMap.floor2}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      {/* Obstacle Spinner */}
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          ref={obstacleRef} 
          geometry={boxGeometry}
          material={materialMap.obstacle}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockSpinner;