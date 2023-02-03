import React, { useEffect } from 'react'
import classes from './Board.module.css'
import { Column } from '@Features'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { Button } from '@UI'
import { Editor } from '@Features'
import { useNavigate, useParams } from 'react-router-dom'

export default function Board({}) {
	const { getCurrentBoard, addNewColumn } = useActions()
	const navigate = useNavigate()
	const allColumns = useTypedSelector(state => state.board.allColumns)
	const board = useTypedSelector(state => state.board.currentBoard)
	const { changeBoard } = useActions()

	const user = useTypedSelector(state => state.user)
	const currentBoardId = user.boardIds[user.boardIds.length - 1]

	useEffect(() => {
		if (currentBoardId) {
			getCurrentBoard(currentBoardId)
			navigate(`/user/${user._id}/board/${currentBoardId}`)
		}
	}, [currentBoardId])

	async function addColumn(title: string) {
		const isSuccess = await addNewColumn(title)
		return isSuccess
	}

	const columns = board.columns?.map(id => {
		const column = allColumns[id]
		return <Column key={column._id} {...column} />
	})

	function changeTitleBoard(title: string) {
		const payload = { _id: board._id, title }
		return changeBoard(payload)
	}

	return (
		<div>
			<Editor
				buttonSubmitTitle='изменить наименование доски'
				placeholder='введите значение'
				onSubmit={changeTitleBoard}
			>
				<h4>{board.title}</h4>
			</Editor>
			<div className={classes.wrapper_list}>
				<div className={classes.columns}>{columns}</div>
				<div className={classes.add_list}>
					<Editor
						buttonSubmitTitle='добавление колонки'
						placeholder='введите значение'
						onSubmit={addColumn}
					>
						<div>
							<Button variant='contained' title='Добавить колонку' />
						</div>
					</Editor>
				</div>
			</div>
		</div>
	)
}
