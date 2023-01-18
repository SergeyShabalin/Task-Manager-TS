import { Api } from './index'
import { AxiosResponse } from 'axios'
import { CheckList, PayloadForChangedTask, PromiseChecklist } from '@/models/CheckList'

class CheckListApi {
	async addNewTaskAPI(cardId: string, task: string): Promise<AxiosResponse<PromiseChecklist>> {
		return Api.post(`/checklist/`, { task: task, cardId: cardId })
	}

	async updateTaskAPI(payload: PayloadForChangedTask): Promise<AxiosResponse<PromiseChecklist>> {
		return Api.patch(`/checklist/${payload._id}`, { task: payload.task, done: payload.done, cardId: payload.cardId })
	}

	async deleteTaskAPI(cardId: string, checkListId: string): Promise<AxiosResponse<CheckList>> {
		return Api.delete(`/checklist/${cardId}/${checkListId}`)
	}

}

export default new CheckListApi()