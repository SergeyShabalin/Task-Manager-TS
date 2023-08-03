import { Api } from '../index'
import { AxiosResponse } from 'axios'
import { PayloadForAddTask } from '@/models/toolkit/CheckList'


class CheckListApi {
	async addNewTask(payload: PayloadForAddTask): Promise<AxiosResponse> {
		return Api.post(`/checklist/`, payload)
	}
}

export default new CheckListApi()
