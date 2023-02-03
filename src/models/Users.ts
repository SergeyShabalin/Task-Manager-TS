import { Action } from 'redux'
import { Card } from '@/models/Cards'
import { Column } from '@/models/Columns'
import { Board, BOARD_TYPES, BoardAPI } from '@/models/Boards'

export interface User {
	_id: string
	email: string
	password: string
	boardIds: string[]
	firstName: string
	secondName: string
	lastName: string
}


export interface UserState extends User{
	isLoading: boolean
	isError: boolean
	isAuth: boolean
	token?: string
}

export enum USER_TYPES {
	REGISTRATION = 'REGISTRATION',
	AUTHENTICATION = 'AUTHENTICATION',
	LOGOUT = 'LOGOUT',
	CHECK_LOGIN = 'CHECK_LOGIN',
	ADD_BOARD = 'ADD_BOARD'
}

export type StartRegistration = Action<USER_TYPES.REGISTRATION>
export type CheckLogin = Action<USER_TYPES.CHECK_LOGIN>
export type Authentication = Action<USER_TYPES.AUTHENTICATION>
export type Logout = Action<USER_TYPES.LOGOUT>
export type AddBoard = Action<USER_TYPES.ADD_BOARD>

export interface PayloadForCheckLogin extends User{
	User?: User | {},
	isAuth: boolean
}

export interface SuccessFetching extends Action<USER_TYPES.REGISTRATION> {
	payload: Partial<User>
}
export interface LoginCheck extends CheckLogin {
	isAuth: boolean
}