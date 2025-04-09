import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { boxGeometry } from "../../geometries/geometries";
import { materialMap } from "../../materials/materials";

const BlockMaze = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();
  const [rotation] = useState(new THREE.Quaternion());
  const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));

    if (groupRef.current) {
      groupRef.current.setRotationFromQuaternion(rotation);
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

      <RigidBody type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <group ref={groupRef}>
          {/* Paredes internas del laberinto */}
          <mesh geometry={boxGeometry} material={materialMap.obstacle} position={[0, 0, 1]} scale={[3, 0.3, 0.2]} castShadow receiveShadow />
          <mesh geometry={boxGeometry} material={materialMap.obstacle} position={[-1, 0, 0]} scale={[0.2, 0.3, 3]} castShadow receiveShadow />
          <mesh geometry={boxGeometry} material={materialMap.obstacle} position={[1, 0, 0]} scale={[0.2, 0.3, 3]} castShadow receiveShadow />
          <mesh geometry={boxGeometry} material={materialMap.obstacle} position={[0, 0, -1]} scale={[3, 0.3, 0.2]} castShadow receiveShadow />
          <mesh geometry={boxGeometry} material={materialMap.obstacle} position={[0.5, 0, 0.5]} scale={[0.2, 0.3, 1.2]} castShadow receiveShadow />
          <mesh geometry={boxGeometry} material={materialMap.obstacle} position={[-0.5, 0, -0.5]} scale={[0.2, 0.3, 1.2]} castShadow receiveShadow />
        </group>
      </RigidBody>
    </group>
  );
};

export default BlockMaze;