import { useMemo } from "react";

import { 
    BlockAxe, 
    BlockConveyor,
    BlockEnd, 

    BlockLimbo, 
    BlockMaze, 
    BlockPendulum,
    BlockRoller,
    BlockSmasher, 
    BlockSpinner, 
    BlockStart, 
    BlockZigZag 
} from "./blocks";
import Bounds from "./Bounds";

const Level = ({
  count = 10,
  blocksTypes = [
    BlockAxe, 
    BlockConveyor, 

    BlockLimbo, 
    BlockMaze, 
    BlockPendulum,
    BlockRoller,
    BlockSmasher, 
    BlockSpinner, 
    BlockZigZag 
  ],
  seed=0
}) => {

      const blocks = useMemo(()=>{
        const blocks = [];

        for(let i = 0; i < count; i++){
          const index = Math.floor(Math.random() * blocksTypes.length);
          const blockType =  blocksTypes[index];
          blocks.push(blockType);
        }

        return blocks;

      },[count, blocksTypes, seed]);


  return (
    <>
        <BlockStart position={[0, 0, 0]}/>

        {blocks.map((Block, index) => <Block key={index} position={[0, 0, - (index + 1) * 4]}/>)}
       
       <BlockEnd position={[0, 0, - (count +1) * 4]}/>

       <Bounds length={count + 2}/>
    
    </>
  )
}

export default Level;