import { createStore, combineReducers, applyMiddleware, legacy_createStore  } from "redux";
import thunk from "redux-thunk";
import board from "./board/reducer";
import columnReducer from './columns/reducer';
import cardsReducer from './cards/reducer'
import { BoardAPI, BoardState } from '@/models/Boards'

export const rootReducer = combineReducers({ board });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


// export type RootState = ReturnType<typeof rootReducer>;

export interface RootState {
	board: BoardState;
}
