import { Action } from 'redux'


export enum CHECKLIST_TYPES {
	ADD_NEW_TASK = 'ADD_NEW_TASK',
	CHANGE_TASK = 'CHANGE_TASK'
}

export interface CheckList{
	_id: string
	task: string
	done: boolean
	cardId: string
}

export interface PayloadForChangedTask{
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