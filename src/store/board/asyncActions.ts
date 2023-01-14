import BoardApi from '@/api/BoardApi'
import { BoardAC, CardAC, ColumnAC } from './action'
import { Dispatch } from 'redux'
import { BoardActions } from '@/store/board/reducer'
import ColumnsApi from '@/api/ColumnsApi'
import CardsApi from '@/api/CardsApi'
import { PayloadForDeleteColumn } from '@/models/Columns'
import { Card, PayloadForChangeCard, PayloadForDeleteCard } from '@/models/Cards'

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
				return true
			} catch (e) {
				console.log(e)
				return false
			}
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
		},

	changeColumn:
		(columnId: string, title: string) =>
		async (dispatch: Dispatch<BoardActions>): Promise<any> => {
			try {
				const { data } = await ColumnsApi.changeColumn(columnId, title)
				data.title = data.header
				dispatch(ColumnAC.change(data))
				return true
			} catch (e) {
				console.log(e)
				return false
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
				return true
			} catch (e) {
				console.log(e)
				return false
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
				const payload: PayloadForDeleteCard = {
					newCardIds,
					cardId
				}
				dispatch(CardAC.delete(payload))
			} catch (e) {
				console.log(e)
			}
		},

	changeCardOne:
		(payload: PayloadForChangeCard) =>
		async (dispatch: Dispatch<BoardActions>): Promise<boolean> => {
			try {
				const { data } = await CardsApi.changeCard(payload)
				dispatch(CardAC.changeCard(data))
				return true
			} catch (e) {
				console.log(e)
				return false
			}
		},

	getOneCard: (cardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.getCardInfo(cardId)
			console.log(data)
			dispatch(CardAC.getCardInfo(data))
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
