import { CardState } from '@/models/toolkit/Card'


export const defaultState: CardState = {
	cardInfo: {
		_id: '',
		title: '',
		description: '',
		column_id: '',
		decisionDate: null,
		countTask: 0,
		doneTask: 0,
		order: 0,
		checkList: [],
		memberIds: [],
	},
	usersOneCard: [],
	isLoading: false
}