import {Api} from './index';
import { AxiosResponse } from 'axios'
import { CheckList } from '@/models/CheckList'

 class CheckListApi {
	async addNewTaskAPI(cardId: string, task: string):Promise<AxiosResponse<CheckList>> {
		return Api.post(`/checklist/`, { task: task, cardId: cardId }, );
	}

	// async deleteTaskAPI(cardId, checkListId) {
	// 	return Api.delete(`/checklist/${cardId}/${checkListId}`);
	// }
	//
	// async updateTaskTitleAPI(taskTitle, checkListId) {
	// 	return Api.patch(`/checklist/title/${checkListId}`, { task: taskTitle });
	// }
	//
	// async updateValueTaskAPI(taskDone, checkListId, cardId) {
	// 	return Api.patch(`/checklist/value/${checkListId}`, { done: taskDone, cardId });
	// }

 }

 export default new CheckListApi();