export interface Column {
	title: string
	cards: string[]
	sortArr: number[]
	boardId: string
	_id: string
}

export interface PayloadForAddNewColumn {
	title: string
	boardId: string | undefined
}

export interface PayloadForChangeColumn {
	title: string
	column_id: string
}

export interface PayloadForDragDropColumn {
	currentColumnId: string
	targetColumnId: string
}
