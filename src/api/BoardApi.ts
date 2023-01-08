import {Api} from './index'
import { AxiosResponse } from 'axios'
import { BoardAPI } from '@/models/Boards'

class BoardApi {

	async getBoardAPI(boardId: string): Promise<AxiosResponse<BoardAPI>> {
		return Api.get(`/boards/63ad83c2097128dd4caad35a`);
	}

}

export default new BoardApi();
