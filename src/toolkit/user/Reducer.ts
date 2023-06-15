import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {defaultState as userState} from './InitState'
import { User } from '@/models/toolkit/Users'


const initialState = {
	userState
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		checkLogin: (state, action: PayloadAction<User>) => {
			state.userState = action.payload
			// state._id = action.payload._id
			// state.firstName = action.payload.firstName
			// state.lastName = action.payload.lastName
		},

	},
})


export const { checkLogin } = userSlice.actions

export default userSlice.reducer