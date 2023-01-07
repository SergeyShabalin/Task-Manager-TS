import BoardApi from '@/api/BoardApi'
import { BoardAC, CardAC, ColumnAC } from './action'
import { Dispatch } from 'redux'
import { BoardActions } from '@/models/Boards'
import ColumnsApi from '@/api/ColumnsApi'

import { Column } from '@/models/Columns'
import CardsApi from '@/api/CardsApi'

//TODO протипизировать getState и Promise

export const columnsActions = {
	addNewColumn:
		(title: string) =>
		async (dispatch: Dispatch<BoardActions>, getState: any): Promise<any> => {
			try {
				const { board } = getState()
				const { data } = await ColumnsApi.addNewColumnAPI(title, board.currentBoard._id)
				const newColumn = {
					header: title,
					_id: data._id,
					cards: [],
					sortArr: [],
					boardId: data.boardId
				}
				dispatch(ColumnAC.new(newColumn))
			} catch {}
		},

	deleteColumn:
		(columnId: string) =>
		async (dispatch: Dispatch<BoardActions>, getState: any): Promise<any> => {
			try {
				await ColumnsApi.deleteColumn(columnId)
				const { board } = getState()
				const allColumns = board?.currentBoard?.columns
				const newColumns = allColumns?.filter((item: Column) => item._id !== columnId)
				dispatch(ColumnAC.delete(newColumns))
			} catch (e) {
				console.log(e)
			}
		}
}

export const cardActions ={
	 addNewCard : (columnId: string, title: string) =>
			async (dispatch: Dispatch<BoardActions>, getState: any): Promise<any> => {
				try {
					const { data } = await CardsApi.addNewCardAPI(columnId, title)
					dispatch(CardAC.new(data))
				} catch (e) {
					console.log(e)
				}
			}
}


export const boardActions = {
	getCurrentBoard:
		(boardId: string) =>
		async (dispatch: Dispatch<BoardActions>): Promise<any> => {
			try {
				dispatch(BoardAC.startFetching())
				const resp = await BoardApi.getBoardAPI(boardId)
				dispatch(BoardAC.successFetching(resp.data))
			} catch (error) {
				dispatch(BoardAC.errorFetching())
			}
		}
}
