import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { Lights, Level, Player } from './components';


export default function Experience({ref}){
   
    return <>
        <OrbitControls makeDefault />

        <Physics>
            <Lights />
            <Level 
              //  count={10}
               // blocksTypes={[BlockSmasher, BlockSpinner, BlockLimbo]}
                />
            <Player />
        </Physics>
        

    </>
}