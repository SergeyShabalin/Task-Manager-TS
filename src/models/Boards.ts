import { Column } from '@/models/Columns'
import { Card } from '@/models/Cards'
import { Action } from 'redux'

export interface Board {
	_id: string
	title: string
	columns: string[]
}

export interface BoardAPI {
	currentBoard: Board
	allCards: { [key: string]: Card }
	allColumns: { [key: string] : Column}
}

export enum BOARD_TYPES {
	START_FETCHING_BOARD = 'START_FETCHING_BOARD',
	SUCCESS_FETCHING_BOARD = 'SUCCESS_FETCHING_BOARD',
	ERROR_FETCHING_BOARD = 'ERROR_FETCHING_BOARD',
	CHANGE_BOARD = 'CHANGE_BOARD'
}
export type StartFetching = Action<BOARD_TYPES.START_FETCHING_BOARD>
export type ErrorFetching = Action<BOARD_TYPES.ERROR_FETCHING_BOARD>
export type BoardChange = Action<BOARD_TYPES.CHANGE_BOARD>

export interface SuccessFetching extends Action<BOARD_TYPES.SUCCESS_FETCHING_BOARD> {
	payload: BoardAPI
}

export interface BoardAction extends BoardChange {
	payload: Board
}

export interface BoardState extends BoardAPI{
	isLoading: boolean
	isError: boolean
	cardInfo: Card
}

