import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, forwardRef } from "react";

// useKeyboardControls return an array with:
// - subscribeKeys: a function to subscribe to key changes (useful to know when the 'jump', etc. key has been pressed)
// - getKeys: a function to get the current state of the keys (useful to know if the WASD KEYS are being pressed)

const speed = 0.2;

const Player = forwardRef((props, ref) => {
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const bodyRef = useRef(null);

    useFrame(() => {
        const { backward, forward, jump, leftward, rightward } = getKeys();

        if (!bodyRef.current) return;

        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        if (forward) impulse.z -= speed;
        if (backward) impulse.z += speed;
        if (leftward) impulse.x -= speed;
        if (rightward) impulse.x += speed;
        if (jump) impulse.y += 0.5;

        bodyRef.current.applyImpulse(impulse, true);
        bodyRef.current.applyTorqueImpulse(torque, true);
    });

    return (
        <RigidBody
            ref={bodyRef}
            //ref={(instance) => { bodyRef.current = instance;  if (ref) ref.current = instance; }}
            position={[0, 1, 0]}
            colliders="ball"
            restitution={0.2}
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