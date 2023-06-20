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
		getAllBoards: (state, action: PayloadAction<Board[]>) => {
			state.boardState.allBoards = action.payload
		},
		startLoadingBoards: (state) => {
			state.boardState.isLoadingBoard = true
		},
		finishLoadingBoards: (state) => {
			state.boardState.isLoadingBoard = false
		},
		startFetching: (state) => {
			state.boardState.isLoadingBoard = true
		},
		successFetching: (state, action: PayloadAction<Board>) => {
			state.boardState.isLoadingBoard = false
			state.boardState.currentBoard = action.payload.currentBoard
			state.boardState.allColumns = action.payload.allColumns
			state.boardState.allCards = action.payload.allCards
		}
	}
})


export const {
	getAllBoards,
	startLoadingBoards,
	finishLoadingBoards,
	startFetching,
	successFetching
} = boardSlice.actions

export default boardSlice.reducer