import React, { useEffect, useState } from 'react'
import classes from './Board.module.css'
import { Column } from '@Features'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { Button, Notification } from '@UI'
import { Editor } from '@Features'
import MiniCard from '@/components/Features/MiniCard/MiniCard'

export default function Board() {
	const { getCurrentBoard, addNewColumn } = useActions()
	const columnIds = useTypedSelector(state => state.board.currentBoard.columns)
	const allColumns = useTypedSelector(state => state.board.allColumns)
	const isError = useTypedSelector(state => state.board.isError)

	useEffect(() => {
		getCurrentBoard('dfasdfsf')
	}, [])

	async function addColumn(title: string) {
		const isSuccess = await addNewColumn(title)
		return isSuccess
	}

	const columns = columnIds?.map(id => {
		const column = allColumns[id]
		return <Column key={column._id} {...column} />
	})

	return (
		<div>
			{/*<Notification open={isError} message='isError' />*/}
			<div className={classes.wrapper_list}>
				<div className={classes.columns}>{columns}</div>
				<div className={classes.add_list}>
					<Editor
						buttonSubmitTitle='добавление колонки'
						placeholder='введите значение'
						onSubmit={addColumn}
						errorMessage='Произошла ошибка добавления колонки'
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
