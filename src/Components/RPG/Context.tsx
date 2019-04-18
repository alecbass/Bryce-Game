import * as React from "react";
import * as MapContext from "./Map/MapContext";
import * as BattleContext from "./BattleFC/BattleContext";
import * as BattleReducer from "./BattleFC/BattleReducer";

export interface RPGState {
    battle: BattleContext.RPGBattleState;
    map: MapContext.RPGMapState;
}

export const initialState: RPGState = {
    battle: BattleContext.initialBattleState,
    map: MapContext.initialRpgMapState
};

const types = ["ATTACK", "HEAL"];
const reducer = (state: RPGState, action: any) => {
    let returnState = { ...state };
    switch (action.type) {
        case action.type in types: {
            returnState = BattleReducer.battleReducer(state, action);
            break;
        }
        default: {
            return returnState;
        }
    }
    return returnState;
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