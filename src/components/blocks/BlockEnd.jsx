import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';



const BlockEnd = ({position= [0, 0, 0]}) => {

  const trophy = useGLTF('./models/trophy.glb');

  trophy.scene.castShadow = true;


  trophy.scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true; // Opcional
     
    }
  });

  // trophy.scene.castShadow = true;



  return (
    <group position={position}>
        {/* Floor- Start */}
         <mesh 
            geometry={boxGeometry} 
            material= {materialMap.floor1}
            position={[0, 0, 0]} 
            scale={[4, 0.2, 4]} 
            receiveShadow
        />

        <RigidBody 
          type='fixed' 
          colliders='hull' 
          position={[0,0.25, 0]}
          restitution={0.2}
          friction={0}
         
          >
          <primitive 
            object={trophy.scene.clone()}
            scale={2}
           
          />
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
        </RigidBody>
       
    </group>
   
  )
    
}

export default BlockEnd;