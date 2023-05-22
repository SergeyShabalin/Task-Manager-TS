import {
	Logout,
	message,
	PayloadForAddBoard,
	PayloadForAuthentication, payloadForChangeBackgroundUser, PayloadForChangeBackgroundUser,
	PayloadForChangeUser,
	PayloadForCheckLogin,
	PayloadForDeleteMessage,
	PayloadForShareBoard,
	PayloadForSocketInit,
	PayloadForStartRegistration,
	User,
	USER_TYPES
} from '@/models/Users'
import { Socket } from 'socket.io-client'

export const UserAC = {
	registration: (payload: Partial<User>) : PayloadForStartRegistration => ({type: USER_TYPES.REGISTRATION, payload}),
	checkLogin: (payload: Partial<User>): PayloadForCheckLogin => ({type: USER_TYPES.CHECK_LOGIN, payload}),
	login: (payload: Partial<User>) : PayloadForAuthentication => ({type: USER_TYPES.AUTHENTICATION, payload}),
	logout: (): Logout=> ({type: USER_TYPES.LOGOUT}),
	addBoard: (payload: string) : PayloadForAddBoard=> ({type: USER_TYPES.ADD_BOARD, payload}),
	deleteMessage: (payload: Partial<User>): PayloadForDeleteMessage => ({type: USER_TYPES.DELETE_MESSAGE,	payload}),
	socketInit: (payload: Socket | null): PayloadForSocketInit => ({type: USER_TYPES.SOCKET_INIT,	payload}),
	shareBoard: (payload: message[]) : PayloadForShareBoard => ({type: USER_TYPES.SHARE_BOARD, payload}),
	updateUser: (payload: Partial<User>) : PayloadForChangeUser => ({type: USER_TYPES.CHANGE_USER, payload}),
	updateBackgroundUser: (payload: Partial<User> ) : PayloadForChangeBackgroundUser => ({type: USER_TYPES.CHANGE_BACKGROUND_USER, payload}),
}
