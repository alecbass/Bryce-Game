import * as MapContext from "./MapContext";
import { RPGState } from "./Context";

// BATTLE ACTIONS
export enum RPGBattleActionTypes {
    ATTACK = "ATTACK",
    HEAL = "HEAL"
}

export interface RPGBattleAction {
    type: RPGBattleActionTypes,
    payload: object
}

const battleReducer = (state: RPGState, action: any) => {
    const { battle } = state;
    const { player } = battle;
    switch(action.type) {
        case RPGBattleActionTypes.ATTACK: {
            player.health -= 1;
            if (player.health <= 0) {
                state.screen = "map";
            }
            return state;
        }
        case RPGBattleActionTypes.HEAL: {
            player.health += 1;
            return state;
        }
        default: {
            player.name += "REDUCED";
            return state;
        }
    }
}

// MAP ACTIONS
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

// basic actions
export enum BaseRPGActionTypes {
    CHANGE_SCREEN = "CHANGE_SCREEN"
}

export interface RPGChangeScreenAction {
    type: BaseRPGActionTypes.CHANGE_SCREEN;
    payload: {
        screen: "map" | "battle";
    }
}

const basicReducer = (state: RPGState, action: RPGChangeScreenAction) => {
    
    return {
        ...state,
        screen: action.payload.screen
    }
}

const reducer = (state: RPGState, action: any) => {

    let returnState = { ...state };
    const { type } = action;

    // most tutorials have this as a switch-case block but not here!!!!!!
    if (type in RPGBattleActionTypes) {
        returnState = battleReducer(state, action);
    } else if (type in RPGMapActionTypes) {
        returnState = mapReducer(state, action);
    } else if (type in BaseRPGActionTypes) {
        returnState = basicReducer(state, action);
    } else {
        returnState = state;
    }

    return { ...returnState };
}

export default reducer;