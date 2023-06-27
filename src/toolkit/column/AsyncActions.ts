import { Dispatch } from 'redux'
import { Notification } from '@UI'
import { PayloadForAddNewColumn } from '@/models/toolkit/Column'
import ColumnsApi from '@/api/ColumnApi/'
import { addNewColumn, deleteColumn } from '@/toolkit/board/Reducer'
import { RootState } from '@/toolkit'


export const columnActions = {
	addNewColumn: (payload: PayloadForAddNewColumn) => async (dispatch: Dispatch) => {
		try {
			const { data } = await ColumnsApi.addNewColumn(payload)
			dispatch(addNewColumn(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка добавления колонки')
		}
	},
	deleteColumn: (columnId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
		try {
			const { data } = await ColumnsApi.deleteColumn(columnId)
			const { board } = getState()
			const newColumns = board.boardState.currentBoard.columns.filter(id => id !== data)
			dispatch(deleteColumn(newColumns))
			Notification.error('Колонка удалена', 'submit')
		} catch (e) {
			Notification.error('Произошла ошибка удаления колонки')
		}
	}

}