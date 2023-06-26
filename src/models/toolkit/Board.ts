import { Card } from '@/models/Cards'
import { Column } from '@/models/toolkit/Column'
import { User } from '@/models/toolkit/User'
import { UsersInShare } from '@/models/Boards'


export interface Board {
	_id: string
	title: string
	background: string
	columns: string[]
	usersOneCard: Partial<User>[]
}

export interface BoardAPI extends Board{
	currentBoard: Board
	allCards: { [key: string]: Card }
	allColumns: { [key: string]: Column }
}

export interface BoardState extends BoardAPI {
	isLoadingBoard: boolean
	isError: boolean
	allBoards: Board[]
	allUsers: UsersInShare[]
}

export interface payloadForChangeBoard {
	title: string
	_id: string
}