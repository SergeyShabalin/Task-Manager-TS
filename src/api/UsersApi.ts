import { AxiosResponse } from 'axios/index'
import { PayloadForApplyInvite, PayloadForDeleteMessage, PayloadForShareBoard, User } from '@/models/Users'
import { Api } from '@/api/index'

class UsersApi {

	async registration(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/registration/`, payload);
	}

	async login(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/login/`, payload);
	}

	async loginCheck(): Promise<AxiosResponse<User>> {
		return Api.get(`/user/checkLogin/`);
	}

	async shareBoard(payload: PayloadForShareBoard): Promise<AxiosResponse<User>>{
		return Api.post('/user/shareBoard/', payload)
	}

	async applyInvite(payload: PayloadForApplyInvite): Promise<AxiosResponse<User>>{
		return Api.post('/user/applyInvite/', payload)
	}

	async deleteMessage(payload: PayloadForDeleteMessage): Promise<AxiosResponse<User>>{
		return Api.patch('/user/deleteMessage/', payload)
	}

}

export default new UsersApi()