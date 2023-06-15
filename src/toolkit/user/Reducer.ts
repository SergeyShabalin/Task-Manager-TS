import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
	value: number
}

const initialState: userState = {
	value: 0,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		vaas: (state) => {
			state.value += 1
		},

	},
})


export const { vaas } = userSlice.actions

export default userSlice.reducer