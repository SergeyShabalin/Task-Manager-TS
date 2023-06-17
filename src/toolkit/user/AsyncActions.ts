import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UserApi from '@/api/UserApi'
import { checkLogin, login, registration, logout } from '@/toolkit/user/Reducer'
import { Notification } from '@UI'

import { AxiosError } from 'axios/'
import { User } from '@/models/toolkit/Users'
import { defaultState as userState } from '@/toolkit/user/InitState'
import { BoardActions } from '@/store/board/reducer'


export const userActions = {

	checkLogin: () => async (dispatch: Dispatch<UserActions>) => {
		let payload = userState
		try {
			const token = localStorage.getItem('token')
			if (token) {
				const { data } = await UserApi.loginCheck()
				payload = data
			}
			dispatch(checkLogin(payload))
		} catch (e) {
			Notification.error('произошла ошибка проверки аккаунта')
		}
	},

	login: (payload: Partial<User>) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UserApi.login(payload)

			localStorage.setItem('token', data.token)
			localStorage.setItem('userId', data._id)
			console.log(data)
			dispatch(login(data))
			return data._id
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
			return false
		}
	},

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
				const { data } = await UserApi.registration(payload)
				localStorage.setItem('token', data.token)
				localStorage.setItem('userId', data._id)
				dispatch(registration(data))
				return data._id
			}
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
			return false
		}
	},
	logOut: () => async (dispatch: Dispatch<UserActions | BoardActions>) => {
		try {
			localStorage.removeItem('token')
			dispatch(logout())
			// dispatch(BoardAC.logout())
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},
}

