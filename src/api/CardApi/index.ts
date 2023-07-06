import { AxiosResponse } from 'axios/index'
import { Card } from '@/models/Cards'
import { Api } from '@/api'
import { PayloadForAddCard, PayloadForDragDropCard } from '@/models/toolkit/Card'

class CardsApi {
	async addNewCard(payload: PayloadForAddCard): Promise<AxiosResponse<Card>>  {
		return Api.post(`/cards/`, payload)
	}
	async deleteCard(id: string): Promise<AxiosResponse<Card>>  {
		return Api.delete(`/cards/${id}`)
	}
	async dragDropCard(payload: PayloadForDragDropCard): Promise<AxiosResponse<Card>>  {
		return Api.patch(`/cards/dragDrop/${payload.currentCardId}`, payload)
	}
}

export default new CardsApi()