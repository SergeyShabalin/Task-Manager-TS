import { Card } from '@/models/Cards'
import { Column } from '@/models/Columns'
import { User } from '@/models/Users'
import { UsersInShare } from '@/models/Boards'


export interface Board {
	_id: string
	title: string
	background: string
	columns: string[]
	usersOneCard: []
}

export interface BoardAPI {
	currentBoard: Board
	allCards: { [key: string]: Card }
	allColumns: { [key: string]: Column }
}

export interface BoardState extends BoardAPI {
	isLoadingBoard: boolean
	isError: boolean
	allBoards: Board[]
	allUsers: UsersInShare[]
	usersOneCard: Partial<User>[]
}

