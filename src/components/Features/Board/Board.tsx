import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Column } from '@Features'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { Button } from '@UI'
import { Editor } from '@Features'
import classes from './Board.module.css'
import { Card } from '@/models/Cards'


export default function Board() {
	const {
		getCurrentBoard,
		changeBoard,
		addNewColumn,
		deleteColumn,
		changeColumn,
		addNewCard,
		dragAndDropCard,
		deleteCard,
		changeCard,
		addNewTask,
		changeTask,
		deleteTask
	} = useActions()
	const allColumns = useTypedSelector(state => state.board.allColumns)
	const board = useTypedSelector(state => state.board.currentBoard)
	const user = useTypedSelector(state => state.user)
	const currentBoardId = user.boardIds[user.boardIds.length - 1]
	const { boardId } = useParams()
	const socket = user.socket

	useEffect(() => {
		socket?.connect()
		socket?.emit('JOIN_BOARD', boardId)
	}, [])

	useEffect(() => {
		socket?.on('COLUMN_ADDED', newColumn => {
			addNewColumn(newColumn)
		})
		socket?.on('COLUMN_DELETED', data => {
			 deleteColumn(data)
		})
		socket?.on('COLUMN_CHANGED', data => {
			changeColumn(data)
		})
		socket?.on('BOARD_CHANGED', newBoard => {
			return	changeBoard(newBoard)
		})
		socket?.on('CARD_ADDED', newCard => {
			addNewCard(newCard)
		})
		socket?.on('CARD_DROPPED', dataForDropCard => {
			dragAndDropCard(dataForDropCard)
		})
		socket?.on('CARD_DELETED', cardId => {
			deleteCard(cardId)
		})
		socket?.on('CARD_CHANGED', card => {
			return changeCard(card)
		})
		socket?.on('TASK_ADDED', dataForAddTask => {
			return addNewTask(dataForAddTask)
		})
		socket?.on('TASK_CHANGED', changedTask => {
		return	changeTask(changedTask)
		})
		socket?.on('TASK_DELETED',  dataForDeleteTask => {
			 deleteTask(dataForDeleteTask)
		})
	}, [socket])

	useEffect(() => {
		if (boardId) getCurrentBoard(boardId)
	}, [currentBoardId])

	async function addColumn(title: string) {
		if (socket?.emit('COLUMN_ADD', { title, boardId })) {
			return true
		}
	}

	const columns = board.columns?.map(id => {
		const column = allColumns[id]
		return <Column key={column._id} {...column} />
	})

	function changeTitleBoard(title: string) {
		if (socket?.emit('BOARD_CHANGE', { title, _id: board._id })) {
			return true
		}
		//TODO лоадер
	}

	return (
		<div>
			<div className={classes.title_wrapper}>
				<Editor
					buttonSubmitTitle='изменить наименование доски'
					placeholder='введите значение'
					onSubmit={changeTitleBoard}
					color='transparent'
					variant='large'
					rows={1}
					defaultValue={board.title}
				>
					<h4 className={classes.board_title}>{board.title}</h4>
				</Editor>
			</div>

			<div className={classes.wrapper_list}>
				<div className={classes.columns}>{columns}</div>
				<div className={classes.add_list}>
					<Editor
						buttonSubmitTitle='добавление колонки'
						placeholder='введите значение'
						onSubmit={addColumn}
					>
						<div>
							<Button variant='contained' color='secondary' title='Добавить колонку' />
						</div>
					</Editor>
				</div>
			</div>
		</div>
	)
}
