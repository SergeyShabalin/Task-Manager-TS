import { Dispatch } from 'redux'

import { Notification } from '@UI'

export const cardActions = {
	addNewCard: (payload: string) => async (dispatch: Dispatch) => {
		try {

		} catch (e) {
			Notification.error('Произошла ошибка создания карточки')
		}
	},
}