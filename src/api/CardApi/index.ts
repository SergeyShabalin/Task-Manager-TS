import { AxiosResponse } from 'axios/index'
import { Card } from '@/models/Cards'
import { Board } from '@/models/Boards'
import { Api } from '@/api'
import { PayloadForAddCard } from '@/models/toolkit/Card'

class CardsApi {
	async addNewCard(payload: PayloadForAddCard): Promise<AxiosResponse<Card & Board>>  {
		return Api.post(`/cards/`, payload)
	}
}

export default new CardsApi()