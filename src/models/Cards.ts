import { CheckList } from '@/models/CheckList'
import { Action } from 'redux'
import { User } from '@/models/Users'

export interface Card {
	_id: string
	title: string
	description: string
	column_id: string
	decisionDate: Date | null
	countTask: number
	doneTask: number
	order: number
	checkList: CheckList[]
	memberIds: []

}

export enum CARD_TYPES {
	ADD_NEW_CARD = 'ADD_NEW_CARD',
	DELETE_CARD = 'DELETE_CARD',
	CHANGE_CARD = 'CHANGE_CARD',
	GET_CARD_INFO = 'GET_CARD_INFO',
	CLOSE_CARD = 'CLOSE_CARD',
	GET_USERS_ONE_CARD = 'GET_USERS_ONE_CARD'
}

export type CloseCard = Action<CARD_TYPES.CLOSE_CARD>
export type GetUsersOneCard = Action<CARD_TYPES.GET_USERS_ONE_CARD>

export interface PayloadForDeleteCard {
	newCardIds: string[]
	cardId: string
}

export interface AddNewCard extends Action<CARD_TYPES.ADD_NEW_CARD> {
	payload: Card
}

export interface DeleteCard extends Action<CARD_TYPES.DELETE_CARD> {
	payload: PayloadForDeleteCard
}

export interface ChangeCard extends Action<CARD_TYPES.CHANGE_CARD> {
	payload: Partial<Card>
}

export interface GetCardInfo extends Action<CARD_TYPES.GET_CARD_INFO> {
	payload: {
		cardInfo: Partial<Card>
		usersOneCard: User[]
	}
}

export interface getUsersOneCard extends GetUsersOneCard {
	payload: { [key: string]: Partial<User> }
}
