import { Dispatch } from 'redux'

import { BoardAC, CardAC, ChecklistAC, ColumnAC } from './action'
import BoardApi from '@/api/BoardApi'
import ColumnsApi from '@/api/ColumnsApi'
import CardsApi from '@/api/CardsApi'
import { BoardActions } from '@/store/board/reducer'
import { PayloadForDeleteColumn, PayloadForDropCard } from '@/models/Columns'
import { Card, PayloadForDeleteCard } from '@/models/Cards'
import { Notification } from '@UI'
import { RootState } from '@/store'
import CheckListApi from '@/api/CheckListApi'
import { PayloadForChangedTask } from '@/models/CheckList'
import { Board } from '@/models/Boards'

export const columnsActions = {
	addNewColumn:
		(title: string) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				const { board } = getState()
				const { data } = await ColumnsApi.addColumn(title, board.currentBoard._id)
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
				await ColumnsApi.delete(columnId)
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
			const { data } = await ColumnsApi.change(columnId, title)
			dispatch(ColumnAC.changeColumnAC(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения колонки')
			return false
		}
	},

	dragAndDropCard:
		(payload: PayloadForDropCard) =>
		async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				const { targetColumnId, currentCardId, targetCardId } = payload
				const { board } = getState()
				const targetColumn = board.allColumns[targetColumnId]

				if (
					(currentCardId === targetCardId && targetColumn.cards.length !== 0) ||
					(targetCardId === '' && targetColumn.cards.length !== 0)
				) {
				} else {
					await ColumnsApi.dragDropCard(payload)
					dispatch(ColumnAC.dropCard(payload))
				}
			} catch (error) {
				Notification.error('Произошла ошибка переноса карточки')
			}
		}
}

export const cardActions = {
	addNewCard: (columnId: string, title: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.addCard(columnId, title)
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
				await CardsApi.delete(cardId)
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

	changeCard: (payload: Partial<Card>) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.change(payload)
			dispatch(CardAC.changeCardAC(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения карточки')
			return false
		}
	},

	getOneCard: (cardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CardsApi.getCardInfo(cardId)
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
			const resp = await BoardApi.getBoard(boardId)
			dispatch(BoardAC.successFetching(resp.data))
		} catch (error) {
			Notification.error('Произошла ошибка открытия доски')
			dispatch(BoardAC.errorFetching())
		}
	},
	changeBoard: (payload: Partial<Board>) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await BoardApi.change(payload)
			dispatch(BoardAC.changeBoardAC(data))
			return true
		} catch (error) {
			Notification.error('Произошла ошибка изменения доски')
			return false
		}
	},
	addBoard: (payload) => async () => {
		try {
			const { data } = await BoardApi.addBoard(payload)
			return data._id
		} catch (error) {
			return false
		}
	}
}

export const checklistActions = {
	addNewTask: (cardId: string, taskTitle: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			const { data } = await CheckListApi.addTask(cardId, taskTitle)
			dispatch(ChecklistAC.addNewTaskAC(data.task))
			dispatch(CardAC.changeCardAC(data.card))
			return true
		} catch (error) {
			Notification.error('Произошла ошибка добавления задачи')
			return false
		}
	},

	changeTask:
		(payload: PayloadForChangedTask) =>
		async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				const { data } = await CheckListApi.change(payload)
				const { board } = getState()
				const newCheckList = board.cardInfo.checkList.map(task => {
					if (task._id === payload._id) return data.task
					else return task
				})
				dispatch(ChecklistAC.changeTaskAC(newCheckList))
				dispatch(CardAC.changeCardAC(data.card))
				return true
			} catch (error) {
				Notification.error('Произошла ошибка изменения задачи')
				return false
			}
		},

	deleteTask:
		(cardId: string, taskId: string) =>
		async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				const { data } = await CheckListApi.delete(cardId, taskId)
				const { board } = getState()
				const newChecklist = board.cardInfo.checkList.filter(task => task._id !== taskId)
				dispatch(ChecklistAC.deleteTaskAC(newChecklist))
				dispatch(CardAC.changeCardAC(data))
			} catch (error) {
				Notification.error('Произошла ошибка удаления задачи')
				return false
			}
		}
}
