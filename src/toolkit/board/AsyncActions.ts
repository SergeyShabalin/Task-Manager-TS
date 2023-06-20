import { Dispatch } from 'redux'
import { BoardActions } from '@/store/board/reducer'

import BoardApi from '@/api/BoardApi'
import { Notification } from '@UI'
import {
	finishLoadingBoards,
	getAllBoards,
	startFetching,
	startLoadingBoards,
	successFetching
} from '@/toolkit/board/Reducer'
import { BoardAC } from '@/store/board/action'


export const boardActions = {
	getAllBoard: (payload: string) => async (dispatch: Dispatch) => {
		try {
			dispatch(startLoadingBoards())
			const { data } = await BoardApi.getAllBoardAPI(payload)
			dispatch(finishLoadingBoards())
			dispatch(getAllBoards(data))
		} catch (e) {
			Notification.error('Произошла ошибка получения досок')
		}
	},
	getCurrentBoard: (boardId: string) => async (dispatch: Dispatch) => {
		try {
			dispatch(startFetching())
			const { data } = await BoardApi.getBoard(boardId)
			console.log(data)
			dispatch(successFetching(data))
		} catch (error) {
			Notification.error('Произошла ошибка открытия доски')
			dispatch(BoardAC.errorFetching())
		}
	}
}
