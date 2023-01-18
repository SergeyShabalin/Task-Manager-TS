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
	ChangeCard,
	DeleteCard,
	GetCardInfo,
	PayloadForChangeCard,
	PayloadForDeleteCard
} from '@/models/Cards'
import { AddNewTask, ChangeTask, CheckList, CHECKLIST_TYPES, PayloadForChangedTask } from '@/models/CheckList'


export const BoardAC = {
	startFetching: (): StartFetching => ({type: BOARD_TYPES.START_FETCHING_BOARD}),
	successFetching: (payload: BoardAPI): SuccessFetching => ({type: BOARD_TYPES.SUCCESS_FETCHING_BOARD, payload}),
	errorFetching: (): ErrorFetching => ({type: BOARD_TYPES.ERROR_FETCHING_BOARD}),
};

export const ColumnAC = {
	addColumnAC : (payload: Column): AddNewColumn => ({type: COLUMN_TYPES.ADD_NEW_COLUMN, payload}),
	deleteColumnAC : (payload: PayloadForDeleteColumn) : DeleteColumn => ({type: COLUMN_TYPES.DELETE_COLUMN, payload}),
	changeColumnAC: (payload: PayloadForChangeColumn) : ChangeColumn => ({type: COLUMN_TYPES.CHANGE_COLUMN, payload})
}

export const CardAC = {
	newCardAC: (payload: Card) : AddNewCard => ({type: CARD_TYPES.ADD_NEW_CARD, payload}),
	deleteCardAC: (payload: PayloadForDeleteCard ): DeleteCard =>({type: CARD_TYPES.DELETE_CARD, payload}),
	changeCardAC: (payload : PayloadForChangeCard) : ChangeCard => ({type: CARD_TYPES.CHANGE_CARD, payload}),
	getCardInfoCardAC: (payload: Card) : GetCardInfo => ({type: CARD_TYPES.GET_CARD_INFO, payload})
}

export const ChecklistAC = {
	addNewTaskAC: (payload: CheckList) : AddNewTask => ({type: CHECKLIST_TYPES.ADD_NEW_TASK, payload}),
	changeTaskAC: (payload: PayloadForChangedTask[]) : ChangeTask  => ({type: CHECKLIST_TYPES.CHANGE_TASK, payload})
}