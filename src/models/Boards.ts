
import { Action } from 'redux'
import { User } from '@/models/Users'

export interface Board {
	_id: string
	title: string
	background: string
	columns: string[]
	usersOneCard: []
}



export enum BOARD_TYPES {


	ERROR_FETCHING_BOARD = 'ERROR_FETCHING_BOARD',
	CHANGE_BOARD = 'CHANGE_BOARD',
	LOGOUT = 'LOGOUT',

	APPLY_INVITE = 'APPLY_INVITE',
	GET_USERS_ONE_BOARD = 'GET_USERS_ONE_BOARD',
	DELETE_BOARD = 'DELETE_BOARD',


	BACK_TO_GREETING = 'BACK_TO_GREETING',
	START_LOADING_CARD = 'START_LOADING_CARD',
	FINISH_LOADING_CARD = 'FINISH_LOADING_CARD',
	DRAG_DROP_COLUMN = 'DRAG_DROP_COLUMN',
	GET_USERS_ONE_CARD = 'GET_USERS_ONE_CARD'
}


export type ErrorFetching = Action<BOARD_TYPES.ERROR_FETCHING_BOARD>
export type BoardChange = Action<BOARD_TYPES.CHANGE_BOARD>

export type ApplyInvite = Action<BOARD_TYPES.APPLY_INVITE>
export type GetUsersOneBoard = Action<BOARD_TYPES.GET_USERS_ONE_BOARD>
export type DeleteBoard = Action<BOARD_TYPES.DELETE_BOARD>

export type Logout = Action<BOARD_TYPES.LOGOUT>


export type StartLoadingCard = Action<BOARD_TYPES.START_LOADING_CARD>
export type FinishLoadingCard = Action<BOARD_TYPES.FINISH_LOADING_CARD>
export type BackToGreeting = Action<BOARD_TYPES.BACK_TO_GREETING>
export type DragDropColumn = Action<BOARD_TYPES.DRAG_DROP_COLUMN>
export type GetUsersOneCard = Action<BOARD_TYPES.GET_USERS_ONE_CARD>

export interface PayloadForGetUsersOneCard extends GetUsersOneCard{
	payload: Partial<User>[]
}

export interface PayloadForDragDropColumn extends DragDropColumn {
	payload: string[]
}


export interface payloadForApplyInvite extends ApplyInvite {
	payload: Partial<Board>
}

export interface payloadForUsersOneBoard extends GetUsersOneBoard {
	payload: Partial<User>
}

export interface BoardAction extends BoardChange {
	payload: Board
}


export interface UsersInShare {
	_id: string
	email: string
	firstName: string
	secondName: string
	avatar: string
}



export interface payloadForDeleteBoard extends DeleteBoard {
	payload: Partial<Board>[]
}
