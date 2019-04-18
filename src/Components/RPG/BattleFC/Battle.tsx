import React, { useState, useEffect, useContext } from "react";
import { RPGContext } from "../Context";
import { connect } from "react-redux";

interface Props {
    target?: string;
    dispatch: any;
}

const Battle: React.FC<Props> = props => {
    const { battle } = useContext(RPGContext);
    console.debug(battle);
    return (
        <div>Battle with {battle.player.name}</div>
    );
};

export default connect((state) => ({ }))(Battle);