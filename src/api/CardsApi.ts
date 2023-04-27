import { Api } from './index'
import { Card } from '@/models/Cards'
import { AxiosResponse } from 'axios'

class CardsApi {
	async getCardInfo(cardId: string): Promise<AxiosResponse<Card>> {
		return Api.get(`/cards/${cardId}`)
	}
}

export default new CardsApi()
