import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { boxGeometry } from "../../geometries/geometries";
import { materialMap } from "../../materials/materials";

const BlockAxe = ({ position }) => {
  const obstacleRef = useRef(); // Usamos un ref para el mesh
  
  // Asignamos un offset aleatorio para que el movimiento sea diferente para cada obstáculo
  const [offset] = useState(() => Math.random() * Math.PI * 5);
  
  // Velocidad aleatoria y dirección aleatoria (izquierda/derecha)
  const [speed] = useState(() => (Math.random() * 2 + 2) * (Math.random() < 0.5 ? -1 : 1));
  
  // Amplitud del movimiento para cada obstáculo
  const [amplitude] = useState(() => 0.3 + Math.random() * 0.7); // Amplitud entre 0.3 y 1.0

  useFrame((state) => {
    if (!obstacleRef.current) return; 
    const time = state.clock.getElapsedTime();
    
    // Movimiento zigzag o de lado
    const x = Math.sin(time * speed + offset) * amplitude;

    // Aplicamos el movimiento a la posición del mesh
    obstacleRef.current.position.x = x;
    obstacleRef.current.position.y = 0.75;
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

      {/* Obstáculo */}
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
          scale={[2, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default BlockAxe;