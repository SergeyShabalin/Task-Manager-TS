import { Dispatch } from 'redux'
import CheckListApi from '@/api/CheckListApi'
import { Notification } from '@UI'
import { PayloadForAddTask } from '@/models/toolkit/CheckList'
import { addNewTask } from '@/toolkit/card/Reducer'
import { changeCard } from '@/toolkit/board/Reducer'


export const CheckListActions = {
	addNewTask: (payload: PayloadForAddTask) => async (dispatch: Dispatch) => {
		try {
			const { data } = await CheckListApi.addNewTask(payload)
			dispatch(addNewTask(data.task))
			dispatch(changeCard(data.card))
		  return true
		} catch (e) {
			Notification.error('Произошла ошибка добавления задачи')
			return false
		}
	}
}
