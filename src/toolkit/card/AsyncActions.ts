import { Dispatch } from 'redux'

import { Notification } from '@UI'
import CardsApi from '@/api/CardApi'
import { PayloadForAddCard } from '@/models/toolkit/Card'
import { addNewCard } from '@/toolkit/board/Reducer'

export const cardActions = {
	addNewCard: (payload: PayloadForAddCard) => async (dispatch: Dispatch) => {
		try {
			const { data } = await CardsApi.addNewCard(payload)
			dispatch(addNewCard(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка создания карточки')
		}
	}
}