
import { message } from '@/models/Users'
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
	avatar: string
	background: string
	position: string
	department: string
	organization: string
}

export enum USER_TYPES {
	CHECK_LOGIN = 'CHECK_LOGIN',
}

export type CheckLogin = Action<USER_TYPES.CHECK_LOGIN>

export interface PayloadForCheckLogin extends CheckLogin {
	payload: Partial<User>
}