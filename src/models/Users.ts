import { Action } from 'redux'
import { Card } from '@/models/Cards'
import { Column } from '@/models/Columns'
import { Board } from '@/models/Boards'

export interface User {
	_id: string
	password: string
	boardIds: string[]
	firstName: string
	secondName: string
	lastName: string
	birthday: Date
}


export interface UserState extends User{
	isLoading: boolean
	isError: boolean
}

export enum USER_TYPES {
	REGISTRATION = 'REGISTRATION',
	AUTHENTICATION = 'AUTHENTICATION',
	LOGOUT = 'LOGOUT',
	CHECK_LOGIN = 'CHECK_LOGIN'
}

export type StartRegistration = Action<USER_TYPES.REGISTRATION>