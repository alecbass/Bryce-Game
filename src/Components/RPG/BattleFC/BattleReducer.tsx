import { RPGState } from "../Context";

export const battleReducer = (state: RPGState, action: any) => {
    const { battle } = state;

    switch(action.type) {
        case "ATTACK": {
            battle.player.health -= 1;
            return state;
        }
        case "HEAL": {
            battle.player.health += 1;
            return state;
        }
        default: {
            battle.player.name += "REDUCED";
            return state;
        }
    }
}