
import { message } from '@/models/Users'

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

