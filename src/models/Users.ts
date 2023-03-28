import { Action } from 'redux'
import { Socket } from 'socket.io-client'

export interface User {
	_id: string
	email: string
	password: string
	boardIds: string[]
	firstName: string
	secondName: string
	lastName: string
	messages: message[]
	token: string
	isAuth: boolean
	socket:  Socket | null
}

export interface UserForBoard {
	_id: string
	email: string
	firstName: string
	secondName: string
}

export interface message {
	message: string
	currentBoardId: string
}

export interface UserState extends User {
	isLoading: boolean
	isError: boolean

}

export enum USER_TYPES {
	REGISTRATION = 'REGISTRATION',
	AUTHENTICATION = 'AUTHENTICATION',
	LOGOUT = 'LOGOUT',
	CHECK_LOGIN = 'CHECK_LOGIN',
	ADD_BOARD = 'ADD_BOARD',
	DELETE_MESSAGE = 'DELETE_MESSAGE',
	SOCKET_INIT = 'SOCKET_INIT'
}

export type StartRegistration = Action<USER_TYPES.REGISTRATION>
export type CheckLogin = Action<USER_TYPES.CHECK_LOGIN>
export type Authentication = Action<USER_TYPES.AUTHENTICATION>
export type Logout = Action<USER_TYPES.LOGOUT>
export type AddBoard = Action<USER_TYPES.ADD_BOARD>
export type DeleteMessage = Action<USER_TYPES.DELETE_MESSAGE>
export type SocketInit = Action<USER_TYPES.SOCKET_INIT>


export interface PayloadForShareBoard extends Partial<User> {
	email: string
	_id?: string
	boardId?: string
}

export interface PayloadForApplyInvite {
	userId?: string
	boardId: string
}

export interface PayloadForMessageDelete {
	userId?: string
	boardId: string
}


export interface PayloadForStartRegistration extends StartRegistration {
	payload: Partial<User>
}

export interface PayloadForAuthentication extends Authentication {
	payload: Partial<User>
}

export interface PayloadForCheckLogin extends CheckLogin {
	payload: Partial<User>
}

export interface PayloadForAddBoard extends AddBoard {
	payload: string
}

export interface PayloadForDeleteMessage extends DeleteMessage {
	payload: Partial<User>
}

export interface PayloadForSocketInit extends SocketInit {
	payload: Socket | null
}
