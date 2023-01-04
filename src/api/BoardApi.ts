import {Api} from './index'
import { AxiosResponse } from 'axios'
import { BoardAPI } from '@/models/Boards'

class BoardApi {

	async getBoardAPI(boardId: string): Promise<AxiosResponse<BoardAPI>> {
		return Api.get(`/boards/6398a9542bffce6f26ae3461`);
	}

}

export default new BoardApi();
