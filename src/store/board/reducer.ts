import { defaultState } from './initState'

import { BOARD_TYPES, StartFetching, SuccessFetching, ErrorFetching } from '@/models/Boards'
import { AddNewColumn, COLUMN_TYPES, DeleteColumn } from '@/models/Columns'
import { AddNewCard, CARD_TYPES } from '@/models/Cards'

export type BoardActions =
	| StartFetching
	| SuccessFetching
	| ErrorFetching
	| AddNewColumn
	| DeleteColumn
	| AddNewCard

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
				currentBoard: action.payload.currentBoard,
				allCards: action.payload.allCards
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
					columns: [...state.currentBoard.columns, action.payload]
				}
			}
		}

		case COLUMN_TYPES.DELETE_COLUMN: {
			return {
				...state,
				currentBoard: { ...state.currentBoard, columns: action.payload }
			}
		}

		case CARD_TYPES.ADD_NEW_CARD: {
			const id = action.payload._id
			const card = action.payload

			const allColumns = state?.currentBoard?.columns.map(column => {
				if (column._id === action.payload.column_id) {
					return { ...column, cards: [...column.cards, id] }
				}
				return column
			})

			return {
				...state,
				allCards: { ...state.allCards, [id]: card },
				currentBoard: { ...state.currentBoard, columns: allColumns }
			}
		}

		default:
			return state
	}
}
