import { AxiosResponse } from 'axios'
import { User } from '@/models/toolkit/User'
import { Api } from '@/api'

class UserApi {
	async loginCheck(): Promise<AxiosResponse<User>> {
		return Api.get(`/user/checkLogin/`)
	}
	async registration(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/registration/`, payload)
	}

	async login(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/login/`, payload)
	}

}

export default new UserApi()