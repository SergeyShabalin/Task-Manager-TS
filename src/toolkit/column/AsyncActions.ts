import { Dispatch } from 'redux'
import { Notification } from '@UI'
import { PayloadForAddNewColumn } from '@/models/toolkit/Column'
import ColumnsApi from '@/api/ColumnApi/'
import { addNewColumn } from '@/toolkit/board/Reducer'


export const columnActions = {
	addNewColumn: (payload: PayloadForAddNewColumn) => async (dispatch: Dispatch) => {
		try {
			const { data } = await ColumnsApi.addNewColumn(payload)
			dispatch(addNewColumn(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка получения досок')
		}
	}
}