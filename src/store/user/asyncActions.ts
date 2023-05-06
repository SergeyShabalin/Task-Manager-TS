import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UsersApi from '@/api/UsersApi'
import {
	message,
	PayloadForApplyInvite,
	PayloadForMessageDelete,
	PayloadForShareBoard, ShareBoardMessages,
	User
} from '@/models/Users'
import { Notification } from '@UI'
import { UserAC } from '@/store/user/action'
import { BoardActions } from '@/store/board/reducer'
import { BoardAC } from '@/store/board/action'
import { AxiosError } from 'axios'

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
		try {
			const { data } = await UsersApi.loginCheck()
			dispatch(UserAC.checkLogin(data))
			return data._id
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
	shareBoard: (payload: message[]) => async (dispatch: Dispatch<UserActions>) => {
		try {
			dispatch(UserAC.shareBoard(payload))
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
	}
}
