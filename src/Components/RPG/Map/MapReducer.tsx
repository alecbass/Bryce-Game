import React, { useReducer } from "react";
import * as MapContext from "./MapContext";

// ACTIONS
export enum RPGMapActionTypes {
    MOVE = "MOVE"
}

type DirectionType = "up" | "right" | "down" | "left";

export interface RPGMapMoveAction {
    type: RPGMapActionTypes.MOVE,
    payload: {
        direction: DirectionType
    }
}

const mapReducer = (state: MapContext.RPGMapState = MapContext.initialRpgMapState, action: RPGMapActionTypes) => {
    return null;
    // switch(action.type) {
    //     case RPGMapActionTypes.MOVE: {
    //       const { direction } = payload;
    //       let x = state.x;
    //       let y = state.y;
    //       // when we increase x or y, the limit is the height or width - 1 because of zero-indexing
    //       if (direction === "up") {
    //         y = Math.min(state.y + 1, state.height - 1) ;
    //       } else if (direction === "right") {
    //         x = Math.min(state.x + 1, state.width - 1);
    //       } else if (direction === "down") {
    //         y = Math.max(state.y - 1, 0);
    //       } else if (direction === "left") {
    //         x = Math.max(state.x - 1, 0);
    //       }
    
    //       if (MapContext.unmoveableTiles.includes(state.map[y][x])) {
    //         console.debug("can't move through");
    //         return {
    //           ...state
    //         }
    //       }
    
    //       return {
    //         ...state,
    //         x: x,
    //         y: y
    //       }
    //     }
    
    //     default: {
    //       return state;
    //     }
    //   }
}

// export function rpgMapReducer(state: RPGMapState = initialRpgMapState, action: RPGMapAction) {

//     const { payload } = action;
  
    // switch(action.type) {
    //   case RPGMapActionTypes.MOVE: {
    //     const { direction } = payload;
    //     let x = state.x;
    //     let y = state.y;
    //     // when we increase x or y, the limit is the height or width - 1 because of zero-indexing
    //     if (direction === "up") {
    //       y = Math.min(state.y + 1, state.height - 1) ;
    //     } else if (direction === "right") {
    //       x = Math.min(state.x + 1, state.width - 1);
    //     } else if (direction === "down") {
    //       y = Math.max(state.y - 1, 0);
    //     } else if (direction === "left") {
    //       x = Math.max(state.x - 1, 0);
    //     }
  
    //     if (unmoveableTiles.includes(state.map[y][x])) {
    //       console.debug("can't move through");
    //       return {
    //         ...state
    //       }
    //     }
  
    //     return {
    //       ...state,
    //       x: x,
    //       y: y
    //     }
    //   }
  
    //   default: {
    //     return state;
    //   }
    // }
//   }