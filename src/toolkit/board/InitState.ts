
import { BoardState } from '@/models/toolkit/Board'

export const defaultState: BoardState = {
	currentBoard: {
		_id: '',
		title: '',
		background: '',
		columns: [],
		usersOneCard: []
	},
	isLoadingBoard: false,
	isError: true,
	allBoards: [],
	allUsers: [],
	usersOneCard: [],
	allColumns: {},
	allCards: {}
}
