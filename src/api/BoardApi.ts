import {Api} from './index'
import { AxiosResponse } from 'axios'
import { Board, BoardAPI } from '@/models/Boards'

class BoardApi {

	async getBoardAPI(boardId: string): Promise<AxiosResponse<BoardAPI>> {
		return Api.get(`/boards/63ad83c2097128dd4caad35a`);
	}

	async updateBoardAPI(payload: Partial<Board>): Promise<AxiosResponse<Board>> {
		return Api.patch(`/boards/${payload._id}`, payload);
	}

}

export default new BoardApi();
