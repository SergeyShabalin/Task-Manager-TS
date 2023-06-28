import { defaultState } from './initState'

import {
	BackToGreeting,
	BOARD_TYPES,
	BoardAction,
	ErrorFetching,
	FinishLoadingCard,
	Logout,
	payloadForApplyInvite,
	payloadForDeleteBoard,
	PayloadForDragDropColumn,
	PayloadForGetUsersOneCard,

	payloadForUsersOneBoard,

	StartLoadingCard
} from '@/models/Boards'
import {  ChangeColumn, COLUMN_TYPES,  DropCard } from '@/models/Columns'
import {
	AddNewCard,
	CARD_TYPES,
	ChangeCard,
	CloseCard,
	DeleteCard,
	GetCardInfo,
	getUsersOneCard,
	PayloadForApplySearchUser,
	PayloadForChangeViewUserOneCard
} from '@/models/Cards'
import { AddNewTask, ChangeTask, CHECKLIST_TYPES, DeleteTask, HideDoneTasks } from '@/models/CheckList'

export type BoardActions =
	| ErrorFetching
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
	| payloadForApplyInvite
	| payloadForUsersOneBoard
	| payloadForDeleteBoard
	| BackToGreeting
	| CloseCard
	| StartLoadingCard
	| FinishLoadingCard
	| PayloadForDragDropColumn
	| getUsersOneCard
	| HideDoneTasks
	| PayloadForGetUsersOneCard
	| PayloadForApplySearchUser
	| PayloadForChangeViewUserOneCard

export default function boardReducer(state = defaultState, action: BoardActions) {
	switch (action.type) {

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
				currentBoard: { ...state.currentBoard, columns: action.payload }
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
		case BOARD_TYPES.GET_USERS_ONE_CARD: {
			return {
				...state,
				usersOneCard: action.payload
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
				},
				usersOneCard: []
			}
		}
		case CARD_TYPES.GET_CARD_INFO: {
			return {
				...state,
				cardInfo: action.payload,
			}
		}
		case CARD_TYPES.GET_USERS_ONE_CARD: {
			return {
				...state,
				usersOneCard: action.payload

			}
		}

		case CARD_TYPES.CHANGE_VIEW_USER_ONE_CARD: {
			return {
				...state,
				cardInfo: {...state.cardInfo, memberIds: action.payload}
			}
		}

		case CARD_TYPES.APPLY_SEARCH_USERS: {
			return {
				...state,
				 allUsers: action.payload
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
		case CHECKLIST_TYPES.HIDE_DONE_TASKS: {


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
