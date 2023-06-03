import {
	AllBoardAction,
	BackToGreeting,
	Board,
	BOARD_TYPES,
	BoardAction,
	BoardAPI,
	ErrorFetching,
	FinishLoadingBoard,
	FinishLoadingCard,
	Logout,
	payloadForApplyInvite,
	payloadForDeleteBoard,
	PayloadForDragDropColumn,
	PayloadForGetUsersOneCard,
	PayloadForSuccessFetching,
	payloadForUsersOneBoard,
	StartFetching,
	StartLoadingBoard,
	StartLoadingCard
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
import {
	AddNewCard,
	Card,
	CARD_TYPES,
	ChangeCard,
	CloseCard,
	DeleteCard,
	GetCardInfo,
	getUsersOneCard,
	PayloadForDeleteCard,
	PayloadForGetCardInfo,
	PayloadForApplySearchUser
} from '@/models/Cards'
import {
	AddNewTask,
	ChangeTask,
	CheckList,
	CHECKLIST_TYPES,
	DeleteTask,
	HideDoneTasks,
	PayloadForChangedTask
} from '@/models/CheckList'
import {User, USER_TYPES } from '@/models/Users'

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
	finishLoadingBoard: () : FinishLoadingBoard => ({type: BOARD_TYPES.FINISH_LOADING_BOARD}),
	backToGreeting : () : BackToGreeting => ({type: BOARD_TYPES.BACK_TO_GREETING}),
	startLoadingCard : () : StartLoadingCard => ({type: BOARD_TYPES.START_LOADING_CARD}),
	finishLoadingCard : () : FinishLoadingCard => ({type: BOARD_TYPES.FINISH_LOADING_CARD}),
	dragDropColumn : (payload : string[]) : PayloadForDragDropColumn => ({type: BOARD_TYPES.DRAG_DROP_COLUMN, payload}),
	getUsersOneCard : (payload: Partial<User>[]) : PayloadForGetUsersOneCard => ({type: BOARD_TYPES.GET_USERS_ONE_CARD, payload})
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
	getCardInfoCardAC: (payload: PayloadForGetCardInfo) : GetCardInfo => ({type: CARD_TYPES.GET_CARD_INFO, payload}),
	closeCard : () : CloseCard => ({type: CARD_TYPES.CLOSE_CARD}),
	getUsersOneCard : ( payload: { [key: string]: Partial<User> })  : getUsersOneCard => ({type: CARD_TYPES.GET_USERS_ONE_CARD, payload}),
	applySearchUser: (payload:Partial<User>[]) : PayloadForApplySearchUser => ({type: CARD_TYPES.APPLY_SEARCH_USERS, payload})
}

export const ChecklistAC = {
	addNewTaskAC: (payload: CheckList) : AddNewTask => ({type: CHECKLIST_TYPES.ADD_NEW_TASK, payload}),
	changeTaskAC: (payload: PayloadForChangedTask[]) : ChangeTask  => ({type: CHECKLIST_TYPES.CHANGE_TASK, payload}),
	deleteTaskAC: (payload: CheckList[]) : DeleteTask => ({type: CHECKLIST_TYPES.DELETE_TASK, payload}),
	hideDoneTask: (payload: CheckList[]) : HideDoneTasks => ({type: CHECKLIST_TYPES.HIDE_DONE_TASKS, payload})
}