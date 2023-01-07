import { Action } from 'redux'

export enum COLUMN_TYPES {
	ADD_NEW_COLUMN = 'ADD_NEW_COLUMN',
	DELETE_COLUMN = 'DELETE_COLUMN',
}
export interface AddNewColumn extends Action<COLUMN_TYPES.ADD_NEW_COLUMN> {
	payload: Column
}
export interface DeleteColumn extends Action<COLUMN_TYPES.DELETE_COLUMN> {
	payload: Column[]
}

export interface Column{
	header: string
	cards: string[]
	sortArr: number[],
	boardId: string,
	_id: string
}
