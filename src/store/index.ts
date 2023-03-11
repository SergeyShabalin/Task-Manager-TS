import { combineReducers, applyMiddleware, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import board from './board/reducer'
import user from './user/reducer'

import { BoardState } from '@/models/Boards'
import { UserState } from '@/models/Users'

export const rootReducer = combineReducers({ board, user })

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export interface RootState {
	board: BoardState
	user: UserState
}
