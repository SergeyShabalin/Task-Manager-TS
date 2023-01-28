import { StartRegistration, USER_TYPES } from '@/models/Users'
import { defaultState } from '@/store/user/initState'


export type UserActions = | StartRegistration

export default function userReducer(state = defaultState, action: UserActions) {
	switch (action.type) {
		case USER_TYPES.REGISTRATION: {
			return state
		}

		default:
			return state
	}
}
