import { AxiosResponse } from 'axios'

import { Api } from "./index";
import { Column, PayloadForDropCard } from '@/models/Columns'

class ColumnsAPI {

	async addNewColumnAPI(title: string, boardId: string): Promise<AxiosResponse<Column>> {
		return Api.post(`/columns/`, { title, boardId: boardId });
	}

	async deleteColumnAPI(columnId: string){
		return Api.delete(`/columns/${columnId}`)
	}

	async changeColumnAPI(columnId: string, title: string): Promise<AxiosResponse<Column>> {
		return Api.patch(`/columns/${columnId}`, { title });
	}

	async dragDropCardAPI(payload: PayloadForDropCard ) : Promise<AxiosResponse> {
		return Api.patch(`/cards/dragDrop/${payload.currentCardId}`, {targetColumnId:payload.dropColumnId});
	}

}

export default new ColumnsAPI();
