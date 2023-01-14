import { BOARD_TYPES, BoardAPI, ErrorFetching, StartFetching, SuccessFetching } from '@/models/Boards'
import {
	AddNewColumn,
	ChangeColumn,
	Column,
	COLUMN_TYPES,
	DeleteColumn,
	PayloadForChangeColumn,
	PayloadForDeleteColumn
} from '@/models/Columns'
import {
	AddNewCard,
	Card,
	CARD_TYPES,
	ChangeTitleCard,
	DeleteCard, GetCardInfo,
	PayloadForChangeCard,
	PayloadForDeleteCard
} from '@/models/Cards'


export const BoardAC = {
	startFetching: (): StartFetching => ({type: BOARD_TYPES.START_FETCHING_BOARD}),
	successFetching: (payload: BoardAPI): SuccessFetching => ({type: BOARD_TYPES.SUCCESS_FETCHING_BOARD, payload}),
	errorFetching: (): ErrorFetching => ({type: BOARD_TYPES.ERROR_FETCHING_BOARD}),
};
//TODO сделать уникальные имена(todo minicard 24 строка)
export const ColumnAC = {
	new : (payload: Column): AddNewColumn => ({type: COLUMN_TYPES.ADD_NEW_COLUMN, payload}),
	delete : (payload: PayloadForDeleteColumn) : DeleteColumn => ({type: COLUMN_TYPES.DELETE_COLUMN, payload}),
	change: (payload: PayloadForChangeColumn) : ChangeColumn => ({type: COLUMN_TYPES.CHANGE_COLUMN, payload})
}

export const CardAC = {
	new: (payload: Card) : AddNewCard => ({type: CARD_TYPES.ADD_NEW_CARD, payload}),
	delete: (payload: PayloadForDeleteCard ): DeleteCard =>({type: CARD_TYPES.DELETE_CARD, payload}),
	changeCard: (payload : PayloadForChangeCard) : ChangeTitleCard => ({type: CARD_TYPES.CHANGE_CARD, payload}),
	getCardInfo: (payload: Card) : GetCardInfo => ({type: CARD_TYPES.GET_CARD_INFO, payload})
}