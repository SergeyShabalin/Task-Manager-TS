import { User } from '@/models/toolkit/User'
import { message } from '@/models/Users'
import { Board } from '@/models/toolkit/Board'


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

