import { CheckList } from '@/models/CheckList'
import { Action } from 'redux'

export interface Card{
	_id: string
	header: string
	description: string
	column_id: string
	decisionDate: Date
	countTask: number
	doneTask: number
	order: number
	checkList: CheckList[]
}

export enum CARD_TYPES {
	ADD_NEW_CARD = 'ADD_NEW_CARD',
	DELETE_CARD = 'DELETE_CARD'
}

export interface AddNewCard extends Action<CARD_TYPES.ADD_NEW_CARD> {
	payload: Card
}


export interface DeleteCard extends Action<CARD_TYPES.DELETE_CARD>{
	payload: Card[]
}