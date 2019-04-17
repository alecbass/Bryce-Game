import * as React from "react";

const mapIconSize = 24;
const player = require("Images/player.png");
export const PlayerIcon = () => (
    <img src={player} height={mapIconSize} width={mapIconSize} />
);

const monster = require("Images/monster.png");
export const MonsterIcon = () => (
    <img src={monster} height={mapIconSize} width={mapIconSize} />
);