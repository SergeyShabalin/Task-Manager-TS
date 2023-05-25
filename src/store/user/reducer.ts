import {
	ClearUserInfo,
	Logout,
	PayloadForAddBoard,
	PayloadForAuthentication, PayloadForChangeAvatarUser, PayloadForChangeBackgroundUser, PayloadForChangePersonalInfo,
	PayloadForChangeUser,
	PayloadForCheckLogin,
	PayloadForDeleteMessage, PayloadForGetUserInfo,
	PayloadForShareBoard,
	PayloadForSocketInit,
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
	| PayloadForSocketInit
	| PayloadForShareBoard
	| PayloadForChangeUser
	| PayloadForChangeBackgroundUser
	| PayloadForChangeAvatarUser
	| PayloadForChangePersonalInfo
	| PayloadForGetUserInfo
	| ClearUserInfo


export default function userReducer(state = defaultState, action: UserActions) {
	switch (action.type) {
		case USER_TYPES.REGISTRATION: {
			const { boardIds, email, _id, firstName, secondName, lastName, messages, avatar } =
				action.payload
			return {
				...state,
				isAuth: true,
				boardIds: boardIds,
				email: email,
				_id: _id,
				messages,
				firstName,
				secondName,
				lastName,
				avatar
			}
		}
		case USER_TYPES.CHECK_LOGIN: {

			const { boardIds, _id, messages, email, firstName, secondName, lastName, isAuth, avatar, background, department, organization, position } =
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
				lastName,
				background,
				department,
				organization,
				position,
				avatar
			}
		}
		case USER_TYPES.AUTHENTICATION: {
			const { boardIds, _id, email, firstName, secondName, lastName, messages, isAuth, avatar, background, department, organization, position } =
				action.payload
			return {
				...state,
				isAuth: isAuth,
				boardIds,
				_id,
				email,
				firstName,
				lastName,
				messages,
				department,
				organization,
				position,
				secondName,
				avatar,
				background
			}
		}
		case USER_TYPES.LOGOUT: {
			return {
				...state,
				isAuth: false,
				email: '',
				_id: '',
				avatar: '',
				secondName: '',
				firstName: '',
				lastName: '',
				background: '',
				position: '',
				department: '',
				organization: '',
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
		case USER_TYPES.SOCKET_INIT: {
			return {
				...state,
				socket: action.payload
			}
		}
		case USER_TYPES.SHARE_BOARD: {
			return {
				...state,
				messages: action.payload
			}
		}

		case USER_TYPES.CHANGE_USER: {
			return {
				...state,
				secondName: action.payload.secondName,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				position: action.payload.position,
				department: action.payload.department,
				organization: action.payload.organization,
				birthDate: action.payload.birthDate,
			}
		}

		case USER_TYPES.CHANGE_BACKGROUND_USER: {
			return {
				...state,
				background: action.payload.background,
			}
		}
		case USER_TYPES.CHANGE_AVATAR_USER: {
			return {
				...state,
				avatar: action.payload.avatar,
			}
		}
		case USER_TYPES.CHANGE_PERSONAL_INFO: {
			return {
				...state,
				email: action.payload,
			}
		}
		case USER_TYPES.GET_USER_INFO: {
			return {
				...state,
				profileUser:
					{
						...state.profileUser,
						avatar: action.payload.avatar,
						background: action.payload.background,
						secondName: action.payload.secondName,
						firstName: action.payload.firstName,
						lastName: action.payload.lastName,
						email: action.payload.email,
						position: action.payload.position,
						department: action.payload.department,
						organization: action.payload.organization,
						birthDate: action.payload.birthDate,
					}
			}
		}
		case USER_TYPES.CLEAR_USER_INFO: {
			return {
				...state,
				profileUser:
					{
						avatar: '',
						background:'',
						secondName: '',
						firstName: '',
						lastName: '',
						email: '',
						position: '',
						department: '',
						organization: '',
						birthDate: Date.now(),
					}
			}
		}

		default:
			return state
	}
}
