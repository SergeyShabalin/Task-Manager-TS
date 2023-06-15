import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './toolkitReducer'
import userReducer from '@/toolkit/user/Reducer'

const reducer = combineReducers({
	counter: counterReducer,
	user: userReducer
})

export const store = configureStore({
	reducer
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch