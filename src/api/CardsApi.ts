import { Api } from './index'
import { Card } from '@/models/Cards'
import { AxiosResponse } from 'axios'

class CardsApi {

	async change(payload: Partial<Card>): Promise<AxiosResponse<Card>> {
		return Api.patch(`/cards/update/${payload._id}`, payload)
	}

	async getCardInfo(cardId: string): Promise<AxiosResponse<Card>> {
		return Api.get(`/cards/${cardId}`)
	}
}

export default new CardsApi()
