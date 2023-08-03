
export interface Task {
	_id: string
	task: string
	done: boolean
	cardId: string
}

export interface CheckList {
	checkList: Task[]
}

export interface PayloadForAddTask {
	cardId: string
	task: string
}