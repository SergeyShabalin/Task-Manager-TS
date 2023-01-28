import { AxiosResponse } from 'axios/index'
import { User } from '@/models/Users'
import { Api } from '@/api/index'

class UsersApi {

	async registration(payload: User): Promise<AxiosResponse<User>> {
		return Api.post(`/registration`, payload);
	}
}

export default new UsersApi()