import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'

import UsersApi from '@/api/UsersApi'
import { User } from '@/models/Users'
import { Notification } from '@UI'
import { UserAC } from '@/store/user/action'

export const usersActions = {
	registration:
		(payload: Partial<User>) => async (dispatch: Dispatch<UserActions>) => {
			try {
				if (payload.email === '' || payload.password === '' || payload.firstName === '' || payload.secondName === '') {
					Notification.error('заполните все поля')
				} else {
				const { data } =	await UsersApi.registration(payload)
					const dataUser = data._doc
					console.log(dataUser)
					 localStorage.setItem('token', data.token);
					  dispatch(UserAC.registration(dataUser.boardIds))
				}
			} catch (e) {
				const error = e.response.data.message
				Notification.error(error)
			}
		},

		checkLogin:
			() => async (dispatch: Dispatch<UserActions>) =>{
		try {
			const token = localStorage.getItem('token')
			if(token) dispatch(UserAC.checkLogin(true))
		} catch(e){

		}
			}
}
