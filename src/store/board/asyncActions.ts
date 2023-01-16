import { Dispatch } from 'redux'

import { BoardAC, CardAC, ChecklistAC, ColumnAC } from './action'
import BoardApi from '@/api/BoardApi'
import ColumnsApi from '@/api/ColumnsApi'
import CardsApi from '@/api/CardsApi'
import { BoardActions } from '@/store/board/reducer'
import { PayloadForDeleteColumn } from '@/models/Columns'
import { PayloadForChangeCard, PayloadForDeleteCard } from '@/models/Cards'
import { Notification } from '@UI'
import { RootState } from '@/store'
import CheckListApi from '@/api/CheckListApi'

export const columnsActions = {
	addNewColumn:
		(title: string) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				const { board } = getState()
				const { data } = await ColumnsApi.addNewColumnAPI(title, board.currentBoard._id)
				const newColumn = {
					title: title,
					_id: data._id,
					cards: [],
					sortArr: [],
					boardId: data.boardId
				}
				dispatch(ColumnAC.addColumnAC(newColumn))
				return true
			} catch (e) {
				Notification.error('Произошла ошибка добавления колонки')
				return false
			}
		},

	deleteColumn:
		(columnId: string) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				await ColumnsApi.deleteColumnAPI(columnId)
				const { board } = getState()
				const allColumnIds = board?.currentBoard?.columns
				const newColumns: string[] = allColumnIds?.filter((id: string) => id !== columnId)
				const payload: PayloadForDeleteColumn = {
					newColumns,
					columnId
				}
				dispatch(ColumnAC.deleteColumnAC(payload))
			} catch (e) {
				Notification.error('Произошла ошибка удаления колонки')
			}
		},

	changeColumn: (columnId: string, title: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await ColumnsApi.changeColumnAPI(columnId, title)
			dispatch(ColumnAC.changeColumnAC(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения колонки')
			return false
		}
	}
}

export const cardActions = {
	addNewCard: (columnId: string, title: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.addNewCardAPI(columnId, title)
			dispatch(CardAC.newCardAC(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка добавления карточки')
			return false
		}
	},

	deleteCard:
		(cardId: string) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				await CardsApi.deleteCardAPI(cardId)
				const { board } = getState()
				const columnId = board.allCards[cardId].column_id
				const currentColumn = board.allColumns[columnId]
				const newCardIds = currentColumn.cards.filter(id => id !== cardId)
				const payload: PayloadForDeleteCard = {
					newCardIds,
					cardId
				}
				dispatch(CardAC.deleteCardAC(payload))
			} catch (e) {
				Notification.error('Произошла ошибка удаления карточки')
			}
		},

	changeCardOne: (payload: PayloadForChangeCard) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.changeCardAPI(payload)
			dispatch(CardAC.changeCardCardAC(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения карточки')
			return false
		}
	},

	getOneCard: (cardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.getCardInfoAPI(cardId)
			dispatch(CardAC.getCardInfoCardAC(data))
		} catch (e) {
			Notification.error('Произошла ошибка получения данных о карточке')
		}
	}
}

export const boardActions = {
	getCurrentBoard: (boardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(BoardAC.startFetching())
			const resp = await BoardApi.getBoardAPI(boardId)
			dispatch(BoardAC.successFetching(resp.data))
		} catch (error) {
			Notification.error('Произошла ошибка открытия доски')
			dispatch(BoardAC.errorFetching())
		}
	}
}

export const checklistActions = {
	addNewTask: (cardId: string, taskTitle: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const {data} = await CheckListApi.addNewTaskAPI(cardId, taskTitle)
			dispatch(ChecklistAC.addNewTaskAC(data))
			return true
		} catch (error) {
			Notification.error('Произошла ошибка добавления задачи')
			return false
		}
	}
}
