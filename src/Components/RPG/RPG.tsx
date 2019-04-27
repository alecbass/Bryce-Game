import React, { useState, useContext } from "react";
import { RPGContextProvider, RPGContext } from "../../store/Context";
import RPGMap from "./Map/Map";
import RPGBattle from "./BattleFC/Battle";
import styled from "@emotion/styled";

const RPGContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ScreenRPG: React.FC = () => {
    const { screen } = useContext(RPGContext);
    return (
            <RPGContainer>
                {screen === "battle" && <RPGBattle />}
                {screen === "map" && <RPGMap />}
            </RPGContainer>
    );

}

export default ScreenRPG;