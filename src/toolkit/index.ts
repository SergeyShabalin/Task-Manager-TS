import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '@/toolkit/user/Reducer'
import boardReducer from '@/toolkit/board/Reducer'
import cardReducer from '@/toolkit/card/Reducer'

const reducer = combineReducers({
	board: boardReducer,
	user: userReducer,
	card: cardReducer
})

export const store = configureStore({
	reducer
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch