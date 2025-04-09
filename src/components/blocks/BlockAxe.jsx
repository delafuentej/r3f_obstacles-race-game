import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { boxGeometry } from "../../geometries/geometries";
import { materialMap } from "../../materials/materials";

const BlockAxe = ({ position }) => {
  const obstacleRef = useRef(); // Usamos un ref para el mesh
  
  const [timeOffset] = useState(()=> Math.random() * Math.PI * 2);
  

  useFrame((state) => {
    if (!obstacleRef.current) return; 
    const time = state.clock.getElapsedTime();
    
    const x = Math.sin(time + timeOffset) * 1.25; // Movimiento en Y: arriba y abajo

    // Aplicamos el movimiento a la posición del mesh
   
    obstacleRef.current.position.x = x;
    obstacleRef.current.position.y = 0.75;
   
     
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
          scale={[1.75, 1.75, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockAxe;