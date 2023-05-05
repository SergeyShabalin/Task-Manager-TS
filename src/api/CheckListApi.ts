import { Api } from './index'
import { AxiosResponse } from 'axios'
import { CheckList, PayloadForChangedTask, PromiseChecklist } from '@/models/CheckList'

class CheckListApi {

	async delete(cardId: string, taskId: string): Promise<AxiosResponse<CheckList>> {
		return Api.delete(`/checklist/${cardId}/${taskId}`)
	}
}

export default new CheckListApi()
