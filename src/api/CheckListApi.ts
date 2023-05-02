import { Api } from './index'
import { AxiosResponse } from 'axios'
import { CheckList, PayloadForChangedTask, PromiseChecklist } from '@/models/CheckList'

class CheckListApi {
	async addTask(cardId: string, task: string): Promise<AxiosResponse<PromiseChecklist>> {
		return Api.post(`/checklist/`, { task: task, cardId: cardId })
	}

	// async change(payload: PayloadForChangedTask): Promise<AxiosResponse<PromiseChecklist>> {
	// 	// return Api.patch(`/checklist/${payload._id}`, {
	// 	// 	task: payload.task,
	// 	// 	done: payload.done,
	// 	// 	cardId: payload.cardId
	// 	// })
	// }

	async delete(cardId: string, taskId: string): Promise<AxiosResponse<CheckList>> {
		return Api.delete(`/checklist/${cardId}/${taskId}`)
	}
}

export default new CheckListApi()
