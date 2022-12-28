import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import boardReducer from "./board/reducer";

const rootReducer = combineReducers({
	board: boardReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));