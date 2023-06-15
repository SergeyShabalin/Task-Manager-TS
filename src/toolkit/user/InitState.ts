import { User } from '@/models/toolkit/Users'
import { message } from '@/models/Users'


export const defaultState: User = {
	_id: '',
	email: '',
	password: '',
	boardIds: [],
	firstName: '',
	secondName: '',
	lastName: '',
	messages: [],
	token: '',
	isAuth: false,
	avatar: '',
	background: '',
	position: '',
	department: '',
	organization: '',
}