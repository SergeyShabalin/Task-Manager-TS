import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import boardReducer from "./board/reducer";
import columnReducer from './columns/reducer';
import cardsReducer from './cards/reducer'

const rootReducer = combineReducers({
	board: boardReducer,
	columns: columnReducer,
	cards: cardsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));