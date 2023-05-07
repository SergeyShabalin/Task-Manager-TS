import { defaultState } from './initState'

import {
	AllBoardAction,
	BackToGreeting,
	BOARD_TYPES,
	BoardAction, DragDropColumn,
	ErrorFetching,
	FinishLoadingBoard,
	FinishLoadingCard,
	Logout,
	payloadForApplyInvite,
	payloadForDeleteBoard,
	PayloadForSuccessFetching,
	payloadForUsersOneBoard,
	StartFetching,
	StartLoadingBoard,
	StartLoadingCard
} from '@/models/Boards'
import { AddNewColumn, ChangeColumn, COLUMN_TYPES, DeleteColumn, DropCard } from '@/models/Columns'
import {
	AddNewCard,
	CARD_TYPES,
	ChangeCard,
	CloseCard,
	DeleteCard,
	GetCardInfo
} from '@/models/Cards'
import { AddNewTask, ChangeTask, CHECKLIST_TYPES, DeleteTask } from '@/models/CheckList'

export type BoardActions =
	| StartFetching
	| PayloadForSuccessFetching
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
	| Logout
	| AllBoardAction
	| payloadForApplyInvite
	| payloadForUsersOneBoard
	| payloadForDeleteBoard
	| StartLoadingBoard
	| FinishLoadingBoard
	| BackToGreeting
	| CloseCard
	| StartLoadingCard
	| FinishLoadingCard
	| DragDropColumn

export default function boardReducer(state = defaultState, action: BoardActions) {
	switch (action.type) {
		case BOARD_TYPES.START_FETCHING_BOARD:
			return {
				...state,
				isLoadingBoard: true,
				isError: false
			}
		case BOARD_TYPES.SUCCESS_FETCHING_BOARD:
			return {
				...state,
				isLoadingBoard: false,
				isError: false,
				...action.payload
			}
		case BOARD_TYPES.ERROR_FETCHING_BOARD:
			return {
				...state,
				isLoadingBoard: false,
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
		case BOARD_TYPES.DRAG_DROP_COLUMN:
			return {
				...state,
				currentBoard: {...state.currentBoard, columns: action.payload}
			}
		case BOARD_TYPES.GET_ALL_BOARDS:
			return {
				...state,
				allBoards: action.payload
			}
		case BOARD_TYPES.APPLY_INVITE: {
			return {
				...state,
				allBoards: [...state.allBoards, action.payload]
			}
		}
		case BOARD_TYPES.DELETE_BOARD: {
			return {
				...state,
				allBoards: action.payload
			}
		}
		case BOARD_TYPES.START_LOADING_BOARD: {
			return {
				...state,
				isLoadingBoard: true
			}
		}
		case BOARD_TYPES.FINISH_LOADING_BOARD: {
			return {
				...state,
				isLoadingBoard: false
			}
		}
		case BOARD_TYPES.START_LOADING_CARD: {
			return {
				...state,
				isLoadingCard: true
			}
		}
		case BOARD_TYPES.FINISH_LOADING_CARD: {
			return {
				...state,
				isLoadingCard: false
			}
		}
		case BOARD_TYPES.LOGOUT: {
			return {
				...state,
				currentBoard: {},
				allBoards: [],
				allUsers: [],
				allCards: {}
			}
		}
		case BOARD_TYPES.BACK_TO_GREETING: {
			return {
				...state,
				currentBoard: {},
				allUsers: []
			}
		}
		case BOARD_TYPES.GET_USERS_ONE_BOARD: {
			return {
				...state,
				allUsers: action.payload
			}
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
				currentBoard: { ...state.currentBoard, columns: action.payload.columnIds },
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
		case CARD_TYPES.CLOSE_CARD: {
			return {
				...state,
				cardInfo: {
					_id: '',
					checkList: [],
					title: '',
					description: '',
					decisionDate: new Date(),
					order: 0,
					column_id: '',
					countTask: 0,
					doneTask: 0
				}
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

			const targetColumn = JSON.parse(JSON.stringify(state.allColumns[targetColumnId]))
			const currentColumn =
				targetColumnId === currentColumnId
					? targetColumn
					: JSON.parse(JSON.stringify(state.allColumns[currentColumnId]))

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

			return {
				...state,
				allColumns: {
					...state.allColumns,
					[currentColumnId]: currentColumn,
					[targetColumnId]: targetColumn
				},
				allCards: {
					...state.allCards,
					[currentCardId]: {
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
