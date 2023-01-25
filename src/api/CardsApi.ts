import { Api } from './index'
import { Card } from '@/models/Cards'
import { AxiosResponse } from 'axios'

class CardsApi {
	async addCard(columnId: string, title: string): Promise<AxiosResponse<Card>> {
		return Api.post(`/cards/`, { title, column_id: columnId, description: '' })
	}
	async delete(cardId: string) {
		return Api.delete(`/cards/${cardId}`)
	}

	async change(payload: Partial<Card>): Promise<AxiosResponse<Card>> {
		return Api.patch(`/cards/update/${payload._id}`, payload)
	}

	async getCardInfo(cardId: string): Promise<AxiosResponse<Card>> {
		return Api.get(`/cards/${cardId}`)
	}

}

export default new CardsApi()
