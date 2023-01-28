import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UsersApi from '@/api/UsersApi'
import { User } from '@/models/Users'

export const usersActions = {
	registration:
		(payload: User) => async (dispatch: Dispatch<UserActions>) => {
			try {
				await UsersApi.registration(payload)
			} catch (e) {

			}
		}
}
