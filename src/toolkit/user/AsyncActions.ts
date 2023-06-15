import { Dispatch } from 'redux'
import { UserActions } from '@/store/user/reducer'
import { User } from '@/models/Users'
import UserApi from '@/api/UserApi'
import { UserAC } from '@/store/user/action'
import { Notification } from '@UI'


export const userActions = {

	checkLogin: () => async (dispatch: Dispatch<UserActions>) => {
		let payload: Partial<{ user: User | null; isAuth: boolean }> = {
			user: null,
			isAuth: false
		}
		try {
			const token = localStorage.getItem('token')
			if (token) {
				const { data } = await UserApi.loginCheck()
				payload = data
			}
			console.log(payload)
			// dispatch(UserAC.checkLogin(payload))
		} catch (e) {
			Notification.error('произошла ошибка проверки аккаунта')
		}
	},
}

