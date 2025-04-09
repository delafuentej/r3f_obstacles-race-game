import BlockStart from "./blocks/BlockStart";
import BlockSpinner from "./blocks/BlockSpinner";
import BlockLimbo from "./blocks/BlockLimbo";
import BlockAxe from "./blocks/BlockAxe";
import BlockMaze from "./blocks/BlockMaze";
import BlockZigZag from "./blocks/BlockZigZag";
import BlockEnd from "./blocks/BlockEnd";
import BlockConveyor from "./blocks/BlockConveyor";
import BlockSmasher from "./blocks/BlockSmasher";

const Level = () => {
  return (
    <>
         

        <BlockStart position={[0, 0, 32]}/>
        <BlockSmasher position={[0,0, 28]}/>
        <BlockConveyor position={[0, 0, 24]}/>
        <BlockSpinner position={[0, 0, 20]}/>
        <BlockZigZag position={[0, 0, 16]}/>
        <BlockMaze  position={[0, 0, 12]}/>
        <BlockLimbo position={[0, 0, 8]}/>
        <BlockAxe position={[0, 0, 4]}/>
        <BlockEnd position={[0, 0, 0]}/>
    
    </>
  )
}

export default Level;