import React, { useEffect, useState } from 'react'
import classes from './Board.module.css'
import Column from '@/components/Features/Column'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentBoard } from '@/store/board/asyncActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { Notification } from '@/components/UI'

export default function Board() {
	const {getCurrentBoard} = useActions()
	const currentBoard = useTypedSelector(state => state.board.currentBoard.columns)
	const isError = useTypedSelector(state => state.board.isError)

	useEffect(() => {
		getCurrentBoard('dfasdfsf')
	}, [])

	const columns = currentBoard?.map(column => (<Column key={column._id} {...column} />))

	return (
		<div>

			<div className={classes.wrapper_list}>
				<div className={classes.columns}>
					<Notification open={isError} message='isError'/>
					{columns}
				</div>
				<div className={classes.add_list}>ListCreator</div>
			</div>
		</div>
	)
}
