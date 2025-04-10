//import * as RAPIER from '@dimforge/rapier3d-compact';
import * as THREE from 'three';
import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, forwardRef, useEffect, useState } from "react";



// useKeyboardControls return an array with:
// - subscribeKeys: a function to subscribe to key changes (useful to know when the 'jump', etc. key has been pressed)
// - getKeys: a function to get the current state of the keys (useful to know if the WASD KEYS are being pressed)
const Player = forwardRef((props, ref) => {
  
    const bodyRef = useRef(null);
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const {rapier, world} = useRapier();
    const rapierWorld = world;
    
    //useState
    const [smoothedCameraPosition] = useState(()=> new THREE.Vector3(10, 10, 10));
    const [smoothedCameraTarget] = useState(()=> new THREE.Vector3());

    const jump= () => {
        // to set the origin of raycaster, to retrieve the body position with translation
        const origin = bodyRef.current.translation();
        origin.y -= 0.31;
        const direction = {x:0, y:-1, z:0};
        const ray = new rapier.Ray(origin, direction);
        const hit = rapierWorld.castRay(ray,10, true);

       
        if(hit.timeOfImpact < 0.15) bodyRef.current.applyImpulse({x: 0, y: 0.5, z:0});
    }

    

    useEffect(()=> {
        const unsubscribeJump = subscribeKeys(
            (state)=> state.jump,
            (value)=>{
                if(value) jump();
            },
        );
        return ()=> {
            unsubscribeJump()
        }
    },[]);

    useFrame((state, delta) => {

         /**
          * Controls
          */
        const { backward, forward, jump, leftward, rightward } = getKeys();

        if (!bodyRef.current) return;

        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

       const impulseStrength = 0.6 * delta;
       const torqueStrength = 0.2 * delta;

       switch (true) {
        case forward:
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
            break;
        case rightward:
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
            break;
        case leftward:
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
            break;
        case backward:
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
            break;
        default:
            break;
    }



        bodyRef.current.applyImpulse(impulse, true);
        bodyRef.current.applyTorqueImpulse(torque, true);

        /**
         * Camera
         */
        // to retrieve the position of the body with translation
        const bodyPosition = bodyRef.current.translation();
        const cameraPosition = new THREE.Vector3();

        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 2.25;
        cameraPosition.y += 0.65;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;

        //update camera
        // lerp= linear interpolation
        smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

        state.camera.position.copy(smoothedCameraPosition);
        state.camera.lookAt(smoothedCameraTarget);
    });

    return (
        <RigidBody
            //ref={bodyRef}
            ref={(instance) => { bodyRef.current = instance;  if (ref) ref.current = instance; }}
            position={[0, 1, 0]}
            colliders="ball"
            restitution={0.2}
            linearDamping={0.5}
            angularDamping={0.5}
            friction={1}
            canSleep={false}
            {...props} // Pass any other props to the RigidBody
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial color="#C800FF" flatShading />
            </mesh>
        </RigidBody>
    );
});

export default Player;