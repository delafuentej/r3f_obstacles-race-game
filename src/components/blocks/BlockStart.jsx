import { Float, Text, useGLTF } from "@react-three/drei";
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';

const BlockStart = ({position= [0, 0, 0]}) => {
  const font = '/fonts/bebas-neue-v9-latin-regular.woff';
  const startFlag = useGLTF('/models/chequered_flag.glb')
  return (
    <group position={position}>
        {/* Floor- Start */}
        <Float 
          floatIntensity={0.25}
          rotationIntensity={0.25}
          >
          <Text 
            scale={0.5}
            font={font}
            lineHeight={0.75}
            maxWidth={0.25}
            textAlign="right"
            position={[0.75, 0.65, -1]}
            rotation-y={-0.25}
            >Obstacle Race
            <meshBasicMaterial toneMapped={false}/>
            </Text>
            <primitive 
            object={startFlag.scene.clone()}
            rotation={[0,0,Math.PI * 0.25]}
            scale={1}
            position={[0.3, 0.3, -1]}
          />
            
        </Float>
         <mesh 
            geometry={boxGeometry} 
            material= {materialMap.floor1}
            position={[0, -0.1, 0]} 
            scale={[4, 0.2, 4]} 
            receiveShadow
        />
            
       
    </group>
   
  )
    
}

export default BlockStart