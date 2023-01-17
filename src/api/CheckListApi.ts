import {Api} from './index';
import { AxiosResponse } from 'axios'
import { CheckList, PayloadForChangedTask } from '@/models/CheckList'

 class CheckListApi {
	async addNewTaskAPI(cardId: string, task: string):Promise<AxiosResponse<CheckList>> {
		return Api.post(`/checklist/`, { task: task, cardId: cardId } );
	}

	 async updateTaskAPI(payload: PayloadForChangedTask): Promise<AxiosResponse<CheckList>> {
	 	return Api.patch(`/checklist/${payload._id}`, { task: payload.task, done: payload.done, cardId: payload.cardId });
	 }

	// async deleteTaskAPI(cardId, checkListId) {
	// 	return Api.delete(`/checklist/${cardId}/${checkListId}`);
	// }
	//

	//
	// async updateValueTaskAPI(taskDone, checkListId, cardId) {
	// 	return Api.patch(`/checklist/value/${checkListId}`, { done: taskDone, cardId });
	// }

 }

 export default new CheckListApi();