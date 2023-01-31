import { Authentication, CheckLogin, StartRegistration, User, USER_TYPES } from '@/models/Users'

export const UserAC = {
	registration: (payload: Partial<User>) : StartRegistration => ({type: USER_TYPES.REGISTRATION, payload}),
	checkLogin: (payload: boolean): CheckLogin => ({type: USER_TYPES.CHECK_LOGIN, payload}),
	login: (payload: Partial<User>) : Authentication => ({type: USER_TYPES.AUTHENTICATION, payload})
}