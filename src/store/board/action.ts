import { BOARD_TYPES, BoardAPI, ErrorFetching, StartFetching, SuccessFetching } from '@/models/Boards'
import { AddNewColumn, Column, COLUMN_TYPES, DeleteColumn, PayloadForDeleteColumn } from '@/models/Columns'
import { AddNewCard, Card, CARD_TYPES, ChangeTitleCard, DeleteCard, PayloadForDeleteCard, PayloadForChangeTitleCard } from '@/models/Cards'


export const BoardAC = {
	startFetching: (): StartFetching => ({type: BOARD_TYPES.START_FETCHING_BOARD}),
	successFetching: (payload: BoardAPI): SuccessFetching => ({type: BOARD_TYPES.SUCCESS_FETCHING_BOARD, payload}),
	errorFetching: (): ErrorFetching => ({type: BOARD_TYPES.ERROR_FETCHING_BOARD}),
};

export const ColumnAC = {
	new : (payload: Column): AddNewColumn => ({type: COLUMN_TYPES.ADD_NEW_COLUMN, payload}),
	delete : (payload: PayloadForDeleteColumn) : DeleteColumn => ({type: COLUMN_TYPES.DELETE_COLUMN, payload}),
}

export const CardAC = {
	new: (payload: Card) : AddNewCard => ({type: CARD_TYPES.ADD_NEW_CARD, payload}),
	delete: (payload: PayloadForDeleteCard ): DeleteCard =>({type: CARD_TYPES.DELETE_CARD, payload}),
	changeTitle: (payload : PayloadForChangeTitleCard) : ChangeTitleCard => ({type: CARD_TYPES.CHANGE_TITLE_CARD, payload})
}