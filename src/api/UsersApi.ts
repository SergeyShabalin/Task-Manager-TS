import { AxiosResponse } from 'axios'
import {
	PayloadForApplyInvite, payloadForChangePassword, payloadForChangePersonalInfo,
	PayloadForMessageDelete,
	PayloadForShareBoard,
	User
} from '@/models/Users'
import { Api } from '@/api/index'

class UsersApi {
	async registration(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/registration/`, payload)
	}

	async login(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/login/`, payload)
	}

	async loginCheck(): Promise<AxiosResponse<User>> {
		return Api.get(`/user/checkLogin/`)
	}

	async shareBoard(payload: PayloadForShareBoard): Promise<AxiosResponse<User>> {
		return Api.post('/user/shareBoard/', payload)
	}

	async applyInvite(payload: PayloadForApplyInvite): Promise<AxiosResponse<User>> {
		return Api.post('/user/applyInvite/', payload)
	}

	async deleteMessage(payload: PayloadForMessageDelete): Promise<AxiosResponse<User>> {
		return Api.patch('/user/deleteMessage/', payload)
	}

	async getUsersOneBoard(boardId: string): Promise<AxiosResponse<User>> {
		return Api.post('/user/oneBoard/', { boardId })
	}

	async boardDelete(boardId: string, userId: string): Promise<AxiosResponse<User>> {
		return Api.patch('/user/deleteBoard/', { boardId, userId })
	}

	async changeUser(payload: Partial<User> | payloadForChangePassword): Promise<AxiosResponse<User>> {
		return Api.patch('/user/changeUser/', payload)
	}

	async changeBackgroundUser(payload: FormData): Promise<AxiosResponse<User>> {
		return Api.post('/user/sendIMG/', payload)
	}

	async changeAvatarUser(payload: FormData): Promise<AxiosResponse<User>> {
		return Api.post('/user/sendAvatar/', payload)
	}

	async changePersonalInfo(payload: payloadForChangePersonalInfo): Promise<AxiosResponse<User>> {
		return Api.post('/user/changePersonalInfo/', payload)
	}

	async getUserInfo(userId: string): Promise<AxiosResponse<User>> {
		return Api.get(`/user/getUserInfo/${userId}`)
	}

}

export default new UsersApi()
