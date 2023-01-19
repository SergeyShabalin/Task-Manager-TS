import { defaultState } from './initState'

import { BOARD_TYPES, ErrorFetching, StartFetching, SuccessFetching } from '@/models/Boards'
import { AddNewColumn, ChangeColumn, COLUMN_TYPES, DeleteColumn } from '@/models/Columns'
import { AddNewCard, CARD_TYPES, ChangeCard, DeleteCard, GetCardInfo } from '@/models/Cards'
import { AddNewTask, ChangeTask, DeleteTask, CHECKLIST_TYPES } from '@/models/CheckList'

export type BoardActions =
	| StartFetching
	| SuccessFetching
	| ErrorFetching
	| AddNewColumn
	| DeleteColumn
	| AddNewCard
	| DeleteCard
	| ChangeCard
	| ChangeColumn
	| GetCardInfo
	| AddNewTask
	| ChangeTask
	| DeleteTask


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
		case COLUMN_TYPES.CHANGE_COLUMN: {
			return {
				...state,
				allColumns: { ...state.allColumns, [action.payload._id]: action.payload }
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
		case CARD_TYPES.CHANGE_CARD: {
			const newDescription =action.payload.description
			const newTitle = action.payload.title
			return {
				...state,
				allCards: { ...state.allCards, [action.payload._id]: action.payload },
				cardInfo:{...state.cardInfo, description: newDescription , title: newTitle}
			}
		}
		case CARD_TYPES.GET_CARD_INFO: {
			return {
				...state,
				cardInfo: action.payload
			}
		}
		case CHECKLIST_TYPES.ADD_NEW_TASK: {
			return {
				...state,
				cardInfo: { ...state.cardInfo, checkList: [...state.cardInfo.checkList, action.payload] }
			}
		}
		case CHECKLIST_TYPES.CHANGE_TASK: {
			return{
				...state,
				 cardInfo: { ...state.cardInfo, checkList:  action.payload}
			}
		}
		case CHECKLIST_TYPES.DELETE_TASK:{
			return{
				...state,
				cardInfo: { ...state.cardInfo, checkList: action.payload}
			}
		}

		default:
			return state
	}
}
