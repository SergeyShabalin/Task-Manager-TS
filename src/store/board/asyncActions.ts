import BoardApi from '@/api/BoardApi'
import { BoardAC, CardAC, ColumnAC } from './action'
import { Dispatch } from 'redux'
import { BoardActions } from '@/store/board/reducer'
import ColumnsApi from '@/api/ColumnsApi'

import { Column, PayloadForDeleteColumn } from '@/models/Columns'
import CardsApi from '@/api/CardsApi'
import { ChangeTitleCard, PayloadForChangeCard, PayloadForDeleteCard } from '@/models/Cards'

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
				const allColumnIds = board?.currentBoard?.columns
				const newColumns: string[] = allColumnIds?.filter((id: string) => id !== columnId)
				const payload: PayloadForDeleteColumn = {
					newColumns,
					columnId
				}
				dispatch(ColumnAC.delete(payload))
			} catch (e) {
				console.log(e)
			}
		}
}

export const cardActions = {
	addNewCard:
		(columnId: string, title: string) =>
		async (dispatch: Dispatch<BoardActions>): Promise<any> => {
			try {
				const { data } = await CardsApi.addNewCardAPI(columnId, title)
				dispatch(CardAC.new(data))
			} catch (e) {
				console.log(e)
			}
		},

	deleteCard:
		(cardId: string) =>
		async (dispatch: Dispatch<BoardActions>, getState: any): Promise<any> => {
			try {
				await CardsApi.deleteCardAPI(cardId)
				const { board } = getState()
				const columnId = board.allCards[cardId].column_id
				const currentColumn = board.allColumns[columnId]
				//TODO id потому что getState не типизирован
				const newCardIds = currentColumn.cards.filter(id => id !== cardId)
				const payload: PayloadForDeleteCard  = {
					newCardIds,
					cardId
				}
				dispatch(CardAC.delete(payload))

			} catch (e) {
				console.log(e)
			}
		},

		changeCard: (payload: ChangeTitleCard) =>
			async (dispatch: Dispatch<BoardActions>): Promise<any>=>{
		try {
			await CardsApi.changeCard(payload)
			console.log(payload)
			// const payload = {
			// 	cardId,
			// 	title
			// }
			// dispatch(CardAC.change(payload))
		} catch (e){
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


