import { combineReducers, createStore } from 'redux';
import * as fromReducer from "./reducer";

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface State {
  gameState: fromReducer.GameState;
  messagesState: fromReducer.MessagesState;
}

/*
 * initialState of the app
 */
export const initialState: State = {
  gameState: fromReducer.initialState,
  messagesState: fromReducer.initialMessagesState
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<GameState>
 */
export const reducer = combineReducers<State>({
  gameState: fromReducer.reducer,
  messagesState: fromReducer.messagesReducer
})

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State, any, any, any>(reducer, initialState);

export default store;