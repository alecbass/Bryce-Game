import React, { useState } from "react";
import { RPGContextProvider } from "../../store/Context";
import RPGMap from "./Map/Map";
import RPGBattle from "./BattleFC/Battle";
import styled from "@emotion/styled";

const RPGContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ScreenRPG: React.FC = props => {
    const [isInBattle, setIsInBattle] = useState(false);
    return (
        <RPGContextProvider>
            <RPGContainer>
                {isInBattle && <RPGBattle />}
                {!isInBattle && <RPGMap />}
            </RPGContainer>
        </RPGContextProvider>
    );

}

export default ScreenRPG;