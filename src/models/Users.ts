import { Action } from 'redux'

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
}

export interface message {
	message: string
	currentBoardId: string
}

export interface UserState extends User {
	isLoading: boolean
	isError: boolean
	isAuth: boolean
	token: string
}

export enum USER_TYPES {
	REGISTRATION = 'REGISTRATION',
	AUTHENTICATION = 'AUTHENTICATION',
	LOGOUT = 'LOGOUT',
	CHECK_LOGIN = 'CHECK_LOGIN',
	ADD_BOARD = 'ADD_BOARD',
	DELETE_MESSAGE = 'DELETE_MESSAGE',
}

export type StartRegistration = Action<USER_TYPES.REGISTRATION>
export type CheckLogin = Action<USER_TYPES.CHECK_LOGIN>
export type Authentication = Action<USER_TYPES.AUTHENTICATION>
export type Logout = Action<USER_TYPES.LOGOUT>
export type AddBoard = Action<USER_TYPES.ADD_BOARD>
export type DeleteMessage = Action<USER_TYPES.DELETE_MESSAGE>


export interface PayloadForShareBoard extends Partial<User> {
	email: string
	_id?: string
	boardId?: string
}

export interface PayloadForApplyInvite {
	userId?: string
	boardId: string
}

export interface PayloadForDeleteMessage extends PayloadForApplyInvite {
	userId?: string
	boardId: string
}


export interface SuccessFetching extends Action<USER_TYPES.REGISTRATION> {
	payload: Partial<User>
}

export interface LoginCheck extends CheckLogin {
	isAuth: boolean
}
