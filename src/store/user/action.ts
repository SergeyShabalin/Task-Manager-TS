import {
	ClearUserInfo,
	Logout,
	message,
	PayloadForAddBoard,
	PayloadForAuthentication,
	PayloadForChangeAvatarUser,
	PayloadForChangeBackgroundUser,
	PayloadForChangePersonalInfo,
	PayloadForChangeUser,
	PayloadForDeleteMessage,
	PayloadForGetUserInfo,
	PayloadForShareBoard,
	PayloadForSocketInit,
	PayloadForStartRegistration,
	User,
	USER_TYPES
} from '@/models/Users'
import { Socket } from 'socket.io-client'

export const UserAC = {
	registration: (payload: Partial<User>) : PayloadForStartRegistration => ({type: USER_TYPES.REGISTRATION, payload}),
	// checkLogin: (payload: Partial<User>): PayloadForCheckLogin => ({type: USER_TYPES.CHECK_LOGIN, payload}),
	login: (payload: Partial<User>) : PayloadForAuthentication => ({type: USER_TYPES.AUTHENTICATION, payload}),
	logout: (): Logout=> ({type: USER_TYPES.LOGOUT}),
	addBoard: (payload: string) : PayloadForAddBoard=> ({type: USER_TYPES.ADD_BOARD, payload}),
	deleteMessage: (payload: Partial<User>): PayloadForDeleteMessage => ({type: USER_TYPES.DELETE_MESSAGE,	payload}),
	socketInit: (payload: Socket | null): PayloadForSocketInit => ({type: USER_TYPES.SOCKET_INIT,	payload}),
	shareBoard: (payload: message[]) : PayloadForShareBoard => ({type: USER_TYPES.SHARE_BOARD, payload}),
	updateUser: (payload: Partial<User>) : PayloadForChangeUser => ({type: USER_TYPES.CHANGE_USER, payload}),
	updateBackgroundUser: (payload: Partial<User> ) : PayloadForChangeBackgroundUser => ({type: USER_TYPES.CHANGE_BACKGROUND_USER, payload}),
	updateAvatarUser: (payload: Partial<User> ) : PayloadForChangeAvatarUser => ({type: USER_TYPES.CHANGE_AVATAR_USER, payload}),
	changePersonalInfo: (payload: string) : PayloadForChangePersonalInfo => ({type: USER_TYPES.CHANGE_PERSONAL_INFO, payload}),
	getUserInfo: (payload: Partial<User>) : PayloadForGetUserInfo => ({type: USER_TYPES.GET_USER_INFO, payload}),
	clearUserInfo: () : ClearUserInfo => ({type: USER_TYPES.CLEAR_USER_INFO}),

}
