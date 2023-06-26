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

// return {
// 	...state,
// 	currentBoard: {
// 		...state.currentBoard,
// 		columns: [...state.currentBoard.columns, action.payload._id]
// 	},
// 	allColumns: { ...state.allColumns, [action.payload._id]: action.payload }
// }