import { combineReducers, createStore } from 'redux';
import * as fromReducer from "./reducer";

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
  Game: fromReducer.Game;
  messages: fromReducer.Messages;
}

/*
 * initialState of the app
 */
export const initialState: State = {
  Game: fromReducer.initialState,
  messages: fromReducer.initialMessagesState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<Game>
 */
export const reducer = combineReducers<State>({
  Game: fromReducer.reducer,
  messages: fromReducer.messagesReducer
})

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State, any, any, any>(reducer, initialState);

export default store;