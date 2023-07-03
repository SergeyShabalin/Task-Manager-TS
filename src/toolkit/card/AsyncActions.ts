import { Dispatch } from 'redux'

import { Notification } from '@UI'
import CardsApi from '@/api/CardApi'
import { PayloadForAddCard, PayloadForDeleteCard } from '@/models/toolkit/Card'
import { addNewCard, deleteCard } from '@/toolkit/board/Reducer'
import { RootState } from '@/store'


export const cardActions = {
	addNewCard: (payload: PayloadForAddCard) => async (dispatch: Dispatch) => {
		try {
			const { data } = await CardsApi.addNewCard(payload)
			dispatch(addNewCard(data))
			return true
		} catch (e) {
			Notification.error('Произошла ошибка создания карточки')
		}
	},
	deleteCard:
		(cardId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
			try {
				const { data } = await CardsApi.deleteCard(cardId)
				const card_id = data.toString()
				const { board } = getState()
				const columnId = board.boardState.allCards[cardId].column_id
				const currentColumn = board.boardState.allColumns[columnId]
				const newCardIds = currentColumn.cards.filter((id: string) => id !== card_id)
				const payload: PayloadForDeleteCard = {
					newCardIds,
					card_id
				}
			  dispatch(deleteCard(payload))
				Notification.error('Карточка удалена', 'submit')
			} catch (e) {
				Notification.error('Произошла ошибка удаления карточки')
			}
		}
}