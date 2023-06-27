import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Column } from '@Features'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActionsToolkit } from '@/hooks/useActions/toolkit/useActions'
import { Button } from '@UI'
import { Editor } from '@Features'
import classes from './Board.module.css'

export default function Board() {
	const { getCurrentBoard, changeBoard, addNewColumn } = useActionsToolkit()


	const allColumns = useTypedSelector(state => state.board.boardState.allColumns)
	const board = useTypedSelector(state => state.board.boardState.currentBoard)
	const user = useTypedSelector(state => state.user.userState)
	const currentBoardId = user.boardIds[user.boardIds.length - 1]
	const { boardId } = useParams()

	useEffect(() => {
		if (boardId) getCurrentBoard(boardId)
	}, [currentBoardId])

	async function addColumn(title: string) {
		const payload = { title, boardId }
		return addNewColumn(payload)
	}


	const columns = board.columns?.map(id => {
		const column = allColumns[id]
		return <Column key={column._id} {...column} />
	})

	function changeTitleBoard(title: string) {
		const payload = {
			title,
			_id: board._id
		}
		return changeBoard(payload)
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
