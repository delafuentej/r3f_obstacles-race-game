import { useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useGameStore } from "../store/useGame.store";

const Interface = () => {

  const timeRef = useRef();

    const restart = useGameStore((state) => state.restart);
    const phase = useGameStore((state) => state.phase);
    
   

    const {forward, backward, leftward, rightward, jump} = useKeyboardControls((state)=> state);
    //console.log('jump', jump)

  useEffect(()=>{
      const unsubscribeEffect = addEffect(()=>{
        const state = useGameStore.getState();
        const {phase, startTime, finishTime} = state;

        let elapsedTime = 0;

        if(phase === 'playing') elapsedTime = Date.now() - startTime;
        if(phase === 'finished') elapsedTime = finishTime - startTime;

        elapsedTime /= 1000;
        elapsedTime = elapsedTime.toFixed(2);

        //update time html element
       if(timeRef.current) timeRef.current.textContent = elapsedTime;
       

       

      })

      return () => {
        unsubscribeEffect()
      }
  },[])

  return (
    <div className='interface'>

        {/* Time */}
        <div 
          ref={timeRef} 
          className="time"
        >
          0.00
        </div>

          {/* Restart */}
          {
            (phase === 'finished') && (
              <div 
              onClick={restart}
              className="restart">Restart</div>
    
            )
          }
         
          {/* Controls */}
          <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? 'active': ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${leftward ? 'active': ''}`}></div>
                <div className={`key ${backward ? 'active': ''}`}></div>
                <div className={`key ${rightward ? 'active': ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ? 'active': ''}`}></div>
            </div>
          </div>

    </div>
  )
}

export default Interface;