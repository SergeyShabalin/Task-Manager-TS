import { CheckLogin, StartRegistration, USER_TYPES } from '@/models/Users'
import { defaultState } from '@/store/user/initState'


export type UserActions = | StartRegistration | CheckLogin

export default function userReducer(state = defaultState, action: UserActions) {
	switch (action.type) {
		case USER_TYPES.REGISTRATION: {
			return {
				...state, isAuth: true, boardIds: action.payload
			}
		}

		case USER_TYPES.CHECK_LOGIN: {
			return{
				...state, isAuth: action.payload
			}
		}

		default:
			return state
	}
}
