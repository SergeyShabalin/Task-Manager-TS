import { AxiosResponse } from 'axios'

import { Api } from './index'
import { PayloadForDropCard } from '@/models/Columns'

class ColumnsAPI {
	async dragDropCard(payload: PayloadForDropCard): Promise<AxiosResponse> {
		return Api.patch(`/cards/dragDrop/${payload.currentCardId}`, payload)
	}
}

export default new ColumnsAPI()
