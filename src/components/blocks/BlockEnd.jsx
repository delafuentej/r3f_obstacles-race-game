import { useGLTF, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';



const BlockEnd = ({position= [0, 0, 0]}) => {

  const font = '/fonts/bebas-neue-v9-latin-regular.woff'

  const trophy = useGLTF('./models/trophy.glb');
  const finish = useGLTF('./models/finish.glb');

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
      <Text
        font={font}
        scale={1}
        position={[ 0, 2.25, 2.2]}
        color='#ffff00'
      >
        FINISH
      </Text>  
         <primitive 
            object={finish.scene.clone()}
            scale={5}
            position={[0,0,2]}
          />

        {/* floor end */}
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