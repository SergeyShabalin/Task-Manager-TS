import { AddBoard, Authentication, CheckLogin, Logout, StartRegistration, USER_TYPES } from '@/models/Users'
import { defaultState } from '@/store/user/initState'

export type UserActions = StartRegistration | CheckLogin | Authentication | Logout | AddBoard

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
				isAuth: action.payload.isAuth,
				 boardIds: action.payload.user.boardIds,
				 _id: action.payload.user._id
			}
		}

		case USER_TYPES.AUTHENTICATION: {
			const { boardIds, _id, email } = action.payload
			return {
				...state,
				isAuth: true,
				boardIds: boardIds,
				_id: _id,
				email: email
			}
		}

		case USER_TYPES.LOGOUT: {
			return{
				...state, isAuth: false, email: '', _id: '', boardIds: []
			}
		}

		case USER_TYPES.ADD_BOARD: {
			return{
				...state, boardIds: [...state.boardIds, action.payload]
			}
		}

		default:
			return state
	}
}
