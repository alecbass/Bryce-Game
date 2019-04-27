import * as React from "react";
import * as MapContext from "./MapContext";
import reducer from "./reducer";
import * as BattleContext from "./BattleContext";

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