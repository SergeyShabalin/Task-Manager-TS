import { UserState } from '@/models/Users'

export const defaultState: {
	lastName: string
	profileUser: {
		firstName: string
		lastName: string
		background: string
		organization: string
		_id: string
		avatar: string
		position: string
		department: string
		email: string
		secondName: string
	}
	avatar: string
	token: string
	isLoading: boolean
	firstName: string
	password: string
	isAuth: boolean
	isError: boolean
	boardIds: any[]
	messages: any[]
	_id: string
	socket: null
	email: string
	secondName: string
} = {
	isError: false,
	isLoading: false,
	_id: '',
	password: '',
	boardIds: [],
	firstName: '',
	secondName: '',
	lastName: '',
	token: '',
	email: '',
	messages: [],
	isAuth: false,
	socket: null,
	avatar: '',
	profileUser: {
		_id: '',
		email: '',
		firstName: '',
		secondName: '',
		lastName: '',
		avatar: '',
		background: '',
		position: '',
		department: '',
		organization: ''
	}
}
