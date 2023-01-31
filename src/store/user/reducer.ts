import { Authentication, CheckLogin, Logout, StartRegistration, USER_TYPES } from '@/models/Users'
import { defaultState } from '@/store/user/initState'

export type UserActions = StartRegistration | CheckLogin | Authentication | Logout

export default function userReducer(state = defaultState, action: UserActions) {
	switch (action.type) {
		case USER_TYPES.REGISTRATION: {
			const { boardIds, email, _id } = action.payload
			return {
				...state,
				isAuth: true,
				boardIds: boardIds,
				email: email,
				_id: _id
			}
		}

		case USER_TYPES.CHECK_LOGIN: {
			return {
				...state,
				isAuth: action.payload
			}
		}

		case USER_TYPES.AUTHENTICATION: {
			const { boardIds, _id } = action.payload
			return {
				...state,
				isAuth: true,
				boardIds: boardIds,
				_id: _id
			}
		}

		case USER_TYPES.LOGOUT: {
			return{
				...state, isAuth: false
			}
		}

		default:
			return state
	}
}
