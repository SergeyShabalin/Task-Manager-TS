import {Api} from './index'
import { AxiosResponse } from 'axios'
import { Board, BoardAPI } from '@/models/Boards'

class BoardApi {

	async getBoardAPI(boardId: string): Promise<AxiosResponse<BoardAPI>> {
		return Api.get(`/boards/${boardId}`);
	}

	async updateBoardAPI(payload: Partial<Board>): Promise<AxiosResponse<Board>> {
		return Api.patch(`/boards/${payload._id}`, payload);
	}

	async addNewBoardAPI(title: string) {
		return Api.post(`/boards/`, {title: title});
	}


}

export default new BoardApi();
