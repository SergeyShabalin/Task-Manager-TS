import { AxiosResponse } from 'axios/index'
import { Card } from '@/models/Cards'
import { Board } from '@/models/Boards'
import { Api } from '@/api'

class CardsApi {
	async addNewCard(payload: string): Promise<AxiosResponse<Card & Board>>  {
		return Api.post(`/cards/`, payload)
	}
}

export default new CardsApi()