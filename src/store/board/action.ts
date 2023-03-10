import {
	AllBoardAction,
	Board,
	BOARD_TYPES,
	BoardAction,
	BoardAPI,
	ErrorFetching,
	FinishLoadingBoard,
	Logout,
	payloadForApplyInvite,
	payloadForDeleteBoard,
	PayloadForSuccessFetching,
	payloadForUsersOneBoard,
	StartFetching,
	StartLoadingBoard
} from '@/models/Boards'
import {
	AddNewColumn,
	ChangeColumn,
	Column,
	COLUMN_TYPES,
	DeleteColumn,
	DropCard,
	PayloadForChangeColumn,
	PayloadForDeleteColumn,
	PayloadForDropCard
} from '@/models/Columns'
import { AddNewCard, Card, CARD_TYPES, ChangeCard, DeleteCard, GetCardInfo, PayloadForDeleteCard } from '@/models/Cards'
import {
	AddNewTask,
	ChangeTask,
	CheckList,
	CHECKLIST_TYPES,
	DeleteTask,
	PayloadForChangedTask
} from '@/models/CheckList'
import { User } from '@/models/Users'

export const BoardAC = {
	startFetching: (): StartFetching => ({type: BOARD_TYPES.START_FETCHING_BOARD}),
	successFetching: (payload: BoardAPI): PayloadForSuccessFetching => ({type: BOARD_TYPES.SUCCESS_FETCHING_BOARD, payload}),
	errorFetching: (): ErrorFetching => ({type: BOARD_TYPES.ERROR_FETCHING_BOARD}),
	changeBoardAC: (payload: Board): BoardAction  => ({type: BOARD_TYPES.CHANGE_BOARD, payload}),
	getAllBoard: (payload: Board[]) : AllBoardAction => ({type: BOARD_TYPES.GET_ALL_BOARDS, payload}),
	logout: (): Logout => ({type: BOARD_TYPES.LOGOUT}),
	applyInvite: (payload: Partial<Board>) : payloadForApplyInvite => ({type: BOARD_TYPES.APPLY_INVITE, payload}),
	getUsersOneBoard: (payload: User) : payloadForUsersOneBoard => ({type: BOARD_TYPES.GET_USERS_ONE_BOARD, payload}),
	deleteBoard: (payload: Partial<Board>[]) : payloadForDeleteBoard => ({type: BOARD_TYPES.DELETE_BOARD, payload}),
	startLoadingBoard: () : StartLoadingBoard => ({type: BOARD_TYPES.START_LOADING_BOARD}),
	finishLoadingBoard: () : FinishLoadingBoard => ({type: BOARD_TYPES.FINISH_LOADING_BOARD})
};

export const ColumnAC = {
	addColumnAC : (payload: Column): AddNewColumn => ({type: COLUMN_TYPES.ADD_NEW_COLUMN, payload}),
	deleteColumnAC : (payload: PayloadForDeleteColumn) : DeleteColumn => ({type: COLUMN_TYPES.DELETE_COLUMN, payload}),
	changeColumnAC: (payload: PayloadForChangeColumn) : ChangeColumn => ({type: COLUMN_TYPES.CHANGE_COLUMN, payload}),
	dropCard: (payload: PayloadForDropCard) : DropCard => ({type: COLUMN_TYPES.DROP_CARD, payload})
}

export const CardAC = {
	newCardAC: (payload: Card) : AddNewCard => ({type: CARD_TYPES.ADD_NEW_CARD, payload}),
	deleteCardAC: (payload: PayloadForDeleteCard ): DeleteCard =>({type: CARD_TYPES.DELETE_CARD, payload}),
	changeCardAC: (payload : Partial<Card>) : ChangeCard => ({type: CARD_TYPES.CHANGE_CARD, payload}),
	getCardInfoCardAC: (payload: Card) : GetCardInfo => ({type: CARD_TYPES.GET_CARD_INFO, payload})
}

export const ChecklistAC = {
	addNewTaskAC: (payload: CheckList) : AddNewTask => ({type: CHECKLIST_TYPES.ADD_NEW_TASK, payload}),
	changeTaskAC: (payload: PayloadForChangedTask[]) : ChangeTask  => ({type: CHECKLIST_TYPES.CHANGE_TASK, payload}),
	deleteTaskAC: (payload: CheckList[]) : DeleteTask => ({type: CHECKLIST_TYPES.DELETE_TASK, payload})
}