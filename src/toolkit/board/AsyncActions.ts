import { Dispatch } from 'redux'
import { BoardActions } from '@/store/board/reducer'

import BoardApi from '@/api/BoardApi'
import { Notification } from '@UI'
import { getAllBoards } from '@/toolkit/board/Reducer'
import { BoardAC } from '@/store/board/action'


export const boardActions = {
	getAllBoard: (payload: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			// dispatch(BoardAC.startLoadingBoard())
			const { data } = await BoardApi.getAllBoardAPI(payload)
			console.log(data)
			// dispatch(BoardAC.finishLoadingBoard())
			 dispatch(getAllBoards(data))
		} catch (e) {
			Notification.error('Произошла ошибка получения досок')
		}
	},
	getCurrentBoard: (boardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			// dispatch(BoardAC.startFetching())
			const {data} = await BoardApi.getBoard(boardId)
			console.log(data)
			// dispatch(BoardAC.successFetching(resp.data))
		} catch (error) {
			Notification.error('Произошла ошибка открытия доски')
			dispatch(BoardAC.errorFetching())
		}
	},
}
