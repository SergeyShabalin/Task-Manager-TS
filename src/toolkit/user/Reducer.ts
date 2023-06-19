import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {defaultState as userState} from './InitState'
import { User } from '@/models/toolkit/User'


const initialState = {
	userState
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		checkLogin: (state, action: PayloadAction<User>) => {
			state.userState = action.payload
		},
		login: (state, action: PayloadAction<User>) => {
			state.userState = action.payload
		},
		registration:  (state, action: PayloadAction<User>) => {
			state.userState = action.payload
		},
		logout: (state) => {
			state.userState = userState
		}
	},
})


export const { checkLogin, login, registration, logout } = userSlice.actions

export default userSlice.reducer