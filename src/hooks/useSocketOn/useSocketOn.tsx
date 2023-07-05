import React, { useEffect } from 'react'
import { useActions } from '@/hooks/useActions/useActions'
import { Socket } from 'socket.io-client'

export enum SOCKET_TYPES {
	BOARD_SHARED = 'BOARD_SHARED',
	BOARD_CHANGED = 'BOARD_CHANGED',
	CARD_DROPPED = 'CARD_DROPPED',
	CARD_CHANGED = 'CARD_CHANGED',
	TASK_ADDED = 'TASK_ADDED',
	TASK_CHANGED = 'TASK_CHANGED',
	TASK_DELETED = 'TASK_DELETED',
	COLUMN_DROPPED = 'COLUMN_DROPPED',
	RECEIVED_MEMBERS = 'RECEIVED_MEMBERS',
	CHANGE_COUNT_MEMBERS = 'CHANGE_COUNT_MEMBERS',
	CHANGE_MEMBER_IDS = 'CHANGE_MEMBER_IDS'
}

export default function useSocketOn(socket: Socket | null) {
	if (!socket) return

	const {
		changeBoard,
		dragAndDropCard,
		changeCard,
		addNewTask,
		changeTask,
		deleteTask,
		shareBoard,
		getUsersOneCard
	} = useActions()

	useEffect(() => {
		socket.on(SOCKET_TYPES.BOARD_SHARED, shareBoard)
		socket.on(SOCKET_TYPES.BOARD_CHANGED, changeBoard)
		socket.on(SOCKET_TYPES.CARD_DROPPED, dragAndDropCard)
		socket.on(SOCKET_TYPES.CARD_CHANGED, changeCard)
		socket.on(SOCKET_TYPES.TASK_ADDED, addNewTask)
		socket.on(SOCKET_TYPES.TASK_CHANGED, changeTask)
		socket.on(SOCKET_TYPES.TASK_DELETED, deleteTask)
		socket.on(SOCKET_TYPES.RECEIVED_MEMBERS, getUsersOneCard)
		socket.on(SOCKET_TYPES.CHANGE_COUNT_MEMBERS, getUsersOneCard)
	}, [socket])

	return <div></div>
}
