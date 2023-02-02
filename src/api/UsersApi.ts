import { AxiosResponse } from 'axios/index'
import { User } from '@/models/Users'
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

}

export default new UsersApi()