import {
	AddBoard,
	Authentication,
	CheckLogin,
	DeleteMessage,
	Logout,
	PayloadForCheckLogin,
	StartRegistration,
	User,
	USER_TYPES
} from '@/models/Users'


export const UserAC = {
	registration: (payload: Partial<User>) : StartRegistration => ({type: USER_TYPES.REGISTRATION, payload}),
	checkLogin: (payload: PayloadForCheckLogin): CheckLogin => ({type: USER_TYPES.CHECK_LOGIN, payload}),
	login: (payload: Partial<User>) : Authentication => ({type: USER_TYPES.AUTHENTICATION, payload}),
	logout: (): Logout=> ({type: USER_TYPES.LOGOUT}),
	addBoard: (payload: string) : AddBoard=> ({type: USER_TYPES.ADD_BOARD, payload}),
	deleteMessage: (payload: Partial<User>): DeleteMessage => ({type: USER_TYPES.DELETE_MESSAGE, payload}),
}