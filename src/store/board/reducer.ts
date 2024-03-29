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

	PayloadForGetUsersOneCard,
	payloadForUsersOneBoard,

	StartLoadingCard
} from '@/models/Boards'
import {  ChangeColumn, COLUMN_TYPES } from '@/models/Columns'
import {
	CARD_TYPES,
	ChangeCard,
	CloseCard,

	PayloadForApplySearchUser,
	PayloadForChangeViewUserOneCard
} from '@/models/Cards'
import {   ChangeTask, CHECKLIST_TYPES, DeleteTask, HideDoneTasks } from '@/models/CheckList'

export type BoardActions =
	| ErrorFetching
	| ChangeCard
	| ChangeColumn
	| ChangeTask
	| DeleteTask
	| BoardAction
	| Logout
	| payloadForApplyInvite
	| payloadForUsersOneBoard
	| payloadForDeleteBoard
	| BackToGreeting
	| CloseCard
	| StartLoadingCard
	| FinishLoadingCard
	| HideDoneTasks
	| PayloadForGetUsersOneCard
	| PayloadForApplySearchUser
	| PayloadForChangeViewUserOneCard

export default function boardReducer(state = defaultState,
																		 action: BoardActions) {
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


		case CARD_TYPES.CHANGE_CARD: {
			// return {
			// 	...state,
			// 	allCards: { ...state.allCards, [action.payload._id!]: action.payload },
			// 	cardInfo: { ...action.payload, checkList: state.cardInfo.checkList }
			// }
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


		default:
			return state
	}
}
