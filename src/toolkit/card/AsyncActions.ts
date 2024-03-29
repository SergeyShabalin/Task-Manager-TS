import { Dispatch } from 'redux'
import { Notification } from '@UI'
import CardsApi from '@/api/CardApi'
import { PayloadForAddCard, PayloadForDeleteCard, PayloadForDragDropCard } from '@/models/toolkit/Card'
import { addNewCard, deleteCard, dragDropCard } from '@/toolkit/board/Reducer'
import { finishLoadingCard, getCardInfo, startLoadingCard } from '@/toolkit/card/Reducer'
import { RootState } from '@/store'
import { BoardActions } from '@/store/board/reducer'
import { BoardAC, CardAC } from '@/store/board/action'


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
	deleteCard: (cardId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
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
	},

	dragDropCard: (payload: PayloadForDragDropCard) => async (dispatch: Dispatch, getState: () => RootState) => {
		try {

			const { targetColumnId, currentCardId, targetCardId } = payload
			const { board } = getState()
			const targetColumn = board.boardState.allColumns[targetColumnId]
			if (
				!(currentCardId === targetCardId && targetColumn.cards.length !== 0) && //перенос в пределах одной колонки
				!(targetCardId === '' && targetColumn.cards.length !== 0) //перенос в пустую колонку
			) {
				await CardsApi.dragDropCard(payload)
				dispatch(dragDropCard(payload))
			}
		} catch (e) {
			Notification.error('Произошла ошибка перемещения карточки')
		}
	},

	getOneCard: (cardId: string) => async (dispatch: Dispatch<BoardActions>) => {
		try {
			dispatch(startLoadingCard())
			const { data } = await CardsApi.getCardInfo(cardId)
			dispatch(getCardInfo(data))
			dispatch(finishLoadingCard())
		} catch (e) {
			Notification.error('Произошла ошибка получения данных о карточке')
		}
	},
}