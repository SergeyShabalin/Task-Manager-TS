import { CheckList } from '@/models/CheckList'
import { User } from '@/models/toolkit/User'

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
	memberIds: string[]
}

export interface PayloadForAddCard {
	title: string
	column_id: string
}

export interface PayloadForDeleteCard {
	newCardIds: string[]
	card_id: string
}

export interface PayloadForDragDropCard {
	currentColumnId: string
	currentCardId: string
	targetColumnId: string
	targetCardId?: string
}

export interface CardState {
	cardInfo: Card
	usersOneCard: Partial<User>[]
	isLoading: boolean
}