import { Action } from 'redux'
import { Card } from '@/models/Cards'

export enum CHECKLIST_TYPES {

	CHANGE_TASK = 'CHANGE_TASK',
	DELETE_TASK = 'DELETE_TASK',
	HIDE_DONE_TASKS = 'HIDE_DONE_TASKS'
}

// export interface CheckList {
// 	_id: string
// 	task: string
// 	done: boolean
// 	cardId: string
// }

export interface PromiseChecklist {
	card: Card
	task: CheckList
}

export interface PayloadForChangedTask {
	_id: string
	task?: string
	done?: boolean
	cardId: string

}

export interface ChangeTaskData{
	_id: string
	card: Card
	task: CheckList
	boardId: string
}

export interface payloadForDeleteTask{
	card: Card
	boardId? : string
	taskId: string
}



export interface ChangeTask extends Action<CHECKLIST_TYPES.CHANGE_TASK> {
	payload: PayloadForChangedTask[]
}

export interface DeleteTask extends Action<CHECKLIST_TYPES.DELETE_TASK> {
	payload: CheckList[]
}

export interface HideDoneTasks extends Action<CHECKLIST_TYPES.HIDE_DONE_TASKS> {
payload?: CheckList[]
}
