import { defaultState as boardState } from '@/toolkit/board/InitState'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board } from '@/models/toolkit/Board'

const initialState = {
	boardState
}

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		getAllBoards: (state, action: PayloadAction<Board>) => {
			state.boardState.allBoards = action.payload
		},

	},
})


export const {getAllBoards} = boardSlice.actions

export default boardSlice.reducer