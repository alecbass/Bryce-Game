import { Fighter } from "src/Interfaces/Fighter";
import { Ability } from "src/Interfaces/Ability";
import { Item } from "src/Interfaces/Item";

let nextId = 0;

export enum ActionTypes {
    ATTACK_FIGHTER = "ATTACK_FIGHTER",
    ADD_FIGHTER = "ADD_FIGHTER",
    CHANGE_FIGHTER = "CHANGE_FIGHTER",
    USE_ITEM = "USE_ITEM",
};

/*
 * Define return types of our actions 
 * Every action returns a type and a payload
 */
export interface AddFighterAction {
    type: ActionTypes.ADD_FIGHTER,
    payload: {
        fighter: Fighter
    }
}

export interface AttackFighterAction {
    type: ActionTypes.ATTACK_FIGHTER,
    payload: {
        attacker: Fighter,
        defender: Fighter,
        ability: Ability
    }
}

export interface ChangeFighterAction {
    type: ActionTypes.CHANGE_FIGHTER,
    payload: {
        newFighterIndex: number
    }
}

export interface UseItemAction {
    type: ActionTypes.USE_ITEM,
    payload: {
        user: Fighter,
        item: Item
    }
}

/*
 * Define our actions creators
 * We are returning the right Action for each function
 */
export function addFighter(fighter: Fighter): AddFighterAction {
    fighter.id = nextId++;
    
    return {
        type: ActionTypes.ADD_FIGHTER,
        payload: {
            fighter
        }
    }
}

export function changeFighter(newFighter: Fighter | number): ChangeFighterAction {
    let newFighterIndex = 1;
    if (newFighter instanceof Fighter) {
        newFighterIndex = newFighter.id;
    } else {
        newFighterIndex = newFighter;
    }

    return {
        type: ActionTypes.CHANGE_FIGHTER,
        payload: {
            newFighterIndex
        }
    }
}

export function attackFighter(attacker: Fighter, defender: Fighter, ability: Ability): AttackFighterAction {
  return { 
      type: ActionTypes.ATTACK_FIGHTER, 
      payload: { 
        attacker: attacker,
        defender: defender,
        ability: ability
      } 
    }
}

export function useItem(user: Fighter, item: Item): UseItemAction {
    return {
        type: ActionTypes.USE_ITEM,
        payload: {
            user: user,
            item: item
        }
    }
}

/*
 * Define the Action type
 * It can be one of the types defining in our action/todos file
 * It will be useful to tell typescript about our types in our reducer
 */
export type Action = AddFighterAction | AttackFighterAction | ChangeFighterAction | UseItemAction;


/** Messages */
export enum MessageActionTypes {
    SEND_MESSAGE = "SEND_MESSAGE",
}

export interface SendMessageAction {
    type: MessageActionTypes.SEND_MESSAGE,
    payload: {
        message: string;
    }
}

export function sendMessage(message: string): SendMessageAction {
    return {
        type: MessageActionTypes.SEND_MESSAGE,
        payload: {
            message: message
        }
    }
}

export type MessageAction = SendMessageAction;