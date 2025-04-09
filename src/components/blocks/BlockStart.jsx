
import { boxGeometry } from '../../geometries/geometries';
import { materialMap } from '../../materials/materials';

const BlockStart = ({position= [0, 0, 0]}) => {
  return (
    <group position={position}>
        {/* Floor- Start */}
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