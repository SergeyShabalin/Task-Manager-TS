import { Dispatch } from 'redux'

import { Notification } from '@UI'
import CardsApi from '@/api/CardApi'
import { PayloadForAddCard } from '@/models/toolkit/Card'
import { addNewCard } from '@/toolkit/board/Reducer'
import { BoardActions } from '@/store/board/reducer'
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
		(cardId: string) => async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
			try {
				const { data } = await CardsApi.deleteCard(cardId)
				console.log(data)
				const { board } = getState()
				console.log(board)
				// const columnId = board.allCards[cardId].column_id
				// const currentColumn = board.allColumns[columnId]
				// const newCardIds = currentColumn.cards.filter(id => id !== cardId)
				// const payload: PayloadForDeleteCard = {
				// 	newCardIds,
				// 	cardId
				// }

				// dispatch(CardAC.deleteCardAC(payload))
			} catch (e) {
				Notification.error('Произошла ошибка удаления карточки')
			}
		}
}