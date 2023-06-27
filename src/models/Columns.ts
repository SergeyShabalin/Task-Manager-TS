import { Action } from 'redux'

export enum COLUMN_TYPES {
	CHANGE_COLUMN = 'CHANGE_COLUMN',
	DROP_CARD = 'DROP_CARD'
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

export interface ChangeColumn extends Action<COLUMN_TYPES.CHANGE_COLUMN> {
	payload: PayloadForChangeColumn
}
