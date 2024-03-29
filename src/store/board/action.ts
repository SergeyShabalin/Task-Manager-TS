import {
	BackToGreeting,
	Board,
	BOARD_TYPES,
	BoardAction,
	ErrorFetching,
	Logout,
	payloadForApplyInvite,
	payloadForDeleteBoard,
	PayloadForGetUsersOneCard,
	payloadForUsersOneBoard,
} from '@/models/Boards'

import {
	Card,
	CARD_TYPES,
	ChangeCard,
	CloseCard,
	GetCardInfo,
	getUsersOneCard,
	PayloadForApplySearchUser,
	PayloadForChangeViewUserOneCard,

	PayloadForGetCardInfo
} from '@/models/Cards'
import {

	ChangeTask,
	CheckList,
	CHECKLIST_TYPES,
	DeleteTask,
	HideDoneTasks,
	PayloadForChangedTask
} from '@/models/CheckList'
import { User } from '@/models/Users'

export const BoardAC = {
	errorFetching: (): ErrorFetching => ({type: BOARD_TYPES.ERROR_FETCHING_BOARD}),
	changeBoardAC: (payload: Board): BoardAction  => ({type: BOARD_TYPES.CHANGE_BOARD, payload}),
	logout: (): Logout => ({type: BOARD_TYPES.LOGOUT}),
	applyInvite: (payload: Partial<Board>) : payloadForApplyInvite => ({type: BOARD_TYPES.APPLY_INVITE, payload}),
	getUsersOneBoard: (payload: User) : payloadForUsersOneBoard => ({type: BOARD_TYPES.GET_USERS_ONE_BOARD, payload}),
	deleteBoard: (payload: Partial<Board>[]) : payloadForDeleteBoard => ({type: BOARD_TYPES.DELETE_BOARD, payload}),
	backToGreeting : () : BackToGreeting => ({type: BOARD_TYPES.BACK_TO_GREETING}),
};

export const CardAC = {
	// changeCardAC: (payload : Partial<Card>) : ChangeCard => ({type: CARD_TYPES.CHANGE_CARD, payload}),
	closeCard : () : CloseCard => ({type: CARD_TYPES.CLOSE_CARD}),
	getUsersOneCard : (payload: { [key: string]: Partial<User> })  : getUsersOneCard => ({type: CARD_TYPES.GET_USERS_ONE_CARD, payload}),
	applySearchUser: (payload:Partial<User>[]) : PayloadForApplySearchUser => ({type: CARD_TYPES.APPLY_SEARCH_USERS, payload}),
	changeViewUserOneCard: (payload: string[]) : PayloadForChangeViewUserOneCard => ({type: CARD_TYPES.CHANGE_VIEW_USER_ONE_CARD, payload})
}

export const ChecklistAC = {

	changeTaskAC: (payload: PayloadForChangedTask[]) : ChangeTask  => ({type: CHECKLIST_TYPES.CHANGE_TASK, payload}),
	deleteTaskAC: (payload: CheckList[]) : DeleteTask => ({type: CHECKLIST_TYPES.DELETE_TASK, payload}),
	hideDoneTask: (payload: CheckList[]) : HideDoneTasks => ({type: CHECKLIST_TYPES.HIDE_DONE_TASKS, payload})
}