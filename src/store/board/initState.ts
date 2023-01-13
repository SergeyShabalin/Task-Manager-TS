import { BoardState } from '@/models/Boards'

export const defaultState: BoardState = {
	currentBoard:  {
		title: "",
		columns: []
	},
	isLoading: false,
	isError: true,
	allCards: {},
	allColumns: {}
}
