import { Api } from "./index";
import { Column } from '@/models/Columns'
import { AxiosResponse } from 'axios'

class ColumnsAPI {

	async addNewColumnAPI(header: string, boardId: string): Promise<AxiosResponse> {
		return Api.post(`/columns/`, { header, boardId: boardId });
	}

	async deleteColumn(columnId: string): Promise<AxiosResponse> {
		return Api.delete(`/columns/${columnId}`)
	}

}

export default new ColumnsAPI();
