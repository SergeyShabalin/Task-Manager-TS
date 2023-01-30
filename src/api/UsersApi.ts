import { AxiosResponse } from 'axios/index'
import { User } from '@/models/Users'
import { Api } from '@/api/index'

class UsersApi {

	async registration(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/registration/`, payload);
	}

	async login(payload: Partial<User>): Promise<AxiosResponse<User>> {
		return Api.post(`/user/registration/`, payload);
	}
}

export default new UsersApi()