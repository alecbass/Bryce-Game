import React, { useState, useEffect, useContext } from "react";
import { RPGContext } from "../Context";
import Button from "reactstrap/lib/Button";

const RPGBattle: React.FC = () => {
    const { battle, dispatch } = useContext(RPGContext);
    
    return (
        <div>
            Battle with {battle.player.name}
            Health: {battle.player.health}
            <Button onClick={() => dispatch({ type: "ATTACK" })}>Attack</Button>
            <Button onClick={() => dispatch({ type: "HEAL" })}>Heal</Button>
        </div>
    );
};

export default RPGBattle;