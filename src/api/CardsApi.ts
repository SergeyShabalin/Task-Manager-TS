import { Api } from './index'
import { Card } from '@/models/Cards'
import { AxiosResponse } from 'axios'
import { Board } from '@/models/Boards'

class CardsApi {
	async getCardInfo(cardId: string): Promise<AxiosResponse<Card & Board>>  {
		return Api.get(`/cards/${cardId}`)
	}
}

export default new CardsApi()
