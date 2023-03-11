import { Action } from 'redux'
import { Card } from '@/models/Cards'

export enum CHECKLIST_TYPES {
	ADD_NEW_TASK = 'ADD_NEW_TASK',
	CHANGE_TASK = 'CHANGE_TASK',
	DELETE_TASK = 'DELETE_TASK'
}

export interface CheckList {
	_id: string
	task: string
	done: boolean
	cardId: string
}

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

export interface AddNewTask extends Action<CHECKLIST_TYPES.ADD_NEW_TASK> {
	payload: CheckList
}

export interface ChangeTask extends Action<CHECKLIST_TYPES.CHANGE_TASK> {
	payload: PayloadForChangedTask[]
}

export interface DeleteTask extends Action<CHECKLIST_TYPES.DELETE_TASK> {
	payload: CheckList[]
}
