import {   } from '@/models/Columns'
import { AxiosResponse } from 'axios/index'
import { Api } from '@/api'
import {  PayloadForAddNewColumn } from '@/models/toolkit/Column'

class ColumnsApi {
	async addNewColumn(payload: PayloadForAddNewColumn): Promise<AxiosResponse> {
		return Api.post(`/columns/`, payload)
	}
	async deleteColumn(id: string): Promise<AxiosResponse> {
		return Api.delete(`/columns/${id}`)
	}
}
export default new ColumnsApi()
