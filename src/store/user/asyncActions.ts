import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UsersApi from '@/api/UsersApi'
import { User } from '@/models/Users'
import { Notification } from '@UI'

export const usersActions = {
	registration:
		(payload: Partial<User>) => async (dispatch: Dispatch<UserActions>) => {
			try {
		const res =		 await UsersApi.registration(payload)
				console.log(res.data)
			} catch (e) {
				const error = e.response.data.message
				Notification.error(error)

			}
		}
}
