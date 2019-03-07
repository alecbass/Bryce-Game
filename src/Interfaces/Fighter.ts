import avatar from "src/Images/avatar.png";
import { Ability, AbilityType } from "./Ability";
import { Item, ItemType } from "./Item";
import { ENGINE_METHOD_ALL } from "constants";

export class Fighter {
    
    public abilities: Ability[] = [
        {
            id: 1,
            name: "Punch",
            damage: 2,
            type: AbilityType.Attack
        },
        {
            id: 2,
            name: "Kick",
            damage: 4,
            type: AbilityType.Attack
        }
    ];

    public items: Item[] = [
        {
            id: 1,
            name: "Bandaid",
            strength: 3,
            type: ItemType.Heal,
            quantity: 3
        },
        {
            id: 2,
            name: "Roids",
            strength: 6,
            type: ItemType.Buff,
            quantity: 7
        }

    ];

    constructor(public id: number, public name = "Name", public health = 10, public maxHealth = 10, public strength = 3, public image?: any) {
        if (image) {
            if (typeof image === "string") {
                if (image.endsWith(".jpg") || image.endsWith(".png")) {
                    this.image = require("../../src/Images/" + image.toLowerCase());
                } else {
                    this.image = require("../../src/Images/" + image.toLowerCase());
                }
            }
            if (!this.image) {
                this.image = avatar;
            }
        }

        else {
            try {
                this.image = require("../../src/Images/" + name.toLowerCase() + ".jpg");
            } catch {
                try {
                    this.image = require("../../src/Images/" + name.toLowerCase() + ".png");
                } catch {
                    this.image = avatar;
                }
            }
        }
    }

    public attack(enemy: Fighter, ability: Ability) {
        if (ability.type === AbilityType.Attack) {
            enemy.health -= this.strength + ability.damage;
        } else if (ability.type === AbilityType.Heal) {
            enemy.health += this.strength + ability.damage;
            enemy.health = Math.min(enemy.health, 0);
        } else if (ability.type === AbilityType.Buff) {
            enemy.maxHealth += ability.damage;
        }
        enemy.health = Math.max(enemy.health, 0);
    }

    public useItem(item: Item) {
        item.quantity = Math.max(item.quantity - 1, 0);

        switch (item.type) {
            case ItemType.Heal: {
                this.health = Math.min(this.health + item.strength, this.maxHealth);
                return;
            }

            case ItemType.Buff: {
                this.maxHealth += item.strength;
                return;
            }
        }
    }
}