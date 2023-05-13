import { Dispatch } from 'redux'

import { BoardAC, CardAC, ChecklistAC, ColumnAC } from './action'
import { UserAC } from '@/store/user/action'
import BoardApi from '@/api/BoardApi'
import CardsApi from '@/api/CardsApi'
import UsersApi from '@/api/UsersApi'
import { BoardActions } from '@/store/board/reducer'
import { Column, PayloadForDeleteColumn, PayloadForDropCard } from '@/models/Columns'
import { Card, PayloadForDeleteCard } from '@/models/Cards'
import { Notification } from '@UI'
import { RootState } from '@/store'
import { ChangeTaskData, PayloadForChangedTask, payloadForDeleteTask, PromiseChecklist } from '@/models/CheckList'
import { Board } from '@/models/Boards'
import { UserActions } from '@/store/user/reducer'


export const columnsActions = {

	addNewColumn:
		(data: Column) => async (dispatch: Dispatch<BoardActions>) => {
			try {
				const newColumn = {
					title: data.title,
					_id: data._id,
					cards: [],
					sortArr: [],
					boardId: data.boardId
				}
				dispatch(ColumnAC.addColumnAC(newColumn))
			} catch (e) {
				Notification.error('Произошла ошибка добавления колонки')
				return false
			}
		},
	deleteColumn:
		(data: PayloadForDeleteColumn) => async (dispatch: Dispatch<BoardActions>) => {
			try {
				const payload: PayloadForDeleteColumn = {
					columnIds: data.columnIds,
					columnId: data.columnId
				}
				dispatch(ColumnAC.deleteColumnAC(payload))
			} catch (e) {
				Notification.error('Произошла ошибка удаления колонки')
			}
		},

	changeColumn: (data: Column) => async (dispatch: Dispatch<BoardActions>) => {
		try {
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
						(currentCardId === targetCardId && targetColumn.cards.length !== 0) || //перенос в пределах одной колонки
						(targetCardId === '' && targetColumn.cards.length !== 0) //перенос в пустую колонку
					) {
					} else {

						// await ColumnsApi.dragDropCard(payload)
						dispatch(ColumnAC.dropCard(payload))
					}
				} catch (error) {
					Notification.error('Произошла ошибка переноса карточки')
				}
			}
}

export const cardActions = {
	addNewCard: (newCard: Card) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(CardAC.newCardAC(newCard))
		} catch (e) {
			Notification.error('Произошла ошибка добавления карточки')
			return false
		}
	},
	deleteCard:
		(cardId: string) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
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
			dispatch(CardAC.changeCardAC(payload))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения карточки')
			return false
		}
	},
	getOneCard: (cardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(BoardAC.startLoadingCard())
			const { data } = await CardsApi.getCardInfo(cardId)
			dispatch(BoardAC.finishLoadingCard())
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
	changeBoard: (data: Board) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(BoardAC.changeBoardAC(data))
			return true
		} catch (error) {
			Notification.error('Произошла ошибка изменения доски')
			return false
		}
	},
	addBoard: (payload: Partial<Board>) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await BoardApi.addBoard(payload)
			dispatch(UserAC.addBoard(data._id))
			return data._id
		} catch (error) {
			return false
		}
	},
	getAllBoard: (payload: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(BoardAC.startLoadingBoard())
			const { data } = await BoardApi.getAllBoardAPI(payload)
			dispatch(BoardAC.finishLoadingBoard())
			dispatch(BoardAC.getAllBoard(data))
		} catch (e) {
			Notification.error('Произошла ошибка получения досок')
		}
	},
	backToGreeting: (boardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(BoardAC.backToGreeting())
		} catch (e) {
			Notification.error('Произошла ошибка получения досок')
		}
	},
	closeCard: () => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(CardAC.closeCard())
		} catch (e) {
			Notification.error('Произошла ошибка закрытия карточки')
		}
	}
}

export const checklistActions = {
	addNewTask: (data: PromiseChecklist) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(ChecklistAC.addNewTaskAC(data.task))
			dispatch(CardAC.changeCardAC(data.card))
			return true
		} catch (error) {
			Notification.error('Произошла ошибка добавления задачи')
			return false
		}
	},
	changeTask: (payload: ChangeTaskData) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
		try {
			const { board } = getState()
			const newCheckList = board.cardInfo.checkList.map(task => {
				if (task._id === payload.task._id) return payload.task
				else return task
			})
			dispatch(ChecklistAC.changeTaskAC(newCheckList))
			dispatch(CardAC.changeCardAC(payload.card))
			return true
		} catch (error) {
			Notification.error('Произошла ошибка изменения задачи')
			return false
		}
	},
	deleteTask:
		(payload: payloadForDeleteTask) =>
			async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
				try {
					const { board } = getState()
					const newChecklist = board.cardInfo.checkList.filter(task => task._id !== payload.taskId)
					dispatch(ChecklistAC.deleteTaskAC(newChecklist))
					dispatch(CardAC.changeCardAC(payload.card))
				} catch (error) {
					Notification.error('Произошла ошибка удаления задачи')
					return false
				}
			},
	deleteBoard:
		(boardId: string, userId: string) =>
			async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
				try {
					await UsersApi.boardDelete(boardId, userId)
					const { board } = getState()
					const newBoards = board.allBoards.filter(board => board._id !== boardId)
					dispatch(BoardAC.deleteBoard(newBoards))
				} catch (error) {
					Notification.error('Произошла ошибка удаления доски')
				}
			},

	dragDropColumn:
		(allColumns: string[] ) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(BoardAC.dragDropColumn(allColumns))
		} catch (error){
			Notification.error('Произошла ошибка перемещения колонки')
		}
	}
}
