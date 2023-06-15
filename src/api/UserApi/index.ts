import { AxiosResponse } from 'axios'
import { User } from '@/models/toolkit/Users'
import { Api } from '@/api'

class UserApi {
	async loginCheck(): Promise<AxiosResponse<User>> {
		return Api.get(`/user/checkLogin/`)
	}

}

export default new UserApi()