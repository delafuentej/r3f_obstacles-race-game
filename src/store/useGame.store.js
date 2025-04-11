import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";


export const useGameStore = create(subscribeWithSelector((set)=> {
        return {
            //blocks
            blocksCount: 10,
            blocksSeed: 0,
            //time:
            startTime: 0,
            finishTime: 0,

            //phases:
            phase: 'ready',
            //methods:
            start: ()=>{
                    set((state)=>{
                        if(state.phase === 'ready')  
                            return {
                            phase: 'playing',
                            startTime: Date.now()
                            };
                       
                        return{};
                    })
            },

            restart: ()=>{
                set((state)=>{
                    if(state.phase === 'playing' || state.phase === 'finished')  
                        
                        return {phase: 'ready', blocksSeed: Math.random()};

                    return {};
                })
            },
            finish: ()=>{
                set((state)=>{
                    if(state.phase === 'playing') 
                        return {
                            phase: 'finished',
                            finishTime: Date.now()
                        };

                    return{};
                })
            },

        }
}));