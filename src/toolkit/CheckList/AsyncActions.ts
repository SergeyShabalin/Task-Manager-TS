import { Dispatch } from 'redux'
import CheckListApi from '@/api/CheckListApi'
import { Notification } from '@UI'
import { PayloadForAddTask } from '@/models/toolkit/CheckList'
import { addNewTask, changeCard } from '@/toolkit/card/Reducer'


export const CheckListActions = {
	addNewTask: (payload: PayloadForAddTask) => async (dispatch: Dispatch) => {
		try {
			const { data } = await CheckListApi.addNewTask(payload)
			console.log(data)
			dispatch(addNewTask(data.task))
			dispatch(changeCard(data.card))
		} catch (e) {
			Notification.error('Произошла ошибка получения досок')
		}
	}
}
