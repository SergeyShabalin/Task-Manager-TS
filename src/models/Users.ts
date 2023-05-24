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
	avatar: string
	socket: Socket | null
	background: string
	position: string
	department: string
	organization: string
	birthDate: Date
}

export interface userOneCard {
	_id: string
	firstName: string
	secondName: string
	lastName: string
	avatar: string
	email: string
}

export interface message {
	currentBoardId: string,
	message: string
}

export interface payloadForShareBoard {
	messages?: message[],
	error?: string,
	submit?: string
}

export interface error {
	error: object
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
	SOCKET_INIT = 'SOCKET_INIT',
	SHARE_BOARD = 'SHARE_BOARD',
	CHANGE_USER = 'CHANGE_USER',
	CHANGE_BACKGROUND_USER = 'CHANGE_BACKGROUND_USER',
	CHANGE_AVATAR_USER = 'CHANGE_AVATAR_USER',
	CHANGE_PERSONAL_INFO = 'CHANGE_PERSONAL_INFO'
}

export type StartRegistration = Action<USER_TYPES.REGISTRATION>
export type CheckLogin = Action<USER_TYPES.CHECK_LOGIN>
export type Authentication = Action<USER_TYPES.AUTHENTICATION>
export type Logout = Action<USER_TYPES.LOGOUT>
export type AddBoard = Action<USER_TYPES.ADD_BOARD>
export type DeleteMessage = Action<USER_TYPES.DELETE_MESSAGE>
export type SocketInit = Action<USER_TYPES.SOCKET_INIT>
export type ShareBoard = Action<USER_TYPES.SHARE_BOARD>
export type ChangeUser = Action<USER_TYPES.CHANGE_USER>
export type ChangeBackgroundUser = Action<USER_TYPES.CHANGE_BACKGROUND_USER>
export type ChangeAvatarUser = Action<USER_TYPES.CHANGE_AVATAR_USER>
export type ChangePersonalInfo = Action<USER_TYPES.CHANGE_PERSONAL_INFO>


export interface PayloadForApplyInvite {
	userId?: string
	boardId: string
}

export interface PayloadForMessageDelete {
	userId?: string
	boardId: string
}

export interface payloadForChangePassword {
	oldPass: string
	newPass: string
}


export interface payloadForChangeBackgroundUser {
	payload: Partial<User>
}


export interface payloadForChangePersonalInfo {
	_id: string
	newPass?: string
	oldPass?: string
	newEmail?: string
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

export interface PayloadForShareBoard extends ShareBoard {
	payload: message[]
}

export interface PayloadForChangeUser extends ChangeUser {
	payload: Partial<User>
}

export interface PayloadForChangeBackgroundUser extends ChangeBackgroundUser {
	payload: Partial<User>
}

export interface PayloadForChangeAvatarUser extends ChangeAvatarUser {
	payload: Partial<User>
}

export interface PayloadForChangePersonalInfo extends ChangePersonalInfo {
	payload: string
}


