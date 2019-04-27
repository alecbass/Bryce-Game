interface Player {
    name: string;
    health: number;
}

export interface RPGBattleState {
    player: Player;
}

export const initialBattleState: RPGBattleState = {
    player: {
        name: "Alec",
        health: 20
    }
};

