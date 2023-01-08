import { defaultState } from './initState'

import { BOARD_TYPES, StartFetching, SuccessFetching, ErrorFetching } from '@/models/Boards'
import { AddNewColumn, COLUMN_TYPES, DeleteColumn } from '@/models/Columns'
import { AddNewCard, CARD_TYPES, DeleteCard, ChangeTitleCard } from '@/models/Cards'

export type BoardActions =
	| StartFetching
	| SuccessFetching
	| ErrorFetching
	| AddNewColumn
	| DeleteColumn
	| AddNewCard
	| DeleteCard
	| ChangeTitleCard

export default function boardReducer(state = defaultState, action: BoardActions) {
	switch (action.type) {
		case BOARD_TYPES.START_FETCHING_BOARD:
			return {
				...state,
				isLoading: true,
				isError: false
			}
		case BOARD_TYPES.SUCCESS_FETCHING_BOARD:
			return {
				...state,
				isLoading: false,
				isError: false,
				...action.payload
			}
		case BOARD_TYPES.ERROR_FETCHING_BOARD:
			return {
				...state,
				isLoading: false,
				isError: true,
				currentBoard: {
					title: '',
					columns: []
				},
				allCards: {}
			}

		case COLUMN_TYPES.ADD_NEW_COLUMN: {
			return {
				...state,
				currentBoard: {
					...state.currentBoard,
					columns: [...state.currentBoard.columns, action.payload._id]
				},
				allColumns: { ...state.allColumns, [action.payload._id]: action.payload }
			}
		}

		case COLUMN_TYPES.DELETE_COLUMN: {
			const newAllColumns = { ...state.allColumns }
			delete newAllColumns[action.payload.columnId]
			return {
				...state,
				currentBoard: { ...state.currentBoard, columns: action.payload.newColumns },
				allColumns: newAllColumns
			}
		}

		case CARD_TYPES.ADD_NEW_CARD: {
			const id = action.payload._id
			const card = action.payload
			const columnId = action.payload.column_id
			const currentColumn = { ...state.allColumns[columnId] }
			const currentCards = [...currentColumn.cards, id]

			return {
				...state,
				allCards: { ...state.allCards, [id]: card },
				allColumns: { ...state.allColumns, [columnId]: { ...currentColumn, cards: currentCards } }
			}
		}

		case CARD_TYPES.DELETE_CARD: {
			const newCardIds = action.payload.newCardIds
			const cardId = action.payload.cardId

			const columnId = state.allCards[cardId].column_id
			const currentColumn = state.allColumns[columnId]
			const newCurrentColumn = { ...currentColumn, cards: newCardIds }
			const newAllColumns = { ...state.allColumns, [columnId]: newCurrentColumn }

			const newAllCards = { ...state.allCards }
			delete newAllCards[action.payload.cardId]

			return {
				...state,
				allColumns: newAllColumns,
				allCards: newAllCards
			}
		}

		case CARD_TYPES.CHANGE_TITLE_CARD: {
			const currentCard = { ...state.allCards[action.payload.cardId] }
			const newCard = { ...currentCard, header: action.payload.title }
			return {
				...state,
				allCards: { ...state.allCards, [action.payload.cardId]: newCard }
			}
		}

		default:
			return state
	}
}
