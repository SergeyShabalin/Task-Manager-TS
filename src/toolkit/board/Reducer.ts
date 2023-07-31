import { defaultState as boardState } from '@/toolkit/board/InitState'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, BoardAPI } from '@/models/toolkit/Board'
import { Column } from '@/models/toolkit/Column'
import { Card, PayloadForDeleteCard, PayloadForDragDropCard } from '@/models/toolkit/Card'

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
			state.boardState.currentBoard.columns.push(action.payload._id)
			state.boardState.allColumns = { ...state.boardState.allColumns, [action.payload._id]: action.payload }
		},
		deleteColumn: (state, action: PayloadAction<string[]>) => {
			state.boardState.currentBoard.columns = action.payload
		},
		changeColumn: (state, action: PayloadAction<Column>) => {
			state.boardState.allColumns = { ...state.boardState.allColumns, [action.payload._id]: action.payload }
		},
		dragDropColumn: (state, action: PayloadAction<string[]>) => {
			state.boardState.currentBoard.columns = action.payload
		},
		addNewCard: (state, action: PayloadAction<Card>) => {
			const currentColumn = state.boardState.allColumns[action.payload.column_id]
			currentColumn.cards.push(action.payload._id)
			state.boardState.allCards = { ...state.boardState.allCards, [action.payload._id]: action.payload }
			state.boardState.allColumns = {
				...state.boardState.allColumns,
				[action.payload.column_id]: { ...currentColumn, cards: currentColumn.cards }
			}
		},
		deleteCard: (state, action: PayloadAction<PayloadForDeleteCard>) => {
			const newCardIds = action.payload.newCardIds
			const cardId = action.payload.card_id
			const columnId = state.boardState.allCards[cardId].column_id
			const newCurrentColumn = { ...state.boardState.allColumns[columnId], cards: newCardIds }
			const newAllColumns = { ...state.boardState.allColumns, [columnId]: newCurrentColumn }
			const newAllCards = { ...state.boardState.allCards }
			delete newAllCards[cardId]
			state.boardState.allColumns = newAllColumns
			state.boardState.allCards = newAllCards
		},
		dragDropCard: (state, action: PayloadAction<PayloadForDragDropCard>) => {
			const { targetColumnId, currentColumnId, currentCardId, targetCardId } = action.payload

			const targetColumn = JSON.parse(JSON.stringify(state.boardState.allColumns[targetColumnId]))

			const currentColumn =
				targetColumnId === currentColumnId
					? targetColumn
					: JSON.parse(JSON.stringify(state.boardState.allColumns[currentColumnId]))

			let newArr = []
			currentColumn.cards = currentColumn.cards.filter((id: string) => id !== currentCardId)
			if (targetColumn.cards.length === 0) {
				targetColumn.cards.push(currentCardId)
			} else {
				while (targetColumn.cards.length) {
					const cardId = targetColumn.cards.shift()
					if (cardId !== targetCardId) newArr.push(cardId)
					else newArr.push(cardId, currentCardId)
				}
				targetColumn.cards = newArr
			}

			state.boardState.allColumns = {
				...state.boardState.allColumns,
				[currentColumnId]: currentColumn,
				[targetColumnId]: targetColumn
			}
			state.boardState.allCards = {
				...state.boardState.allCards,
				[currentCardId]: {
					...state.boardState.allCards[currentCardId],
					column_id: targetColumnId
				}
			}
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
	addNewColumn,
	deleteColumn,
	changeColumn,
	dragDropColumn,
	addNewCard,
	deleteCard,
	dragDropCard
} = boardSlice.actions

export default boardSlice.reducer