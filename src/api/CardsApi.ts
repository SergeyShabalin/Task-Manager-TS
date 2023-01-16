import { Api } from './index'
import { Card, PayloadForChangeCard } from '@/models/Cards'
import { AxiosResponse } from 'axios'

class CardsApi {
	async addNewCardAPI(columnId: string, title: string): Promise<AxiosResponse<Card>> {
		return Api.post(`/cards/`, { title, column_id: columnId, description: '' })
	}
	async deleteCardAPI(cardId: string) {
		return Api.delete(`/cards/${cardId}`)
	}

	async changeCardAPI(payload: PayloadForChangeCard): Promise<AxiosResponse<Card>> {
		return Api.patch(`/cards/update/${payload._id}`, payload)
	}

	async getCardInfoAPI(cardId: string): Promise<AxiosResponse<Card>> {
		return Api.get(`/cards/${cardId}`)
	}

}

export default new CardsApi()
