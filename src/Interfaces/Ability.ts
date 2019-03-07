export enum AbilityType {
    Attack = "ATTACK",
    Heal = "HEAL",
    Buff = "BUFF"
}

export interface Ability {
    id: number;
    name: string;
    damage: number;
    type: AbilityType
}