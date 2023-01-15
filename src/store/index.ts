import { combineReducers, applyMiddleware, legacy_createStore  } from "redux";
import thunk from "redux-thunk";
import board from "./board/reducer";

import { BoardState } from '@/models/Boards'

export const rootReducer = combineReducers({ board });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export interface RootState {
	board: BoardState;
}
