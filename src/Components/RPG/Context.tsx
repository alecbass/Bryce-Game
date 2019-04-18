import * as React from "react";
import * as MapContext from "./Map/MapContext";
import * as BattleContext from "./BattleFC/BattleContext";
import * as BattleReducer from "./BattleFC/BattleReducer";

export interface RPGState {
    screen: "map" | "battle";
    battle: BattleContext.RPGBattleState;
    map: MapContext.RPGMapState;
    dispatch: any;
}

export const initialState: RPGState = {
    screen: "battle",
    battle: BattleContext.initialBattleState,
    map: MapContext.initialRpgMapState,
    dispatch: () => {}
};

const battleTypes = ["ATTACK", "HEAL"];
const moveTypes = ["MOVE"];
const reducer = (state: RPGState, action: any) => {
    let returnState = { ...state };

    const reducerMatches = {
        battleMatch: battleTypes.includes(action.type),
        mapMatch: moveTypes.includes(action.type)
    };

    // most tutorials have this as a switch-case block but not here!!!!!!
    if (reducerMatches.battleMatch) {
        returnState = BattleReducer.battleReducer(state, action);
    } else if (reducerMatches.mapMatch) {
        returnState = state;
    } else {
        returnState = state;
    }
    
    return { ...returnState };
}

const RPGContext = React.createContext(initialState);

const RPGContextProvider: React.FC = props => {
    // new
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <RPGContext.Provider value={{ ...state, dispatch }} >
            {props.children}
        </RPGContext.Provider>
    );
}

export { RPGContext, RPGContextProvider };