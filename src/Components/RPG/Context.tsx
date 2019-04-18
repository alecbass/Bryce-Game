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
const mapTypes = ["MOVE"];
const reducer = (state: RPGState, action: any) => {
    let returnState = { ...state };
    const { type } = action;

    // most tutorials have this as a switch-case block but not here!!!!!!
    if (battleTypes.includes(type)) {
        returnState = BattleReducer.battleReducer(state, action);
    } else if (mapTypes.includes(type)) {
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