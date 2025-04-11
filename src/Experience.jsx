import { Physics } from '@react-three/rapier';
import { Lights, Level, Player } from './components';
import { useGameStore } from './store/useGame.store';


export default function Experience({ref}){

    const blocksCount = useGameStore((state) => state.blocksCount);
    const blocksSeed = useGameStore((state) => state.blocksSeed);
   
    return <>
       
        <color args={['lightblue']} attach='background' />
        <Physics>
            <Lights />
            <Level 
                count={blocksCount}
                seed={blocksSeed}
               // blocksTypes={[BlockSmasher, BlockSpinner, BlockLimbo]}
                />
            <Player />
        </Physics>
        

    </>
}