import {
	Logout,
	PayloadForAddBoard,
	PayloadForAuthentication,
	PayloadForCheckLogin,
	PayloadForDeleteMessage,
	PayloadForStartRegistration,
	USER_TYPES
} from '@/models/Users'
import { defaultState } from '@/store/user/initState'
import { payloadForDeleteBoard } from '@/models/Boards'

export type UserActions =
	| PayloadForStartRegistration
	| PayloadForCheckLogin
	| PayloadForAuthentication
	| Logout
	| PayloadForAddBoard
	| PayloadForDeleteMessage
	| payloadForDeleteBoard

export default function userReducer(state = defaultState, action: UserActions) {
	switch (action.type) {
		case USER_TYPES.REGISTRATION: {
			const { boardIds, email, _id, firstName, secondName, lastName, messages } = action.payload
			return {
				...state,
				isAuth: true,
				boardIds: boardIds,
				email: email,
				_id: _id,
				messages,
				firstName,
				secondName,
				lastName
			}
		}
		case USER_TYPES.CHECK_LOGIN: {
			const { boardIds, _id, messages, email, firstName, secondName, lastName, isAuth } =
				action.payload
			return {
				...state,
				isAuth: isAuth,
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
			const { boardIds, _id, email, firstName, secondName, lastName, messages, isAuth } = action.payload
			return {
				...state,
				isAuth: isAuth,
				boardIds,
				_id,
				email,
				firstName,
				lastName,
				messages,
				secondName
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
