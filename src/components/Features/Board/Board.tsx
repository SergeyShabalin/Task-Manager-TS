import React, { useEffect, useState } from 'react'
import classes from './Board.module.css'
import Column from '@/components/Features/Column'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { Button, Notification } from '@/components/UI'
import Editor from '@/components/Features/Editor'
import MiniCard from '@/components/Features/MiniCard/MiniCard'

export default function Board() {
	const {getCurrentBoard, addNewColumn} = useActions()
	const columnIds = useTypedSelector(state => state.board.currentBoard.columns)
	const allColumns = useTypedSelector(state=> state.board.allColumns)
	const isError = useTypedSelector(state => state.board.isError)

	console.log(allColumns)
	useEffect(() => {
		getCurrentBoard('dfasdfsf')
	}, [])

	function addColumn(title: string){
		addNewColumn(title)
	}

	const columns = columnIds?.map(id =>	{
		const column =  allColumns[id]
		return <Column key={column._id} {...column}/>
	})

	return (
		<div>
			<Notification open={isError} message='isError'/>
			<div className={classes.wrapper_list}>
				<div className={classes.columns}>
					{columns}
				</div>
				<div className={classes.add_list}>
					<Editor
						buttonSubmitTitle='добавление колонки'
						placeholder='введите значение'
						onSubmit={addColumn}
					>
						<div><Button variant='contained' title='Добавить колонку'/></div>
					</Editor>
				</div>
			</div>
		</div>
	)
}
