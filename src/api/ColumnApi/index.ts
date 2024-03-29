import {   } from '@/models/Columns'
import { AxiosResponse } from 'axios/index'
import { Api } from '@/api'
import { PayloadForAddNewColumn, PayloadForChangeColumn, PayloadForDragDropColumn } from '@/models/toolkit/Column'

class ColumnsApi {
	async addNewColumn(payload: PayloadForAddNewColumn): Promise<AxiosResponse> {
		return Api.post(`/columns/`, payload)
	}
	async deleteColumn(id: string): Promise<AxiosResponse> {
		return Api.delete(`/columns/${id}`)
	}
	async changeColumn(payload: PayloadForChangeColumn ): Promise<AxiosResponse> {
		return Api.patch(`/columns/${payload.column_id}`, payload)
	}
	async dragDropColumn(payload: PayloadForDragDropColumn ): Promise<AxiosResponse> {
		return Api.patch(`/columns/dragDropColumn/${payload.currentColumnId}`, payload)
	}
}
export default new ColumnsApi()
