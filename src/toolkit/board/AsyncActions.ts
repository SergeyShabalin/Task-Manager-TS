import { Dispatch } from 'redux'
import { BoardActions } from '@/store/board/reducer'

import BoardApi from '@/api/BoardApi'
import { Notification } from '@UI'
import {
	changeBoard,
	finishLoadingBoards,
	getAllBoards,
	startFetching,
	startLoadingBoards,
	successFetching
} from '@/toolkit/board/Reducer'
import { BoardAC } from '@/store/board/action'
import { payloadForChangeBoard } from '@/models/toolkit/Board'


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
			//TODO вызвать вместо сокетов
			dispatch(startFetching())
			const { data } = await BoardApi.getBoard(boardId)
			dispatch(successFetching(data))
		} catch (error) {
			Notification.error('Произошла ошибка открытия доски')
			dispatch(BoardAC.errorFetching())
		}
	},
	changeBoard: (payload: payloadForChangeBoard) => async (dispatch: Dispatch) => {
		try {
			const { data } = await BoardApi.change(payload)
			dispatch(changeBoard(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения доски')
		}
	}
}
