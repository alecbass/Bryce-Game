import { ActionTypes, Action, MessageAction, MessageActionTypes } from "./actions";
import { Fighter } from "src/Interfaces/Fighter";
import { Message } from "src/Sockets/Api";

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */

// Define our State interface for the current reducer
export interface Game {
  fighters: Fighter[];
  yourFighterIndex: number;
};

// make our initial fighters
const initialFighters = [
  new Fighter(1, "Joe", 10, 10, 3), 
  new Fighter(2, "Vegan Bryce", 10, 10, 3, "bryce.jpg"),
  new Fighter(3, "Neil", 10, 10, 3),
  new Fighter(4, "Sam", 10, 10, 3),
  new Fighter(5, "Kanzler Szalay", 10, 10, 3, "will.jpg"),
  new Fighter(6, "Harlan 1", 10, 10, 3, "beau.jpg"),
  new Fighter(7, "Harlan 2", 10, 10, 3, "blake.jpg"),
  new Fighter(8, "Oscar", 10, 10, 3),
  new Fighter(9, "George", 10, 10, 3),
  new Fighter(10, "Crinkle", 10, 10, 3, "chris.png"),
  new Fighter(11, "Jakob Tay Tay", 10, 10, 3, "james.png"),
  new Fighter(12, "Bry Bry", 10, 10, 3, "bryan.png"),
  new Fighter(13, "Hamish", 10, 10, 3, "arjun.png"),
  new Fighter(14, "King Fella", 10, 10, 3, "christian.png"),
  new Fighter(15, "J Smitty", 10, 10, 3, "jsmitty.png"),
  new Fighter(16, "Jacob", 10, 10, 3),
  new Fighter(17, "Sminem", 60, 60, 23, "sminem.jpg"),
  new Fighter(18, "Mystery", 10000, 10000, 10000),
  new Fighter(19, "Amber", 10, 10, 3)
];

// define initialState
export const initialState: Game = {
  fighters: [...initialFighters],
  yourFighterIndex: 0
}

export function reducer(state: Game = initialState, action: Action) {
    switch (action.type) {
  
      case ActionTypes.ADD_FIGHTER: {
        /*
         * We have autocompletion here
         * Typescript knows the action is type of AddTodoAction thanks to the ActionTypes enum
         * todo is type of Todo
         */
        const { fighter } = action.payload;
  
        return {
          ...state,
          fighters: [...state.fighters, fighter] // Add fighter to fighters array
        }
      }
  
      case ActionTypes.ATTACK_FIGHTER: {
        /*
         * This is the same as 
         * const todoId = action.payload.todoId
         */
        const { attacker, defender, ability } = action.payload;
        attacker.attack(defender, ability);

        return {
          ...state,
          fighters: [...state.fighters]
        }
      }

      case ActionTypes.CHANGE_FIGHTER: {
        const { newFighterIndex } = action.payload;

        return {
          ...state,
          yourFighterIndex: newFighterIndex
        }
      }

      case ActionTypes.USE_ITEM: {
        const { user, item } = action.payload;
        user.useItem(item);

        return {
          ...state
        }
      }
  
      default: {
        return state;
      }
    }
  }

// Messages

export interface User {
  id?: number;
  name?: string;
}

export interface Messages {
  me: User;
  activeUsers: User[];
  messages: Message[];
}

export const initialMessagesState: Messages = {
  me: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {},
  activeUsers: [],
  messages: []
}

export function messagesReducer(state: Messages = initialMessagesState, action: MessageAction) {
  switch (action.type) {
    // case MessageActionTypes.SEND_MESSAGE: {
    //   const { message } = action.payload;
    //   Socket.send(message);

    //   return {
    //     ...state
    //   }
    // }

    case MessageActionTypes.RECEIVE_MESSAGE: {
      const { message } = action.payload;

      if (message.type === "signon") {
        if (Array.isArray(message.payload)) {
          const newUsers: User[] = [];
          (message.payload as User[]).forEach(user => newUsers.push(user));
          return {
            ...state,
            activeUsers: [...state.activeUsers, ...newUsers]
          }
        } else {
          return {
            ...state,
            activeUsers: [...state.activeUsers , message.user || {}]
          }
        }
      }

      else if (message.type === "signoff") {
        return {
          ...state,
          activeUsers: [...state.activeUsers.filter(user => user.id !== (message.payload as User).id)]
        }
      }

      else if (message.type === "message") {
        if (Array.isArray(message.payload)) {
          return {
            ...state,
            messages: [...state.messages, ...message.payload as Message[]]
          }
        } else {
          const result: Message = {
            type: message.type,
            user: message.user,
            payload: message.payload as string
          };
          return {
            ...state,
            messages: [...state.messages, result]
          }
        }
      }

      else if (message.type === "refresh") {
        // set the new users to whatever the new list is
        return {
          ...state,
          activeUsers: [...(message.payload as User[])]
        }
      }

      else if (message.type === "login") {
        if (!message.user) {
          return {
            ...state,
          }
        }
        localStorage.setItem("user", JSON.stringify(message.user as User));
        return {
          ...state,
          me: message.user
        }
      }

      return {
        ...state
      }
    }

    default: {
      return state;
    }
  }
}