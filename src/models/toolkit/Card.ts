import { CheckList } from '@/models/CheckList'

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
	cardInfo?: any
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

