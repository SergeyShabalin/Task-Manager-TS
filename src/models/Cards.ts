import { CheckList } from '@/models/CheckList'

export interface Card{
	header: string
	description: string
	column_id: string
	decisionDate: Date
	countTask: number
	doneTask: number
	order: number
	checkList: CheckList[]
}