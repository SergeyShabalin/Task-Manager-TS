import {Api} from './index'

class BoardApi {

	async getAllBoardAPI() {
		return Api.get(`/boards/`);
	}

}

export default new BoardApi();
