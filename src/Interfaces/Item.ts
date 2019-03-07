export enum ItemType {
    Heal = "HEAL",
    Buff = "BUFF"
}

export interface Item {
    id: number;
    name: string;
    strength: number;
    type: ItemType
    quantity: number;
}