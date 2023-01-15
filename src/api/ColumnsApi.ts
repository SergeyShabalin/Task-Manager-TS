import { Api } from "./index";
import { Column } from '@/models/Columns'
import { AxiosResponse } from 'axios'

class ColumnsAPI {

	async addNewColumnAPI(title: string, boardId: string): Promise<AxiosResponse> {
		return Api.post(`/columns/`, { title, boardId: boardId });
	}

	async deleteColumn(columnId: string): Promise<AxiosResponse> {
		return Api.delete(`/columns/${columnId}`)
	}

	async changeColumn(columnId: string, title: string): Promise<AxiosResponse> {
		return Api.patch(`/columns/${columnId}`, { title });
	}

}

export default new ColumnsAPI();
