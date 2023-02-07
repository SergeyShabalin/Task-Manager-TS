import React from 'react'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './BoardCreator.module.css'
import { useNavigate } from 'react-router-dom'

export interface BoardCreatorProps {
	userId: string
}

export default function BoardCreator({ userId }: BoardCreatorProps) {
	const { addBoard } = useActions()
	const navigate = useNavigate()

	async function createBoard(title: string) {
		const payload = {
			userId,
			title
		}
		const boardId = await addBoard(payload)
		navigate(`/user/${userId}/board/${boardId}`)
		return boardId
	}

	return (
		<div className={classes.wrapper} onClick={createBoard}>
			creator
		</div>
	)
}
