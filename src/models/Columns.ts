import { Action } from 'redux'

export enum COLUMN_TYPES {
	ADD_NEW_COLUMN = 'ADD_NEW_COLUMN',
	DELETE_COLUMN = 'DELETE_COLUMN',
	CHANGE_COLUMN = 'CHANGE_COLUMN',
	DROP_CARD = 'DROP_CARD'
}
export interface AddNewColumn extends Action<COLUMN_TYPES.ADD_NEW_COLUMN> {
	payload: Column
}

export interface PayloadForDeleteColumn {
	newColumns: string[]
	columnId: string
}

export interface PayloadForChangeColumn {
	_id: string
	title: string
}
export interface PayloadForDropCard {
	currentColumnId: string
	currentCardId: string
	targetColumnId: string
	targetCardId: string
}

export interface DropCard extends Action<COLUMN_TYPES.DROP_CARD> {
	payload: PayloadForDropCard
}

export interface DeleteColumn extends Action<COLUMN_TYPES.DELETE_COLUMN> {
	payload: PayloadForDeleteColumn
}
export interface ChangeColumn extends Action<COLUMN_TYPES.CHANGE_COLUMN> {
	payload: PayloadForChangeColumn
}

export interface Column {
	title: string
	cards: string[]
	sortArr: number[]
	boardId: string
	_id: string
}
