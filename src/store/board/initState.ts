import { BoardState } from '@/models/Boards'

export const defaultState: BoardState = {
	currentBoard: {
		_id: '',
		title: '',
		columns: []
	},
	isLoading: false,
	isError: true,
	allCards: {},
	allColumns: {},
	allBoards: [],
	cardInfo: {
		_id: '',
		checkList: [],
		title: '',
		description: '',
		decisionDate: new Date(),
		order: 0,
		column_id: '',
		countTask: 0,
		doneTask: 0
	},
	allUsers: []
}
