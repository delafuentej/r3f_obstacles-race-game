import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { Lights, Level } from './components';

export default function Experience()
{
    return <>
        <OrbitControls makeDefault />

        <Physics debug>
            <Lights />
            <Level 
              //  count={10}
               // blocksTypes={[BlockSmasher, BlockSpinner, BlockLimbo]}
                />
        </Physics>
        

    </>
}