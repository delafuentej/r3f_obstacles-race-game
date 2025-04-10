import { Physics } from '@react-three/rapier';
import { Lights, Level, Player } from './components';


export default function Experience({ref}){
   
    return <>
       

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