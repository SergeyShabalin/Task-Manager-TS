import {
	AddBoard,
	Authentication,
	CheckLogin,
	DeleteBoard,
	DeleteMessage,
	Logout,
	StartRegistration,
	USER_TYPES
} from '@/models/Users'
import { defaultState } from '@/store/user/initState'

export type UserActions =
	| StartRegistration
	| CheckLogin
	| Authentication
	| Logout
	| AddBoard
	| DeleteMessage
	|DeleteBoard

export default function userReducer(state = defaultState, action: UserActions) {
	switch (action.type) {
		case USER_TYPES.REGISTRATION: {
			const { boardIds, email, _id, messages } = action.payload
			return {
				...state,
				isAuth: true,
				boardIds: boardIds,
				email: email,
				_id: _id,
				messages
			}
		}

		case USER_TYPES.CHECK_LOGIN: {
			const { boardIds, _id, messages, email, firstName, secondName, lastName } =
				action.payload.user
			return {
				...state,
				isAuth: action.payload.isAuth,
				boardIds,
				_id,
				messages,
				email,
				firstName,
				secondName,
				lastName
			}
		}

		case USER_TYPES.AUTHENTICATION: {
			const { boardIds, _id, email, firstName, lastName, messages } = action.payload
			return {
				...state,
				isAuth: true,
				boardIds,
				_id,
				email,
				firstName,
				lastName,
				messages
			}
		}

		case USER_TYPES.LOGOUT: {
			return {
				...state,
				isAuth: false,
				email: '',
				_id: '',
				boardIds: []
			}
		}

		case USER_TYPES.ADD_BOARD: {
			return {
				...state,
				boardIds: [...state.boardIds, action.payload]
			}
		}

		case USER_TYPES.DELETE_MESSAGE: {
			return {
				...state,
				messages: action.payload
			}
		}

		default:
			return state
	}
}
