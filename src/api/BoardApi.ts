import {Api} from './index'
import { AxiosResponse } from 'axios'
import { Board, BoardAPI } from '@/models/Boards'

class BoardApi {

	async getBoard(boardId: string): Promise<AxiosResponse<BoardAPI>> {
		return Api.get(`/boards/${boardId}`);
	}

	async change(payload: Partial<Board>): Promise<AxiosResponse<Board>> {
		return Api.patch(`/boards/${payload._id}`, payload);
	}

	async addBoard(payload: Partial<Board>) {
		return Api.post(`/boards/`, {payload});
	}

	async getAllBoardAPI(user_id: string) {
		return Api.get(`/boards/allBoards/${user_id}`);
	}

}

export default new BoardApi();
