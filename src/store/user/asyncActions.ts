import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UsersApi from '@/api/UsersApi'
import { User } from '@/models/Users'
import { Notification } from '@UI'
import { UserAC } from '@/store/user/action'

export const usersActions = {
	registration: (payload: Partial<User>) => async (dispatch: Dispatch<UserActions>) => {
		try {
			if (
				payload.email === '' ||
				payload.password === '' ||
				payload.firstName === '' ||
				payload.secondName === ''
			) {
				Notification.error('заполните все поля')
			} else {
				const { data } = await UsersApi.registration(payload)
				const dataUser = data._doc
				localStorage.setItem('token', data.token)
				dispatch(UserAC.registration(dataUser))
				return data._doc._id
			}
		} catch (e) {
			const error = e.response.data.message
			Notification.error(error)
			return false
		}
	},

	checkLogin: (userId: string) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.loginCheck(userId)
			dispatch(UserAC.checkLogin(true))
		} catch (e) {
			Notification.error('произошла ошибка проверки аккаунта')
		}
	},

	login: (payload: Partial<User>) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.login(payload)
			const dataUser = data._doc
			localStorage.setItem('token', data.token)
			dispatch(UserAC.login(dataUser))
			return data._doc._id
		} catch (e) {
			const error = e.response.data.message
			Notification.error(error)
			return false
		}
	}


}
