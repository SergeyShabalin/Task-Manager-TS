import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UsersApi from '@/api/UsersApi'
import {
	error,
	message,
	PayloadForApplyInvite, payloadForChangePassword, payloadForChangePersonalInfo,
	PayloadForMessageDelete, payloadForShareBoard,
	User
} from '@/models/Users'
import { Notification } from '@UI'
import { UserAC } from '@/store/user/action'
import { BoardActions } from '@/store/board/reducer'
import { BoardAC } from '@/store/board/action'
import { AxiosError } from 'axios'
import { Api } from '@/api'

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
				const dataUser = data
				localStorage.setItem('token', data.token)
				localStorage.setItem('userId', data._id)
				dispatch(UserAC.registration(dataUser))
				return data._id
			}
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
			return false
		}
	},
	checkLogin: () => async (dispatch: Dispatch<UserActions>) => {
		let payload: Partial<{ user: User | null; isAuth: boolean }> = {
			user: null,
			isAuth: false
		}
		try {
			const token = localStorage.getItem('token')
			if (token) {
				const { data } = await UsersApi.loginCheck()
				payload = data
			}
			dispatch(UserAC.checkLogin(payload))
		} catch (e) {
			Notification.error('произошла ошибка проверки аккаунта')
		}
	},
	login: (payload: Partial<User>) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.login(payload)
			localStorage.setItem('token', data.token)
			localStorage.setItem('userId', data._id)
			dispatch(UserAC.login(data))
			return data._id
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
			return false
		}
	},
	logOut: () => async (dispatch: Dispatch<UserActions | BoardActions>) => {
		try {
			localStorage.removeItem('token')
			dispatch(UserAC.logout())
			dispatch(BoardAC.logout())
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},

	shareBoard: (payload: payloadForShareBoard) => async (dispatch: Dispatch<UserActions>) => {
		try {
			if (payload.error) {
				const message = payload.error
				Notification.error(message)
			} else {
				{
					payload.submit && Notification.error(payload.submit, 'submit')
				}
				{
					payload.messages && dispatch(UserAC.shareBoard(payload.messages))
				}
				return true
			}
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},
	getUsersOneBoard: (boardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await UsersApi.getUsersOneBoard(boardId)
			dispatch(BoardAC.getUsersOneBoard(data))
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},
	applyInvite:
		(payload: PayloadForApplyInvite) => async (dispatch: Dispatch<UserActions | BoardActions>) => {
			try {
				const { data } = await UsersApi.applyInvite(payload)
				dispatch(BoardAC.applyInvite(data))
				return data
			} catch (e) {
				const error = e as AxiosError<any>
				Notification.error(error.response?.data?.message)
			}
		},
	deleteMessage: (payload: PayloadForMessageDelete) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.deleteMessage(payload)
			dispatch(UserAC.deleteMessage(data))
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},

	changeUser: (payload: Partial<User> | payloadForChangePassword) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.changeUser(payload)
			dispatch(UserAC.updateUser(data))
			Notification.error('Данные успешно сохранены', 'submit')
			return true
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},

	changeBackgroundUser: (payload: FormData) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.changeBackgroundUser(payload)
			const payloadForBackground = {
				_id: data._id,
				background: data.background
			}
			dispatch(UserAC.updateBackgroundUser(payloadForBackground))
			Notification.error('Данные успешно сохранены', 'submit')
		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	},

	changePersonalInfo: (payload: payloadForChangePersonalInfo) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.changePersonalInfo(payload)
			localStorage.setItem('token', data.token)
			localStorage.setItem('userId', payload._id)
			console.log(data.token)
			if (data.email) dispatch(UserAC.changePersonalInfo(data.email))
			Notification.error('Данные успешно сохранены', 'submit')

		} catch (e) {
			const error = e as AxiosError<any>
			Notification.error(error.response?.data?.message)
		}
	}
}
