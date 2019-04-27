import * as MapContext from "./MapContext";
import { RPGState } from "./Context";


const battleTypes = ["ATTACK", "HEAL"];
const battleReducer = (state: RPGState, action: any) => {
    const { battle } = state;

    switch(action.type) {
        case "ATTACK": {
            battle.player.health -= 1;
            return state;
        }
        case "HEAL": {
            battle.player.health += 1;
            return state;
        }
        default: {
            battle.player.name += "REDUCED";
            return state;
        }
    }
}

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

const mapTypes = ["MOVE"];
const mapReducer = (state: RPGState, action: RPGMapMoveAction) => {
    if (typeof action !== "object") {
        return state;
    }

    const { map } = state;
    switch(action.type) {
        case RPGMapActionTypes.MOVE: {
          const { direction } = action.payload;
          let x = map.x;
          let y = map.y;
          // when we increase x or y, the limit is the height or width - 1 because of zero-indexing
          if (direction === "up") {
            y = Math.min(map.y + 1, map.height - 1) ;
          } else if (direction === "right") {
            x = Math.min(map.x + 1, map.width - 1);
          } else if (direction === "down") {
            y = Math.max(map.y - 1, 0);
          } else if (direction === "left") {
            x = Math.max(map.x - 1, 0);
          }

          if (MapContext.unmoveableTiles.includes(map.map[y][x])) {
            console.debug("can't move through");
            return {
              ...state
            }
          }
          
          // only save new map values if the move was successful   
          map.x = x;
          map.y = y;
          return {
            ...state
          }
        }
    
        default: {
          return { ...state };
        }
      }
}

const reducer = (state: RPGState, action: any) => {

    let returnState = { ...state };
    const { type } = action;

    // most tutorials have this as a switch-case block but not here!!!!!!
    if (battleTypes.includes(type)) {
        returnState = battleReducer(state, action);
    } else if (mapTypes.includes(type)) {
        returnState = mapReducer(state, action);
    } else {
        returnState = state;
    }

    return { ...returnState };
}

export default reducer;