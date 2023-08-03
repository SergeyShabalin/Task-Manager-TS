import { Dispatch } from 'redux'

import { BoardAC, CardAC, ChecklistAC, ColumnAC } from './action'
import { UserAC } from '@/store/user/action'
import BoardApi from '@/api/BoardApi'

import UsersApi from '@/api/UsersApi'
import { BoardActions } from '@/store/board/reducer'

import { Card, payloadForSearchUser } from '@/models/Cards'
import { Notification } from '@UI'
import { RootState } from '@/store'
import { ChangeTaskData, CheckList, payloadForDeleteTask, PromiseChecklist } from '@/models/CheckList'
import { Board } from '@/models/Boards'
import { UserActions } from '@/store/user/reducer'



export const cardActions = {

	changeCard: (payload: Partial<Card>) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(CardAC.changeCardAC(payload))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка изменения карточки')
			return false
		}
	},


	searchUser: (payload: payloadForSearchUser) => async (dispatch: Dispatch<UserActions>) => {
		try {
			const { data } = await UsersApi.searchUser(payload)
			dispatch(CardAC.applySearchUser(data))
		} catch (e) {
			Notification.error('Произошла ошибка поиска участников')
		}
	},

	changeViewUserOneCard: (payload: string) => (dispatch: Dispatch<UserActions>, getState: () => RootState) => {
		try {
			const { board } = getState()
			const memberIds: string[] = board.cardInfo.memberIds

			let newMemberIds

			if (memberIds.includes(payload)) {
				newMemberIds = memberIds.filter(id => id !== payload)
			} else {
				newMemberIds = [...memberIds, payload]
			}
			dispatch(CardAC.changeViewUserOneCard(newMemberIds))
		} catch (e) {

		}
	}
}

export const boardActions = {

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

	openShowDoneTasks: (payload: boolean, checklist: CheckList[]) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
		try {
			const { board } = getState()
			const originalChecklist = checklist.slice() // Создаем поверхностную копию исходного checklist
			if (!payload) {
				const tasks = originalChecklist.filter(task => !task.done)
				dispatch(ChecklistAC.hideDoneTask(tasks))
			} else {
				const { data } = await CardsApi.getCardInfo(board.cardInfo._id)
				dispatch(ChecklistAC.hideDoneTask(data.cardInfo.checkList))
			}


		} catch (e) {
			Notification.error('Произошла ошибка скрытия выполненных задач')
		}
	}
}
