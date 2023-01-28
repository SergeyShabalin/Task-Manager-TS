import { UserState} from '@/models/Users'

export const defaultState: UserState ={
	isError: false,
	isLoading: false,
	_id: '',
	password: '',
	boardIds: [],
	firstName: '',
	secondName: '',
	lastName: '',
	birthday: new Date()
}