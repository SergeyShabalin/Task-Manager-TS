import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '@/toolkit/user/Reducer'
import boardReducer from '@/toolkit/board/Reducer'

const reducer = combineReducers({
	board: boardReducer,
	user: userReducer
})

export const store = configureStore({
	reducer
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch