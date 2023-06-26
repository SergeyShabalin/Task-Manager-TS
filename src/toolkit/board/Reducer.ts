import { defaultState as boardState } from '@/toolkit/board/InitState'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, BoardAPI } from '@/models/toolkit/Board'
import { Column } from '@/models/toolkit/Column'

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
		successFetching: (state, action: PayloadAction<BoardAPI>) => {
			state.boardState.isLoadingBoard = false
			state.boardState.currentBoard = action.payload.currentBoard
			state.boardState.allColumns = action.payload.allColumns
			state.boardState.allCards = action.payload.allCards
		},
		changeBoard: (state, action: PayloadAction<Board>) => {
			state.boardState.currentBoard = action.payload
		},
		addNewColumn: (state, action: PayloadAction<Column>) => {
		 	state.boardState.currentBoard.columns = [...state.boardState.currentBoard.columns, action.payload._id]
			state.boardState.allColumns = { ...state.boardState.allColumns,	[action.payload._id]: action.payload}
		},
	}
})


export const {
	getAllBoards,
	startLoadingBoards,
	finishLoadingBoards,
	startFetching,
	successFetching,
	changeBoard,
	addNewColumn
} = boardSlice.actions

export default boardSlice.reducer