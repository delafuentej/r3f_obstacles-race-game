import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Lights from './components/Lights.jsx';
import Level from './components/Level.jsx';

export default function Experience()
{
    return <>
        <OrbitControls makeDefault />

        <Physics debug>
            <Lights />
            <Level />
        </Physics>
        

    </>
}