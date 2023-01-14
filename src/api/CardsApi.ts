import { Api } from './index'
import { Card, PayloadForChangeCard, PayloadForGetOneCard } from '../models/Cards'
import { AxiosResponse } from 'axios'

class CardsApi {
	async addNewCardAPI(columnId: string, title: string): Promise<AxiosResponse<Card>> {
		return Api.post(`/cards/`, { header: title, column_id: columnId, description: '' })
	}
	async deleteCardAPI(cardId: string) {
		return Api.delete(`/cards/${cardId}`)
	}

	async changeCard(payload: PayloadForChangeCard): Promise<AxiosResponse<Card>> {
		return Api.patch(`/cards/update/${payload._id}`, payload)
	}

	async getCardInfo(cardId: string): Promise<AxiosResponse<Card>> {
		return Api.get(`/cards/${cardId}`)
	}

	//
	// async updateCardDescriptionAPI(cardId, descriptionValue) {
	// 	return Api.patch(`/cards/descriptions/${cardId}`, { description: descriptionValue });
	// }
	//
	// async updateCardDecisionDateAPI(cardId, decisionDate) {
	// 	return Api.patch(`/cards/decisionDate/${cardId}`, { decisionDate: decisionDate });
	// }
	//

	//
	// async dragDropCardAPI(currentCardId, targetColumnId ) {
	// 	return Api.patch(`/cards/dragDrop/${currentCardId}`, {targetColumnId});
	// }
}

export default new CardsApi()
