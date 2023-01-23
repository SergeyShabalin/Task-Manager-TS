import { defaultState } from './initState'

import {
	BOARD_TYPES,
	BoardAction,
	ErrorFetching,
	StartFetching,
	SuccessFetching
} from '@/models/Boards'
import { AddNewColumn, ChangeColumn, COLUMN_TYPES, DeleteColumn, DropCard } from '@/models/Columns'
import { AddNewCard, CARD_TYPES, ChangeCard, DeleteCard, GetCardInfo } from '@/models/Cards'
import { AddNewTask, ChangeTask, CHECKLIST_TYPES, DeleteTask } from '@/models/CheckList'

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
	| BoardAction
	| DropCard

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
		case BOARD_TYPES.CHANGE_BOARD:
			return {
				...state,
				currentBoard: action.payload
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
			return {
				...state,
				allCards: { ...state.allCards, [action.payload._id!]: action.payload },
				cardInfo: { ...action.payload, checkList: state.cardInfo.checkList }
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
			return {
				...state,
				cardInfo: { ...state.cardInfo, checkList: action.payload }
			}
		}
		case CHECKLIST_TYPES.DELETE_TASK: {
			return {
				...state,
				cardInfo: { ...state.cardInfo, checkList: action.payload }
			}
		}
		case COLUMN_TYPES.DROP_CARD: {

			const { targetColumnId, currentColumnId, currentCardId, targetCardId } = action.payload

			const dropColumn = JSON.parse(JSON.stringify(state.allColumns[targetColumnId]))
			const dragColumn = targetColumnId === currentColumnId
				? dropColumn : JSON.parse(JSON.stringify(state.allColumns[currentColumnId]))

			const newDragCardIds = dragColumn.cards.filter((id: string) => id !== currentCardId)
			dragColumn.cards = newDragCardIds

			const newArr = []
			if (dropColumn.cards.length === 0) {
				dropColumn.cards.push(currentCardId)
			} else {
				while (dropColumn.cards.length) {
					const cardId = dropColumn.cards.shift()
					if (cardId !== targetCardId) newArr.push(cardId)
					else newArr.push(cardId, currentCardId)
				}
				dropColumn.cards = newArr
			}
			return {
				...state,
				allColumns: {
					...state.allColumns,
					[currentColumnId]: dragColumn,
					[targetColumnId]: dropColumn

				},
				allCards: {
					...state.allCards, [currentCardId]: {
						...state.allCards[currentCardId],
						column_id: targetColumnId
					}
				}
			}
		}

		default:
			return state
	}
}
