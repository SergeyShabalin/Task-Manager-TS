import { defaultState } from './initState'
import { BoardActions, BOARD_TYPES } from '@/models/Boards'
import { Action } from 'redux'

export default function boardReducer(state = defaultState, action: BoardActions) {
	switch (action.type) {
		case BOARD_TYPES.START_FETCHING_BOARD:
			return {
				...state,
				isLoading: true,
				isError: false
			}
		case BOARD_TYPES.SUCCESS_FETCHING_BOARD:
			return {
				...state,
				isLoading: false,
				isError: false,
				currentBoard: action.payload.currentBoard,
				allCards: action.payload.allCards
			}
		case BOARD_TYPES.ERROR_FETCHING_BOARD:
			return {
				...state,
				isLoading: false,
				isError: true,
				currentBoard: {
					title: '',
					columns: []
				},
				allCards: {}
			}

		default:
			return state
	}
}
