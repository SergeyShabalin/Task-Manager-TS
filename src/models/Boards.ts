import { Column } from '@/models/Columns'
import { Card } from '@/models/Cards'
import { Action } from 'redux'
import { User, USER_TYPES } from '@/models/Users'

export interface Board {
	_id: string
	title: string
	background: string
	columns: string[]
}

export interface BoardAPI {
	currentBoard: Board
	allCards: { [key: string]: Card }
	allColumns: { [key: string]: Column }
}

export enum BOARD_TYPES {
	START_FETCHING_BOARD = 'START_FETCHING_BOARD',
	SUCCESS_FETCHING_BOARD = 'SUCCESS_FETCHING_BOARD',
	ERROR_FETCHING_BOARD = 'ERROR_FETCHING_BOARD',
	CHANGE_BOARD = 'CHANGE_BOARD',
	LOGOUT = 'LOGOUT',
	GET_ALL_BOARDS = 'GET_ALL_BOARDS',
	APPLY_INVITE = 'APPLY_INVITE',
	GET_USERS_ONE_BOARD = 'GET_USERS_ONE_BOARD',
	DELETE_BOARD = 'DELETE_BOARD'
}
export type StartFetching = Action<BOARD_TYPES.START_FETCHING_BOARD>
export type ErrorFetching = Action<BOARD_TYPES.ERROR_FETCHING_BOARD>
export type BoardChange = Action<BOARD_TYPES.CHANGE_BOARD>
export type GetAllBoards = Action<BOARD_TYPES.GET_ALL_BOARDS>
export type ApplyInvite = Action<BOARD_TYPES.APPLY_INVITE>
export type GetUsersOneBoard = Action<BOARD_TYPES.GET_USERS_ONE_BOARD>
export type DeleteBoard = Action<BOARD_TYPES.DELETE_BOARD>

export interface SuccessFetching extends Action<BOARD_TYPES.SUCCESS_FETCHING_BOARD> {
	payload: BoardAPI
}

export interface Logout extends Action<BOARD_TYPES.LOGOUT> {
	payload: BoardAPI
}

export interface payloadForApplyInvite extends ApplyInvite {
	payload: Partial<Board>
}

export interface payloadForUsersOneBoard extends GetUsersOneBoard {
	payload: Partial<User>[]
}

export interface BoardAction extends BoardChange {
	payload: Board
}
export interface AllBoardAction extends GetAllBoards {
	payload: Board[]
}

export interface BoardState extends BoardAPI {
	isLoading: boolean
	isError: boolean
	cardInfo: Card
	allBoards: Board[]
	allUsers: Partial<User>[]
}

export interface payloadForDeleteBoard extends DeleteBoard{
	payload: Partial<Board>[]
}
