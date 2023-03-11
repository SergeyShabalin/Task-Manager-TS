import { AxiosResponse } from 'axios'

import { Api } from './index'
import { Column, PayloadForDropCard } from '@/models/Columns'

class ColumnsAPI {
	async addColumn(title: string, boardId: string): Promise<AxiosResponse<Column>> {
		return Api.post(`/columns/`, { title, boardId: boardId })
	}

	async delete(columnId: string) {
		return Api.delete(`/columns/${columnId}`)
	}

	async change(columnId: string, title: string): Promise<AxiosResponse<Column>> {
		return Api.patch(`/columns/${columnId}`, { title })
	}

	async dragDropCard(payload: PayloadForDropCard): Promise<AxiosResponse> {
		return Api.patch(`/cards/dragDrop/${payload.currentCardId}`, payload)
	}
}

export default new ColumnsAPI()
