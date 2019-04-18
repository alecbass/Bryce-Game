import React, { useState } from "react";
import { RPGContext, RPGContextProvider } from "./Context";
import RPGMap from "./Map/Map";
import RPGBattle from "./BattleFC/Battle";

const ScreenRPG: React.FC = props => {
    const [isInBattle, setIsInBattle] = useState(true);
    return (
        <RPGContextProvider>
            {isInBattle && <RPGBattle />}
            {!isInBattle && <RPGMap />}
        </RPGContextProvider>
    );

}

export default ScreenRPG;