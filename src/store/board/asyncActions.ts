import BoardApi from '@/api/BoardApi'
import { BoardAC } from './action'
import { Dispatch } from 'redux';
import { BoardActions } from '@/models/Boards'

export const getCurrentBoard = (boardId: string) => async (dispatch: Dispatch<BoardActions>):Promise<any> => {
	try {
		dispatch(BoardAC.startFetching())
		const resp = await BoardApi.getBoardAPI(boardId)
		dispatch(BoardAC.successFetching(resp.data))
	} catch (error) {
		dispatch(BoardAC.errorFetching())
	}
}
